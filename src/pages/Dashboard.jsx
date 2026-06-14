import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import './Dashboard.css'

const activityData = [
  { day: 'Mon', hours: 2 }, { day: 'Tue', hours: 4 }, { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 }, { day: 'Fri', hours: 2 }, { day: 'Sat', hours: 6 }, { day: 'Sun', hours: 4 },
]

const recentActivity = [
  { text: 'Completed task "Thermodynamics Revision"', time: '3 hours ago', icon: '✅' },
  { text: 'Completed a Pomodoro session', time: '4 hours ago', icon: '🍅' },
  { text: 'Created a quick note', time: '5 hours ago', icon: '📝' },
  { text: 'Uploaded file "DSA Notes.pdf"', time: '6 hours ago', icon: '📁' },
  { text: 'Joined room "AI & ML Learners"', time: 'Yesterday', icon: '🚪' },
]

const quickStats = [
  { label: 'Study Hours', value: '52h', sub: 'This Week', icon: '⏱️' },
  { label: 'Tasks Completed', value: '17', sub: 'Total', icon: '✅' },
  { label: 'Rooms Joined', value: '8', sub: 'Active', icon: '🚪' },
  { label: 'Notes Created', value: '24', sub: 'Total', icon: '📝' },
  { label: 'Files Uploaded', value: '12', sub: 'Total', icon: '📁' },
  { label: 'Study Break', value: '7', sub: 'Days', icon: '☕' },
]

const STUDY_ROOMS = [
  { name: 'Common Study Room', desc: '🌐 Always Open', sub: 'Drop in anytime', badge: 'Open', members: 24 },
  { name: 'DSA Study Group', sub: 'Computer Science', members: 8, badge: 'Joined' },
  { name: 'Python Practice', sub: 'Computer Science', members: 12 },
  { name: 'Info Security Rev', sub: 'Exam & Revision', members: 6 },
]

const AI_TOOLS = [
  { icon: '🤖', label: 'AI Assistant', desc: 'Get AI help & guidelines' },
  { icon: '📁', label: 'My Files', desc: 'Access your saved documents' },
  { icon: '📝', label: 'My Notes', desc: 'Your personal study notes' },
  { icon: '🏆', label: 'Leaderboard', desc: 'See who is studying more' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page-inner">
      {/* Common Study Room Banner */}
      <div className="dashboard-banner">
        <div className="dashboard-banner-text">
          <div className="badge badge-green" style={{ marginBottom: 8 }}>Always Open</div>
          <h2>Common Study Room 🌿</h2>
          <p>Drop in anytime — study alongside other students right now</p>
          <div className="flex items-center gap-2" style={{ marginTop: 8 }}>
            {['🧑','👩','👨','🧕'].map((e,i) => (
              <span key={i} style={{ fontSize: 18 }}>{e}</span>
            ))}
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>24 Members Online</span>
          </div>
        </div>
        <button className="btn" style={{ background: '#fff', color: 'var(--green)', fontWeight: 700 }}
          onClick={() => navigate('/app/rooms')}>
          Join Now →
        </button>
        <div className="dashboard-banner-deco">🧑‍💻</div>
      </div>

      {/* Study Rooms Section */}
      <div className="section-header" style={{ marginTop: 28 }}>
        <div className="section-title">📚 Study Rooms <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-3)' }}>Join a focused subject room</span></div>
        <div className="flex gap-2">
          {['All', 'Computer Science', 'Exam & Revision', 'General'].map(t => (
            <button key={t} className={`btn btn-sm ${t === 'All' ? 'btn-primary' : 'btn-outline'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        {STUDY_ROOMS.map(r => (
          <div key={r.name} className="card dashboard-room-card" onClick={() => navigate('/app/rooms')}>
            <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
              <span className="badge badge-blue">{r.sub || 'Computer Science'}</span>
              {r.badge && <span className={`badge ${r.badge === 'Open' ? 'badge-green' : 'badge-yellow'}`}>{r.badge}</span>}
            </div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>
              Summarize notes, generate quizzes, and get instant help with your studies
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>👥 {r.members} members</span>
              <button className={`btn btn-sm ${r.badge === 'Open' ? 'btn-primary' : 'btn-outline'}`}>
                {r.badge === 'Joined' ? 'Open' : 'Join'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="section-header">
        <div className="section-title">⚡ Quick Access</div>
      </div>
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {AI_TOOLS.map(t => (
          <div key={t.label} className="card dashboard-tool-card" onClick={() => {
            if (t.label === 'AI Assistant') navigate('/app/ai')
            else if (t.label === 'My Files') navigate('/app/files')
            else if (t.label === 'My Notes') navigate('/app/notes')
            else navigate('/app/leaderboard')
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      {/* Stats + Activity */}
      <div className="grid-2">
        <div>
          <div className="section-title" style={{ marginBottom: 16 }}>📊 Progress Tracker</div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 12 }}>Study Hours This Week</div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={activityData}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="hours" stroke="var(--green)" strokeWidth={2} dot={{ r: 4, fill: 'var(--green)' }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid-3" style={{ marginTop: 16, gap: 10 }}>
              {quickStats.slice(0, 3).map(s => (
                <div key={s.label} className="stat-card" style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 18 }}>{s.icon}</div>
                  <div className="stat-value" style={{ fontSize: 18 }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="section-title" style={{ marginBottom: 16 }}>🕐 Recent Activity</div>
          <div className="card" style={{ padding: 20 }}>
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3" style={{ marginBottom: 16, paddingBottom: i < recentActivity.length - 1 ? 16 : 0, borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
