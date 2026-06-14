import { useState } from 'react'
import './Chat.css'

const ROOMS_CHAT = [
  { id: 1, name: 'Common Study Room', last: 'Check the new resources!', time: '2m', unread: 3, online: true },
  { id: 2, name: 'DSA Study Group', last: 'Can someone explain the time complexity...', time: '10m', unread: 0, online: true },
  { id: 3, name: 'Calculus Warriors', last: 'Binary Search has O(log n)...', time: '1h', unread: 1, online: false },
  { id: 4, name: 'Python Practice', last: 'Here is a little linear tree example', time: '2h', unread: 0, online: true },
  { id: 5, name: 'Exam Preparation', last: 'When is the next exam session?', time: '3h', unread: 0, online: false },
  { id: 6, name: 'AI & ML Learners', last: 'Hamza Malik uploaded a PDF!', time: 'Yesterday', unread: 0, online: true },
  { id: 7, name: 'Revision Room', last: 'Recommend a good textbook?', time: 'Yesterday', unread: 0, online: false },
  { id: 8, name: 'Chemistry Corner', last: 'I\'m online!', time: '2 days ago', unread: 0, online: true },
]

const ROOM_MSGS = {
  1: [
    { user: 'Ali Raza', avatar: '👨', time: '10:30 AM', text: 'Can someone explain the time complexity of Binary Search?' },
    { user: 'Hamza Malik', avatar: '👨‍💻', time: '10:31 AM', text: 'Binary Search has O(log n) time complexity because we halve the search space at each step.' },
    { user: 'Zainab Fatima', avatar: '👩', time: '10:32 AM', text: 'Here\'s a linear tree, I need help understanding recursion in merge sort.' },
    { user: 'You', avatar: '🧑', time: '10:35 AM', text: 'This makes sense, thanks everyone! 🙌', self: true },
  ],
  2: [
    { user: 'Sara Ahmad', avatar: '👩', time: '9:00 AM', text: 'Good morning everyone! Ready to solve DSA problems?' },
    { user: 'You', avatar: '🧑', time: '9:05 AM', text: 'Let\'s go! Starting with graph traversal today?', self: true },
  ]
}

export default function Chat() {
  const [activeRoom, setActiveRoom] = useState(ROOMS_CHAT[0])
  const [messages, setMessages] = useState(ROOM_MSGS)
  const [input, setInput] = useState('')

  const currentMsgs = messages[activeRoom.id] || []

  const send = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(m => ({
      ...m,
      [activeRoom.id]: [...(m[activeRoom.id] || []), { user: 'You', avatar: '🧑', time: 'now', text: input, self: true }]
    }))
    setInput('')
  }

  return (
    <div className="chat-layout">
      {/* Room list */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <div style={{ fontWeight: 800, fontSize: 15 }}>Study Rooms</div>
          <div className="flex gap-1">
            {['All', 'Joined', 'Unread'].map(t => (
              <button key={t} className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>{t}</button>
            ))}
          </div>
        </div>
        <input className="input" placeholder="🔍 Search rooms..." style={{ marginBottom: 10, fontSize: 13 }} />
        {ROOMS_CHAT.map(r => (
          <div key={r.id} className={`chat-room-item ${activeRoom.id === r.id ? 'active' : ''}`}
            onClick={() => setActiveRoom(r)}>
            <div className="chat-room-avatar">
              {r.name[0]}
              {r.online && <div className="online-dot" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex justify-between items-center">
                <div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{r.time}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.last}
              </div>
            </div>
            {r.unread > 0 && (
              <div style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {r.unread}
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-outline btn-sm w-full" style={{ marginTop: 10, justifyContent: 'center' }}>
          + Create New Room
        </button>
      </div>

      {/* Chat area */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-main-header">
          <div className="flex items-center gap-3">
            <div className="chat-room-avatar" style={{ width: 40, height: 40, fontSize: 16 }}>
              {activeRoom.name[0]}
              {activeRoom.online && <div className="online-dot" />}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{activeRoom.name} 🌿</div>
              <div style={{ fontSize: 12, color: 'var(--green)' }}>{activeRoom.online ? '24 Members Online' : 'Offline'}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">📹 Video Meeting</button>
            <button className="btn btn-outline btn-sm">📁 Shared Notes</button>
            <button className="btn btn-outline btn-sm">🗂️ Room Files</button>
            <button className="btn btn-outline btn-sm">ℹ️ Room Info</button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {currentMsgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.self ? 'self' : ''}`}>
              {!m.self && (
                <div className="chat-msg-avatar">{m.avatar}</div>
              )}
              <div>
                {!m.self && <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 3 }}>{m.user} <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400 }}>{m.time}</span></div>}
                <div className={`chat-msg-bubble ${m.self ? 'self' : ''}`}>{m.text}</div>
                {m.self && <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'right', marginTop: 2 }}>{m.time}</div>}
              </div>
            </div>
          ))}

          {/* AI Assistant CTA */}
          <div className="chat-ai-bar">
            <span style={{ fontSize: 20 }}>🤖</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>AI Assistant</span>
            <span style={{ fontSize: 13, color: 'var(--text-2)', flex: 1 }}>Need help with this topic?</span>
            <button className="btn btn-primary btn-sm">Ask AI →</button>
          </div>
        </div>

        {/* Input */}
        <form className="chat-input-bar" onSubmit={send}>
          <button type="button" className="btn btn-ghost btn-sm">📎</button>
          <button type="button" className="btn btn-ghost btn-sm">📷</button>
          <button type="button" className="btn btn-ghost btn-sm">😊</button>
          <input className="input" placeholder="Type a message..." value={input}
            onChange={e => setInput(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary btn-sm">Send</button>
        </form>
      </div>

      {/* Members sidebar */}
      <div className="chat-members">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Members (34)</div>
        {[
          { name: 'Anasha Khan', role: 'Host', avatar: '👩', online: true },
          { name: 'Ali Raza', role: 'Member', avatar: '👨', online: true },
          { name: 'Zainab Fatima', role: 'Member', avatar: '👩‍🎓', online: false },
          { name: 'Hamza Malik', role: 'Member', avatar: '👨‍💻', online: true },
          { name: 'Huma Ahmad', role: 'Member', avatar: '👩', online: false },
          { name: 'Sara Ahmad', role: 'Member', avatar: '👩', online: true },
        ].map((m, i) => (
          <div key={i} className="flex items-center gap-2" style={{ marginBottom: 12 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: 24 }}>{m.avatar}</span>
              {m.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, background: 'var(--green)', borderRadius: '50%', border: '1.5px solid #fff' }} />}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.role}</div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline btn-sm w-full" style={{ marginTop: 8, justifyContent: 'center' }}>View All</button>
      </div>
    </div>
  )
}
