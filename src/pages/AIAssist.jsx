import { useState } from 'react'
import './AIAssist.css'

const AI_TOOLS = [
  { icon: '📝', label: 'Quiz Generator', desc: 'Create quizzes from any topic or document', action: 'Generate Quiz', color: '#e8f5e9' },
  { icon: '📄', label: 'Document Analyzer', desc: 'Analyze your documents and get key insights', action: 'Analyze Now', color: '#e8f0fb' },
  { icon: '🖼️', label: 'Image Analyzer', desc: 'Extract text, understand images and diagrams', action: 'Analyze Image', color: '#fff9e6' },
  { icon: '✏️', label: 'Paraphraser', desc: 'Rephrase content in different styles', action: 'Paraphrase', color: '#fde8e8' },
]

const MY_DOCS = [
  { name: 'Photosynthesis Notes.pdf', icon: '📄', date: 'May 12, 2025' },
  { name: 'Biology Chapter 8.docx', icon: '📝', date: 'May 10, 2025' },
  { name: 'Plant Cell Diagram.jpg', icon: '🖼️', date: 'May 8, 2025' },
  { name: 'Science Quiz 1.pdf', icon: '📋', date: 'May 5, 2025' },
  { name: 'Class Notes.txt', icon: '📋', date: 'May 3, 2025' },
]

const HISTORY = [
  { topic: 'Photosynthesis Exploration', date: '10:30 AM' },
  { topic: 'What is Newton\'s First Law?', date: 'Yesterday' },
  { topic: 'Explain DNA structure', date: 'May 10' },
  { topic: 'Thermodynamics summary', date: 'May 9' },
  { topic: 'Cell respiration steps', date: 'May 8' },
]

const INITIAL_MSGS = [
  { role: 'ai', text: "Hello! I'm your AI Study Assistant 🤖\n\nHow can I help you today?" },
]

const QUICK_ACTIONS = ['Explain a concept', 'Summarize a document', 'Generate a quiz', 'Analyze an image', 'Paraphrase text', 'Study tips']

export default function AIAssist() {
  const [tab, setTab] = useState('AI Chat')
  const [messages, setMessages] = useState(INITIAL_MSGS)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const RESPONSES = {
    default: 'Photosynthesis is the process used by green plants to make their own food.\n\nPlants take in carbon dioxide from the air and water from the soil. With the help of sunlight, they convert these into glucose (food) and release oxygen back into the air.\n\n🌱 **Sunlight + Water + Carbon Dioxide → Glucose (Food) + Oxygen**\n\nThis process happens in the leaves of the plant.'
  }

  const send = async (text) => {
    const q = text || input
    if (!q.trim()) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setMessages(m => [...m, { role: 'ai', text: RESPONSES.default }])
    setLoading(false)
  }

  return (
    <div className="page-inner" style={{ display: 'flex', gap: 24, height: 'calc(100vh - 110px)', paddingBottom: 0 }}>
      {/* Main AI area */}
      <div className="ai-main">
        <div className="ai-header">
          <div className="flex items-center gap-3">
            <div className="ai-robot-icon">🤖</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>AI Study Assistant</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Your personal learning companion</div>
            </div>
          </div>
          <button className="btn btn-outline btn-sm">✨ Explore All Tools</button>
        </div>

        {/* Tools row */}
        <div className="ai-tools-row">
          {AI_TOOLS.map(t => (
            <div key={t.label} className="ai-tool-chip" style={{ background: t.color }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '4px 0 8px', lineHeight: 1.4 }}>{t.desc}</div>
              <button className="btn btn-sm btn-primary" style={{ fontSize: 11 }}>{t.action}</button>
            </div>
          ))}
          <div className="ai-tool-chip" style={{ background: '#f0f0f0', justifyContent: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>⚡</div>
            <div style={{ fontWeight: 700, fontSize: 12 }}>More Tools</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '4px 0 8px' }}>Explore more AI tools to boost your study</div>
            <button className="btn btn-sm btn-outline" style={{ fontSize: 11 }}>View All</button>
          </div>
        </div>

        {/* Chat tabs */}
        <div className="flex gap-2 items-center" style={{ marginBottom: 12 }}>
          {['AI Chat', 'AI Notes'].map(t => (
            <button key={t} className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab(t)}>{t}</button>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>🔄 New Chat</button>
        </div>

        {/* Messages */}
        <div className="ai-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              {m.role === 'ai' && <div className="ai-msg-avatar">🤖</div>}
              <div className="ai-msg-bubble">
                {m.text.split('\n').map((line, j) => (
                  <div key={j}>{line.startsWith('🌱') ? <span style={{ background: 'var(--green-bg)', padding: '2px 8px', borderRadius: 6, display: 'inline-block', marginTop: 4, fontWeight: 600 }}>{line}</span> : line}</div>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="ai-msg ai">
              <div className="ai-msg-avatar">🤖</div>
              <div className="ai-msg-bubble ai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="ai-quick-actions">
          {QUICK_ACTIONS.map(a => (
            <button key={a} className="ai-quick-btn" onClick={() => send(a)}>{a}</button>
          ))}
        </div>

        {/* Input */}
        <form className="ai-input-bar" onSubmit={e => { e.preventDefault(); send() }}>
          <input className="input" placeholder="Ask anything..." value={input}
            onChange={e => setInput(e.target.value)} />
          <button type="button" className="btn btn-ghost btn-sm">📎</button>
          <button type="submit" className="btn btn-primary">Send ✈️</button>
        </form>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
          AI can make mistakes. Please verify important information.
        </div>
      </div>

      {/* Sidebar */}
      <div className="ai-sidebar">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>📁 My Documents</div>
        {MY_DOCS.map(d => (
          <div key={d.name} className="flex items-center gap-2" style={{ marginBottom: 10, cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>{d.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{d.date}</div>
            </div>
          </div>
        ))}
        <div className="upload-drop-area" style={{ marginTop: 12 }}>
          <div style={{ fontSize: 20 }}>☁️</div>
          <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>Upload from Computer</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>or drag and drop files here</div>
        </div>

        <div style={{ fontWeight: 700, margin: '20px 0 12px' }}>🕐 Chat History</div>
        {HISTORY.map((h, i) => (
          <div key={i} className="ai-history-item">
            <div style={{ fontSize: 12, fontWeight: 500 }}>{h.topic}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{h.date}</div>
          </div>
        ))}

        <div style={{ marginTop: 20, background: 'var(--green-bg)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>💡 Study Better with AI ✨</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            Use AI tools to understand, practice and master any topic faster and smarter.
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
            Explore All AI Tools →
          </button>
        </div>
      </div>
    </div>
  )
}
