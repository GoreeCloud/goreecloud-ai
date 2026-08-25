import { mkdir, readFile, rename, writeFile, unlink } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const DATA_DIR = process.env.GOREECLOUD_AI_DATA_DIR ?? path.resolve('data')
const FILE_DIR = path.join(DATA_DIR, 'files')
const INDEX_PATH = path.join(DATA_DIR, 'files.json')

async function loadIndex() {
  try {
    const parsed = JSON.parse(await readFile(INDEX_PATH, 'utf8'))
    return Array.isArray(parsed.files) ? parsed.files : []
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

async function saveIndex(files) {
  await mkdir(DATA_DIR, { recursive: true })
  const temp = `${INDEX_PATH}.tmp`
  await writeFile(temp, JSON.stringify({ version: 1, files }, null, 2), { mode: 0o600 })
  await rename(temp, INDEX_PATH)
}

export async function listFiles() {
  return (await loadIndex()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getFileRecord(id) {
  return (await loadIndex()).find((file) => file.id === id) ?? null
}

export async function storeFile(req, maxBytes) {
  const id = randomUUID()
  const name = decodeURIComponent(String(req.headers['x-file-name'] ?? 'attachment')).replace(/[\\/\0]/g, '_').slice(0, 240) || 'attachment'
  const mediaType = String(req.headers['content-type'] ?? 'application/octet-stream').slice(0, 160)
  const workspaceId = typeof req.headers['x-workspace-id'] === 'string' ? req.headers['x-workspace-id'] : null
  await mkdir(FILE_DIR, { recursive: true })
  const storagePath = path.join(FILE_DIR, id)
  const stream = createWriteStream(storagePath, { flags: 'wx', mode: 0o600 })
  let size = 0

  try {
    for await (const chunk of req) {
      size += chunk.length
      if (size > maxBytes) throw Object.assign(new Error('Attachment too large'), { status: 413 })
      if (!stream.write(chunk)) await new Promise((resolve) => stream.once('drain', resolve))
    }
    await new Promise((resolve, reject) => stream.end((error) => error ? reject(error) : resolve()))
  } catch (error) {
    stream.destroy()
    await unlink(storagePath).catch(() => {})
    throw error
  }

  const record = { id, name, mediaType, size, workspaceId, status: 'stored', createdAt: new Date().toISOString() }
  const files = await loadIndex()
  files.push(record)
  await saveIndex(files)
  return record
}

export async function deleteFile(id) {
  const files = await loadIndex()
  const record = files.find((file) => file.id === id)
  if (!record) return false
  await unlink(path.join(FILE_DIR, id)).catch((error) => { if (error?.code !== 'ENOENT') throw error })
  await saveIndex(files.filter((file) => file.id !== id))
  return true
}
