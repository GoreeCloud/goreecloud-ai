import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, CheckCircle2, ChevronDown, Copy, FileText, GitBranch, Globe2, Menu, MessageSquarePlus, PanelRight, Pencil, Plus, RefreshCw, Search, Send, ShieldCheck, Sparkles, Square, Trash2, X } from 'lucide-react'
import { OllamaClient, type ChatMessage, type OllamaModel } from './lib/ollama'
import { createConversation, getConversation, listConversations, removeConversation, saveConversation, type ConversationSummary } from './lib/conversations'

const welcome: ChatMessage = { role: 'assistant', content: 'Welcome to GoreeCloud AI. Start a private conversation with a local model.' }
const stored = (items: ChatMessage[]) => items.filter((message) => message !== welcome)

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome])
  const [history, setHistory] = useState<ConversationSummary[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [models, setModels] = useState<OllamaModel[]>([])
  const [selectedModel, setSelectedModel] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const [runtimeState, setRuntimeState] = useState<'checking' | 'ready' | 'offline'>('checking')
  const controllerRef = useRef<AbortController | null>(null)
  const client = useMemo(() => new OllamaClient('/api/ollama'), [])

  async function refreshHistory() { try { setHistory(await listConversations()) } catch {} }

  useEffect(() => {
    void refreshHistory()
    let active = true
    client.listModels().then((available) => { if (!active) return; setModels(available); setSelectedModel((current) => current || available[0]?.name || ''); setRuntimeState('ready') }).catch(() => active && setRuntimeState('offline'))
    return () => { active = false }
  }, [client])

  async function persist(id: string, nextMessages: ChatMessage[], model = selectedModel, explicitTitle?: string) {
    const firstUser = nextMessages.find((message) => message.role === 'user')?.content.trim()
    await saveConversation({ id, title: explicitTitle || firstUser?.slice(0, 72) || 'New conversation', model, messages: stored(nextMessages) })
    await refreshHistory()
  }

  async function ensureConversation(nextMessages: ChatMessage[]) {
    if (conversationId) return conversationId
    const created = await createConversation(selectedModel)
    setConversationId(created.id)
    await persist(created.id, nextMessages)
    return created.id
  }

  async function generate(requestMessages: ChatMessage[], id: string) {
    setMessages([...requestMessages, { role: 'assistant', content: '' }])
    setIsGenerating(true)
    const controller = new AbortController(); controllerRef.current = controller
    try {
      await client.streamChat({ model: selectedModel, messages: stored(requestMessages), signal: controller.signal, onToken(token) {
        setMessages((current) => { const copy = [...current]; const last = copy[copy.length - 1]; if (last?.role === 'assistant') copy[copy.length - 1] = { ...last, content: `${last.content}${token}` }; return copy })
      } })
      setMessages((current) => { void persist(id, current); return current })
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setMessages((current) => { const copy = [...current]; copy[copy.length - 1] = { role: 'assistant', content: 'I could not reach the GoreeCloud AI model gateway. Check the local Ollama adapter and try again.' }; void persist(id, copy); return copy })
        setRuntimeState('offline')
      }
    } finally { setIsGenerating(false); controllerRef.current = null }
  }

  async function submitPrompt(event: FormEvent) {
    event.preventDefault(); const text = prompt.trim(); if (!text || !selectedModel || isGenerating) return
    const requestMessages: ChatMessage[] = [...stored(messages), { role: 'user', content: text }]
    setPrompt(''); const id = await ensureConversation(requestMessages); await generate(requestMessages, id)
  }

  function stopGeneration() { controllerRef.current?.abort() }
  function newConversation() { controllerRef.current?.abort(); setConversationId(null); setMessages([welcome]); setPrompt(''); setSidebarOpen(false) }

  async function openConversation(id: string) { controllerRef.current?.abort(); const conversation = await getConversation(id); setConversationId(id); setMessages(conversation.messages.length ? conversation.messages : [welcome]); if (conversation.model) setSelectedModel(conversation.model); setSidebarOpen(false) }
  async function deleteConversation(id: string) { await removeConversation(id); if (id === conversationId) newConversation(); await refreshHistory() }
  async function changeModel(model: string) { setSelectedModel(model); if (conversationId) { const item = history.find((entry) => entry.id === conversationId); await persist(conversationId, messages, model, item?.title) } }

  async function renameConversation(id: string) {
    const current = history.find((item) => item.id === id); if (!current) return
    const title = window.prompt('Rename conversation', current.title)?.trim(); if (!title) return
    const conversation = await getConversation(id); await saveConversation({ id, title: title.slice(0, 120), model: conversation.model, messages: conversation.messages }); await refreshHistory()
  }

  async function editUserMessage(index: number) {
    const message = messages[index]; if (message?.role !== 'user' || isGenerating) return
    const edited = window.prompt('Edit message', message.content)?.trim(); if (!edited) return
    const next = messages.slice(0, index + 1); next[index] = { role: 'user', content: edited }
    const id = await ensureConversation(next); await persist(id, next); await generate(next, id)
  }

  async function regenerate(index: number) {
    if (isGenerating || messages[index]?.role !== 'assistant') return
    const request = messages.slice(0, index).filter((message) => message.role !== 'assistant' || message.content)
    if (!request.some((message) => message.role === 'user')) return
    const id = await ensureConversation(request); await generate(request, id)
  }

  async function branchFrom(index: number) {
    const branchMessages = stored(messages.slice(0, index + 1)); if (!branchMessages.length) return
    const created = await createConversation(selectedModel); await persist(created.id, branchMessages, selectedModel, `Branch · ${branchMessages.find((m) => m.role === 'user')?.content.slice(0, 55) || 'Conversation'}`)
    setConversationId(created.id); setMessages(branchMessages); setSidebarOpen(false)
  }

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
      <div className="brand-row"><img className="brand-icon" src="/artwork/icon.svg" alt=""/><div><strong>GoreeCloud AI</strong><span>Local intelligence</span></div><button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={19}/></button></div>
      <button className="new-chat" onClick={newConversation}><MessageSquarePlus size={18}/>New chat</button>
      <nav className="nav-stack"><button className="nav-item active"><Sparkles size={18}/>Chat</button><button className="nav-item"><Search size={18}/>Search & research</button><button className="nav-item"><FileText size={18}/>Workspaces</button><button className="nav-item"><Globe2 size={18}/>Library</button></nav>
      <div className="sidebar-section"><span className="section-label">Recent</span>{history.length === 0 ? <span className="history-item">No saved conversations</span> : history.map((item) => <div key={item.id} className="history-row"><button className={`history-item ${item.id === conversationId ? 'active' : ''}`} onClick={() => void openConversation(item.id)}>{item.title}</button><button className="icon-button history-action" onClick={() => void renameConversation(item.id)} aria-label={`Rename ${item.title}`}><Pencil size={14}/></button><button className="icon-button history-action" onClick={() => void deleteConversation(item.id)} aria-label={`Delete ${item.title}`}><Trash2 size={14}/></button></div>)}</div>
      <div className="sidebar-footer"><div className={`runtime-pill ${runtimeState}`}>{runtimeState === 'ready' ? <CheckCircle2 size={15}/> : <ShieldCheck size={15}/>} {runtimeState === 'checking' ? 'Checking local runtime' : runtimeState === 'ready' ? 'Local runtime ready' : 'Runtime unavailable'}</div><span>Privacy Shield · Wardveil Security</span></div>
    </aside>
    <main className="main-column">
      <header className="topbar"><button className="icon-button desktop-hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20}/></button><label className="model-picker"><Bot size={17}/><select value={selectedModel} onChange={(event) => void changeModel(event.target.value)} aria-label="Selected model"><option value="">Select model</option>{models.map((model) => <option key={model.name} value={model.name}>{model.name}</option>)}</select><ChevronDown size={16}/></label><div className="topbar-actions"><button className="icon-button" onClick={newConversation} aria-label="New conversation"><Plus size={20}/></button><button className="icon-button" onClick={() => setContextOpen((value) => !value)} aria-label="Toggle context panel"><PanelRight size={20}/></button></div></header>
      <section className="conversation" aria-live="polite"><div className="conversation-inner">{messages.map((message, index) => <article className={`message ${message.role}`} key={`${message.role}-${index}`}><div className="message-avatar" aria-hidden="true">{message.role === 'assistant' ? <img src="/artwork/icon.svg" alt=""/> : <span>Y</span>}</div><div className="message-body"><div className="message-label">{message.role === 'assistant' ? 'GoreeCloud AI' : 'You'}</div><div className="message-content">{message.content || (isGenerating && index === messages.length - 1 ? <span className="thinking">Thinking locally…</span> : null)}</div>{message.content && message !== welcome && <div className="message-actions"><button onClick={() => void navigator.clipboard.writeText(message.content)} aria-label="Copy message"><Copy size={14}/></button>{message.role === 'user' && <button onClick={() => void editUserMessage(index)} aria-label="Edit and resubmit"><Pencil size={14}/></button>}{message.role === 'assistant' && <button onClick={() => void regenerate(index)} aria-label="Regenerate response"><RefreshCw size={14}/></button>}<button onClick={() => void branchFrom(index)} aria-label="Branch conversation here"><GitBranch size={14}/></button></div>}</div></article>)}</div></section>
      <div className="composer-wrap"><form className="composer" onSubmit={submitPrompt}><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} placeholder={runtimeState === 'offline' ? 'Connect the Ollama gateway to begin…' : 'Message GoreeCloud AI'} rows={1}/><div className="composer-toolbar"><div className="composer-tools"><button type="button" className="tool-button" aria-label="Attach file"><Plus size={18}/></button><button type="button" className="tool-chip"><Globe2 size={16}/>Research</button></div>{isGenerating ? <button type="button" className="send-button" onClick={stopGeneration} aria-label="Stop generation"><Square size={17} fill="currentColor"/></button> : <button type="submit" className="send-button" disabled={!prompt.trim() || !selectedModel} aria-label="Send message"><Send size={17}/></button>}</div></form><p className="composer-note">Local by default. External research is disclosed through Privacy Shield.</p></div>
    </main>
    <aside className={`context-panel ${contextOpen ? 'is-open' : ''}`} aria-label="Conversation context"><div className="context-heading"><div><strong>Context</strong><span>Conversation resources</span></div><button className="icon-button" onClick={() => setContextOpen(false)} aria-label="Close context panel"><X size={19}/></button></div><div className="context-card"><span className="context-card-icon"><ShieldCheck size={19}/></span><div><strong>Private processing</strong><p>This conversation is configured for the local Ollama runtime.</p></div></div><div className="context-card"><span className="context-card-icon"><FileText size={19}/></span><div><strong>Workspace</strong><p>No Workspace attached yet.</p></div></div></aside>
    {sidebarOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>} 
  </div>
}
