import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './RoomDetail.css'

const ROOM_DATA = {
  1: { name: 'DSA Study Group', subject: 'Computer Science', members: 8, desc: 'Solving DSA problems together' },
  2: { name: 'Calculus Warriors', subject: 'Mathematics', members: 11, desc: 'Master calculus concepts' },
}

const PARTICIPANTS = [
  { name: 'Hamza Malik', emoji: '👨‍💻', speaking: true },
  { name: 'Ali Raza', emoji: '👨', speaking: false },
  { name: 'Sara Ahmad', emoji: '👩', speaking: false },
  { name: 'Zainab', emoji: '👩‍🎓', speaking: false },
  { name: 'Fatima', emoji: '🧕', speaking: false },
  { name: 'Muhammad Usman', emoji: '🧑', speaking: false },
]

const MESSAGES = [
  { user: 'Ali Raza', time: '10:30 AM', text: 'Can someone explain the time complexity of Binary Search?' },
  { user: 'Hamza Malik', time: '10:32 AM', text: 'Binary search has O(log n) time complexity because we halve the search space at each step.' },
  { user: 'Sara Ahmad', time: '10:34 AM', text: 'Hmm, a bit linear tree. I need help understanding recursion in merge sort.' },
  { user: 'You', time: '10:35 AM', text: 'This makes sense, thanks everyone! 🙌', self: true },
]

const SHARED_FILES = [
  { name: 'DSA Notes.pdf', size: '2.1 MB', by: 'Hamza Malik', time: '2 hours ago' },
  { name: 'Binary Search Slides.pptx', size: '1.5 MB', by: 'Sara Ahmad', time: '3 hours ago' },
  { name: 'Tree Complexity Cheatsheet.pdf', size: '942 KB', by: 'Ali Raza', time: '4 hours ago' },
  { name: 'Algorithm Roadmap.png', size: '910 KB', by: 'You', time: '5 hours ago' },
]

const MEMBERS = [
  { name: 'Anasha Khan', role: 'Host', emoji: '👩' },
  { name: 'Ali Raza', role: 'Member', emoji: '👨' },
  { name: 'Zainab Fatima', role: 'Member', emoji: '👩‍🎓' },
  { name: 'Hamza Malik', role: 'Member', emoji: '👨‍💻' },
  { name: 'Huma Ahmad', role: 'Member', emoji: '👩' },
  { name: 'Sara Ahmad', role: 'Member', emoji: '👩' },
]

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const room = ROOM_DATA[id] || ROOM_DATA[1]
  const [tab, setTab] = useState('Messages')
  const [activeTab, setActiveTab] = useState('Room Chat')
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState(MESSAGES)
  const [muted, setMuted] = useState(false)
  const [camOff, setCamOff] = useState(false)
  const [screen, setScreen] = useState(false)

  const sendMsg = (e) => {
    e.preventDefault()
    if (!msg.trim()) return
    setMessages(m => [...m, { user: 'You', time: 'now', text: msg, self: true }])
    setMsg('')
  }

  return (
    <div className="room-detail">
      {/* Top bar */}
      <div className="room-topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/rooms')}>← Back to Rooms</button>
        <div className="flex items-center gap-2">
          <div style={{ fontWeight: 700 }}>{room.name} 🌿</div>
          <span className="badge badge-green">{room.subject}</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>👥 {room.members} Participants</span>
          <button className="btn btn-danger btn-sm">Leave Room</button>
        </div>
      </div>

      <div className="room-body">
        {/* Left: Video + controls */}
        <div className="room-left">
          {/* Tab: Notes/Tasks */}
          <div className="flex gap-2" style={{ marginBottom: 16 }}>
            {['Notes', 'Tasks', 'Members'].map(t => (
              <button key={t} className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          {/* Video grid */}
          <div className="room-video-grid">
            {PARTICIPANTS.map((p, i) => (
              <div key={i} className={`room-video-tile ${p.speaking ? 'speaking' : ''}`}>
                <div style={{ fontSize: 36 }}>{p.emoji}</div>
                <div className="room-video-name">{p.name}</div>
                {p.speaking && <div className="room-speaking-indicator">🎤</div>}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="room-controls">
            <button className={`room-ctrl-btn ${muted ? 'active' : ''}`} onClick={() => setMuted(!muted)}
              title="Toggle Mic">{muted ? '🔇' : '🎤'}</button>
            <button className={`room-ctrl-btn ${camOff ? 'active' : ''}`} onClick={() => setCamOff(!camOff)}
              title="Toggle Camera">{camOff ? '📵' : '📷'}</button>
            <button className={`room-ctrl-btn ${screen ? 'active' : ''}`} onClick={() => setScreen(!screen)}
              title="Screen Share">🖥️</button>
            <button className="room-ctrl-btn" title="Settings">⚙️</button>
            <button className="room-ctrl-btn danger" title="Leave">📞</button>
          </div>

          {/* Settings panel */}
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Room Settings</div>
            {['Mute Chat', 'Mute Camera', 'Mute Mic', 'Allow Recording', 'Lose Leave'].map(s => (
              <label key={s} className="flex justify-between items-center" style={{ marginBottom: 10, cursor: 'pointer' }}>
                <span style={{ fontSize: 13 }}>{s}</span>
                <div className="toggle-switch"><div className="toggle-thumb" /></div>
              </label>
            ))}
          </div>
        </div>

        {/* Right: Chat */}
        <div className="room-right">
          <div className="room-panel">
            {/* Tabs */}
            <div className="flex gap-2 items-center" style={{ marginBottom: 16, borderBottom: '1.5px solid var(--border)', paddingBottom: 12 }}>
              {['Messages', 'Pinned', 'Tasks'].map(t => (
                <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>

            {activeTab === 'Messages' && (
              <>
                <div className="room-messages">
                  {messages.map((m, i) => (
                    <div key={i} className={`room-message ${m.self ? 'self' : ''}`}>
                      {!m.self && <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--green)' }}>{m.user}</div>}
                      <div className="room-message-bubble">{m.text}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{m.time}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--green-bg)', borderRadius: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>🤖 AI Assistant</div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Need help with this topic? Ask AI anything!</div>
                  </div>
                </div>
                <form className="room-input-bar" onSubmit={sendMsg}>
                  <input className="input" placeholder="Type a message..." value={msg}
                    onChange={e => setMsg(e.target.value)} />
                  <button type="submit" className="btn btn-primary btn-sm">Send</button>
                </form>
              </>
            )}

            {activeTab !== 'Messages' && (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-3)' }}>
                No {activeTab.toLowerCase()} yet
              </div>
            )}
          </div>

          {/* Members */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700 }}>Members ({MEMBERS.length})</div>
              <button className="btn btn-outline btn-sm">View All</button>
            </div>
            {MEMBERS.slice(0, 4).map((m, i) => (
              <div key={i} className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{m.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
              </div>
            ))}
          </div>

          {/* Shared files */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700 }}>Shared Files</div>
              <button className="btn btn-outline btn-sm">View All</button>
            </div>
            {SHARED_FILES.map((f, i) => (
              <div key={i} className="flex items-center gap-2" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{f.size} · {f.by}</div>
                </div>
                <button className="btn btn-ghost btn-sm">↓</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
