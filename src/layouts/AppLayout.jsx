import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { useAuth } from '../App'

export default function AppLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 20 }}>🏠</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Virtual Study Space</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/rooms')}>
              + Create Room
            </button>
            <div className="avatar avatar-sm" style={{ cursor: 'pointer' }} onClick={() => navigate('/app/profile')}>
              {user?.avatar || 'AM'}
            </div>
          </div>
        </header>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
