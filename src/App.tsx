import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  Bot,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe2,
  Menu,
  MessageSquarePlus,
  PanelRight,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  X,
} from 'lucide-react'
import { OllamaClient, type ChatMessage, type OllamaModel } from './lib/ollama'

const starterMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Welcome to GoreeCloud AI. This development foundation is connected to the local Ollama boundary and is ready for private conversations, Workspaces, knowledge, research, and tools.',
  },
]

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages)
  const [models, setModels] = useState<OllamaModel[]>([])
  const [selectedModel, setSelectedModel] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const [runtimeState, setRuntimeState] = useState<'checking' | 'ready' | 'offline'>('checking')
  const controllerRef = useRef<AbortController | null>(null)

  const client = useMemo(() => new OllamaClient('/api/ollama'), [])

  useEffect(() => {
    let active = true
    client
      .listModels()
      .then((available) => {
        if (!active) return
        setModels(available)
        setSelectedModel((current) => current || available[0]?.name || '')
        setRuntimeState('ready')
      })
      .catch(() => active && setRuntimeState('offline'))
    return () => {
      active = false
    }
  }, [client])

  async function submitPrompt(event: FormEvent) {
    event.preventDefault()
    const text = prompt.trim()
    if (!text || !selectedModel || isGenerating) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    setPrompt('')
    setIsGenerating(true)

    const controller = new AbortController()
    controllerRef.current = controller

    try {
      await client.streamChat({
        model: selectedModel,
        messages: nextMessages,
        signal: controller.signal,
        onToken(token) {
          setMessages((current) => {
            const copy = [...current]
            const last = copy[copy.length - 1]
            if (last?.role === 'assistant') {
              copy[copy.length - 1] = { ...last, content: `${last.content}${token}` }
            }
            return copy
          })
        },
      })
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setMessages((current) => {
          const copy = [...current]
          copy[copy.length - 1] = {
            role: 'assistant',
            content:
              'I could not reach the GoreeCloud AI model gateway. Check the local Ollama adapter and try again.',
          }
          return copy
        })
        setRuntimeState('offline')
      }
    } finally {
      setIsGenerating(false)
      controllerRef.current = null
    }
  }

  function stopGeneration() {
    controllerRef.current?.abort()
  }

  function newConversation() {
    controllerRef.current?.abort()
    setMessages(starterMessages)
    setPrompt('')
    setSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <div className="brand-row">
          <img className="brand-icon" src="/artwork/icon.svg" alt="" />
          <div>
            <strong>GoreeCloud AI</strong>
            <span>Local intelligence</span>
          </div>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            <X size={19} />
          </button>
        </div>

        <button className="new-chat" onClick={newConversation}>
          <MessageSquarePlus size={18} />
          New chat
        </button>

        <nav className="nav-stack">
          <button className="nav-item active"><Sparkles size={18} />Chat</button>
          <button className="nav-item"><Search size={18} />Search & research</button>
          <button className="nav-item"><FileText size={18} />Workspaces</button>
          <button className="nav-item"><Globe2 size={18} />Library</button>
        </nav>

        <div className="sidebar-section">
          <span className="section-label">Recent</span>
          <button className="history-item">Build the AI foundation</button>
          <button className="history-item">Ollama model strategy</button>
        </div>

        <div className="sidebar-footer">
          <div className={`runtime-pill ${runtimeState}`}>
            {runtimeState === 'ready' ? <CheckCircle2 size={15} /> : <ShieldCheck size={15} />}
            {runtimeState === 'checking' ? 'Checking local runtime' : runtimeState === 'ready' ? 'Local runtime ready' : 'Runtime unavailable'}
          </div>
          <span>Privacy Shield · Wardveil Security</span>
        </div>
      </aside>

      <main className="main-column">
        <header className="topbar">
          <button className="icon-button desktop-hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>

          <button className="model-picker" aria-label="Selected model">
            <Bot size={17} />
            <span>{selectedModel || 'Select model'}</span>
            <ChevronDown size={16} />
          </button>

          <div className="topbar-actions">
            <button className="icon-button" onClick={newConversation} aria-label="New conversation"><Plus size={20} /></button>
            <button className="icon-button" onClick={() => setContextOpen((value) => !value)} aria-label="Toggle context panel"><PanelRight size={20} /></button>
          </div>
        </header>

        <section className="conversation" aria-live="polite">
          <div className="conversation-inner">
            {messages.map((message, index) => (
              <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                <div className="message-avatar" aria-hidden="true">
                  {message.role === 'assistant' ? <img src="/artwork/icon.svg" alt="" /> : <span>Y</span>}
                </div>
                <div className="message-body">
                  <div className="message-label">{message.role === 'assistant' ? 'GoreeCloud AI' : 'You'}</div>
                  <div className="message-content">
                    {message.content || (isGenerating && index === messages.length - 1 ? <span className="thinking">Thinking locally…</span> : null)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="composer-wrap">
          <form className="composer" onSubmit={submitPrompt}>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder={runtimeState === 'offline' ? 'Connect the Ollama gateway to begin…' : 'Message GoreeCloud AI'}
              rows={1}
            />
            <div className="composer-toolbar">
              <div className="composer-tools">
                <button type="button" className="tool-button" aria-label="Attach file"><Plus size={18} /></button>
                <button type="button" className="tool-chip"><Globe2 size={16} />Research</button>
              </div>
              {isGenerating ? (
                <button type="button" className="send-button" onClick={stopGeneration} aria-label="Stop generation"><Square size={17} fill="currentColor" /></button>
              ) : (
                <button type="submit" className="send-button" disabled={!prompt.trim() || !selectedModel} aria-label="Send message"><Send size={17} /></button>
              )}
            </div>
          </form>
          <p className="composer-note">Local by default. External research is disclosed through Privacy Shield.</p>
        </div>
      </main>

      <aside className={`context-panel ${contextOpen ? 'is-open' : ''}`} aria-label="Conversation context">
        <div className="context-heading">
          <div><strong>Context</strong><span>Conversation resources</span></div>
          <button className="icon-button" onClick={() => setContextOpen(false)} aria-label="Close context panel"><X size={19} /></button>
        </div>
        <div className="context-card">
          <span className="context-card-icon"><ShieldCheck size={19} /></span>
          <div><strong>Private processing</strong><p>This conversation is configured for the local Ollama runtime.</p></div>
        </div>
        <div className="context-card">
          <span className="context-card-icon"><FileText size={19} /></span>
          <div><strong>Workspace</strong><p>No Workspace attached yet.</p></div>
        </div>
      </aside>

      {sidebarOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
