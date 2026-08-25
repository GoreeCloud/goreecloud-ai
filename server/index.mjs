import http from 'node:http'

const PORT = Number(process.env.PORT ?? 8787)
const OLLAMA_URL = (process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434').replace(/\/$/, '')
const API_TOKEN = process.env.GOREECLOUD_AI_API_TOKEN?.trim()
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES ?? 1_000_000)
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS ?? 120_000)

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(payload))
}

function authorized(req) {
  if (!API_TOKEN) return true
  return req.headers.authorization === `Bearer ${API_TOKEN}`
}

async function readJson(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error('Request body too large'), { status: 413 })
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
  } catch {
    throw Object.assign(new Error('Invalid JSON request body'), { status: 400 })
  }
}

function validateChat(body) {
  if (!body || typeof body !== 'object') return false
  if (typeof body.model !== 'string' || !body.model.trim()) return false
  if (!Array.isArray(body.messages) || body.messages.length === 0) return false
  return body.messages.every((message) =>
    message && ['system', 'user', 'assistant'].includes(message.role) && typeof message.content === 'string'
  )
}

async function ollamaFetch(path, init = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(`${OLLAMA_URL}${path}`, { ...init, signal: init.signal ?? controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function handleModels(res) {
  const upstream = await ollamaFetch('/api/tags', { headers: { Accept: 'application/json' } })
  if (!upstream.ok) return json(res, 502, { error: 'Ollama model discovery failed', upstreamStatus: upstream.status })
  const data = await upstream.json()
  json(res, 200, { models: Array.isArray(data.models) ? data.models : [] })
}

async function handleChat(req, res) {
  const body = await readJson(req)
  if (!validateChat(body)) return json(res, 400, { error: 'model and valid messages are required' })

  const controller = new AbortController()
  req.on('close', () => controller.abort())
  const upstream = await ollamaFetch('/api/chat', {
    method: 'POST',
    signal: controller.signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/x-ndjson' },
    body: JSON.stringify({ model: body.model.trim(), messages: body.messages, stream: true }),
  })

  if (!upstream.ok || !upstream.body) {
    return json(res, 502, { error: 'Ollama chat request failed', upstreamStatus: upstream.status })
  }

  res.writeHead(200, {
    'Content-Type': 'application/x-ndjson; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  const reader = upstream.body.getReader()
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      res.write(Buffer.from(value))
    }
  } finally {
    reader.releaseLock()
    res.end()
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/api/health' && req.method === 'GET') {
      return json(res, 200, { status: 'ok', service: 'goreecloud-ai', ollama: OLLAMA_URL })
    }
    if (!authorized(req)) return json(res, 401, { error: 'Unauthorized' })
    if (req.url === '/api/ollama/models' && req.method === 'GET') return await handleModels(res)
    if (req.url === '/api/ollama/chat' && req.method === 'POST') return await handleChat(req, res)
    json(res, 404, { error: 'Not found' })
  } catch (error) {
    const status = Number(error?.status ?? (error?.name === 'AbortError' ? 504 : 500))
    json(res, status, { error: status === 500 ? 'Internal server error' : error.message })
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`GoreeCloud AI backend listening on http://127.0.0.1:${PORT}`)
})
