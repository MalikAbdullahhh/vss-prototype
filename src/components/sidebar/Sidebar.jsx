import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../App'
import './Sidebar.css'

const NAV = [
  { to: '/app/profile', icon: '👤', label: 'Profile' },
  { to: '/app/notes', icon: '📝', label: 'Notes' },
  { to: '/app/ai', icon: '🤖', label: 'AI Assist' },
  { to: '/app/chat', icon: '💬', label: 'Chat' },
  { to: '/app/leaderboard', icon: '🏆', label: 'Leaderboard' },
  { to: '/app', end: true, icon: '📊', label: 'Dashboard' },
  { to: '/app/files', icon: '📁', label: 'My Files' },
  { to: '/app/rooms', icon: '🚪', label: 'Rooms' },
  { to: '/app/notes', icon: '🗒️', label: 'Notes' },
  { to: '/app/study-tools', icon: '🛠️', label: 'Study Tools' },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const items = [
    { to: '/app/profile', emoji: '👤' },
    { to: '/app/notes', emoji: '📝' },
    { to: '/app/ai', emoji: '🤖' },
    { to: '/app/chat', emoji: '💬' },
    { to: '/app/leaderboard', emoji: '🏆' },
    { to: '/app', end: true, emoji: '📊' },
    { to: '/app/files', emoji: '📁' },
    { to: '/app/rooms', emoji: '🚪' },
    { to: '/app/study-tools', emoji: '🛠️' },
    { to: '/app/achievements', emoji: '🎖️' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('/app')}>
        <div className="sidebar-logo-icon">🏠</div>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to + item.emoji}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-emoji">{item.emoji}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-item" onClick={() => { logout(); navigate('/') }}>
          <span className="sidebar-emoji">🚪</span>
        </button>
      </div>
    </aside>
  )
}
