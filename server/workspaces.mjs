import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const DATA_DIR = process.env.GOREECLOUD_AI_DATA_DIR ?? path.resolve('data')
const STORE_PATH = path.join(DATA_DIR, 'workspaces.json')

function now() { return new Date().toISOString() }

async function load() {
  try {
    const parsed = JSON.parse(await readFile(STORE_PATH, 'utf8'))
    return Array.isArray(parsed.workspaces) ? parsed.workspaces : []
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

async function save(workspaces) {
  await mkdir(DATA_DIR, { recursive: true })
  const temp = `${STORE_PATH}.tmp`
  await writeFile(temp, JSON.stringify({ version: 1, workspaces }, null, 2), { mode: 0o600 })
  await rename(temp, STORE_PATH)
}

export async function listWorkspaces() {
  return (await load()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export async function getWorkspace(id) {
  return (await load()).find((workspace) => workspace.id === id) ?? null
}

export async function createWorkspace(input = {}) {
  const workspaces = await load()
  const timestamp = now()
  const workspace = {
    id: randomUUID(),
    name: typeof input.name === 'string' && input.name.trim() ? input.name.trim().slice(0, 120) : 'New Workspace',
    instructions: typeof input.instructions === 'string' ? input.instructions.slice(0, 20_000) : '',
    defaultModelRole: typeof input.defaultModelRole === 'string' ? input.defaultModelRole : 'assistant',
    fileIds: [],
    knowledgeCollectionIds: [],
    toolIds: [],
    researchEnabled: Boolean(input.researchEnabled),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  workspaces.push(workspace)
  await save(workspaces)
  return workspace
}

export async function updateWorkspace(id, patch = {}) {
  const workspaces = await load()
  const index = workspaces.findIndex((workspace) => workspace.id === id)
  if (index < 0) return null
  const current = workspaces[index]
  workspaces[index] = {
    ...current,
    ...(typeof patch.name === 'string' ? { name: patch.name.trim().slice(0, 120) || current.name } : {}),
    ...(typeof patch.instructions === 'string' ? { instructions: patch.instructions.slice(0, 20_000) } : {}),
    ...(typeof patch.defaultModelRole === 'string' ? { defaultModelRole: patch.defaultModelRole } : {}),
    ...(Array.isArray(patch.fileIds) ? { fileIds: patch.fileIds.filter((value) => typeof value === 'string') } : {}),
    ...(Array.isArray(patch.knowledgeCollectionIds) ? { knowledgeCollectionIds: patch.knowledgeCollectionIds.filter((value) => typeof value === 'string') } : {}),
    ...(Array.isArray(patch.toolIds) ? { toolIds: patch.toolIds.filter((value) => typeof value === 'string') } : {}),
    ...(typeof patch.researchEnabled === 'boolean' ? { researchEnabled: patch.researchEnabled } : {}),
    updatedAt: now(),
  }
  await save(workspaces)
  return workspaces[index]
}

export async function deleteWorkspace(id) {
  const workspaces = await load()
  const next = workspaces.filter((workspace) => workspace.id !== id)
  if (next.length === workspaces.length) return false
  await save(next)
  return true
}
