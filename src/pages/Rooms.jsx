import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Rooms.css'

const ROOMS = [
  { id: 1, name: 'DSA Study Group', subject: 'Computer Science', privacy: 'Public', members: 8, max: 15, desc: 'Solving DSA problems together and preparing for coding interviews', tags: ['Arrays', 'Graphs'], active: true },
  { id: 2, name: 'Calculus Warriors', subject: 'Mathematics', privacy: 'Public', members: 11, max: 20, desc: 'Master calculus concepts with practice problems and doubt clearing', tags: ['Integration', 'Limits'] },
  { id: 3, name: 'Physics Hub', subject: 'Physics', privacy: 'Public', members: 7, max: 15, desc: 'Discuss theories, solve numericals and explore the world of physics', tags: ['Mechanics'] },
  { id: 4, name: 'Web Dev Crew', subject: 'Computer Science', privacy: 'Public', members: 19, max: 25, desc: 'Build projects, share resources and learn full-stack development', tags: ['React', 'Node'] },
  { id: 5, name: 'AI & ML Learners', subject: 'Computer Science', privacy: 'Public', members: 14, max: 20, desc: 'Explore machine learning concepts, models and real-world applications', tags: ['ML', 'AI'] },
  { id: 6, name: 'English Literature', subject: 'General', privacy: 'Public', members: 9, max: 15, desc: 'Read, analyse and discuss literature and improve your writing skills', tags: ['Writing'] },
]

const YOUR_ROOMS = [
  { id: 1, name: 'DSA Study Group', members: 8 },
  { id: 4, name: 'Web Dev Crew', members: 19 },
  { id: 5, name: 'AI & ML Learners', members: 14 },
]

const RECENT = [
  { text: 'Ali Raza joined DSA Study Group', time: '2 hours ago' },
  { text: 'Hina Ahmad uploaded a PDF in Physics Hub', time: '4 hours ago' },
  { text: 'Zainab Fatima created a note in Calculus Corner', time: 'Yesterday' },
  { text: 'Hamza Malik created a new room', time: 'Yesterday' },
  { text: 'Aisha Khan joined Web Dev Crew', time: '2 days ago' },
]

export default function Rooms() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All Subjects')
  const [createOpen, setCreateOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({ name: '', subject: '', desc: '', privacy: 'Private' })

  const filtered = ROOMS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (subject === 'All Subjects' || r.subject === subject)
  )

  return (
    <div className="page-inner">
      <div className="rooms-layout">
        {/* Main */}
        <div className="rooms-main">
          <div className="section-header">
            <div>
              <div className="section-title">🚪 Rooms ✨</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Create or join study rooms to collaborate, learn and grow together.</div>
            </div>
            <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>+ Create New Room</button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 items-center" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
            <input className="input" style={{ maxWidth: 220 }} placeholder="🔍 Search rooms by name or subject..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <select className="input" style={{ maxWidth: 160 }} value={subject} onChange={e => setSubject(e.target.value)}>
              <option>All Subjects</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>General</option>
            </select>
            <select className="input" style={{ maxWidth: 140 }}>
              <option>All Privacy</option>
              <option>Public</option>
              <option>Private</option>
            </select>
            <select className="input" style={{ maxWidth: 150 }}>
              <option>Sort: Newest</option>
              <option>Sort: Popular</option>
            </select>
          </div>

          <div style={{ fontWeight: 700, marginBottom: 16 }}>Existing Rooms</div>
          <div className="grid-3" style={{ marginBottom: 28 }}>
            {filtered.map(r => (
              <div key={r.id} className="card rooms-room-card">
                <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
                  <span className="badge badge-blue">{r.subject}</span>
                  <span className="badge badge-green">{r.privacy}</span>
                </div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.name} {r.active ? '🔥' : ''}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>{r.desc}</div>
                <div className="flex gap-1" style={{ marginBottom: 10, flexWrap: 'wrap' }}>
                  {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>👥 {r.members}/{r.max} members</span>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate(`/app/rooms/${r.id}`)}>
                    {YOUR_ROOMS.find(y => y.id === r.id) ? 'Open' : 'Join Room'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Form inline */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Create a New Room</div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div>
                <label className="label">Room Name</label>
                <input className="input" placeholder="Enter room name" />
              </div>
              <div>
                <label className="label">Subject / Category</label>
                <select className="input"><option>Select subject</option>
                  <option>Computer Science</option><option>Mathematics</option><option>Physics</option></select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Description</label>
                <textarea className="input" rows={2} placeholder="Tell others what this room is about..." />
              </div>
              <div>
                <label className="label">Privacy</label>
                <div className="flex gap-3">
                  {['Public', 'Private'].map(p => (
                    <label key={p} className="flex items-center gap-2" style={{ fontSize: 13, cursor: 'pointer' }}>
                      <input type="radio" name="privacy" defaultChecked={p === 'Private'} style={{ accentColor: 'var(--green)' }} />
                      {p === 'Private' ? '🔒 Only invited people can join' : `🌐 ${p}`}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 16 }}>+ Create Room</button>
          </div>
        </div>

        {/* Sidebar panel */}
        <div className="rooms-panel">
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Rooms</div>
          {YOUR_ROOMS.map(r => (
            <div key={r.id} className="flex justify-between items-center" style={{ marginBottom: 10, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8, cursor: 'pointer' }}
              onClick={() => navigate(`/app/rooms/${r.id}`)}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{r.members} members</div>
              </div>
              <span style={{ fontSize: 18 }}>⋮</span>
            </div>
          ))}

          <div style={{ fontWeight: 700, margin: '20px 0 12px' }}>Recent Activity</div>
          {RECENT.map((a, i) => (
            <div key={i} style={{ marginBottom: 12, fontSize: 12, color: 'var(--text-2)' }}>
              <div>{a.text}</div>
              <div style={{ color: 'var(--text-3)', marginTop: 2 }}>{a.time}</div>
            </div>
          ))}

          <div style={{ marginTop: 20, background: 'var(--green-bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>📚</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Study Better Together!</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', margin: '6px 0 12px' }}>
              Create a room, invite your friends, and start collaborating on your study goals.
            </div>
            <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center' }}
              onClick={() => setCreateOpen(true)}>Create New Room →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
