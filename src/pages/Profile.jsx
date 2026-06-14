import { useAuth } from '../App'
import './Profile.css'

const ACTIVITY_GRID = Array.from({ length: 7 * 8 }, (_, i) => ({
  active: Math.random() > 0.55,
  intensity: Math.floor(Math.random() * 4)
}))

const RECENT_ACTIVITY = [
  { text: 'Joined DSA Study Group', time: 'Add to Saved', icon: '🚪' },
  { text: 'Uploaded "DSA Notes.pdf"', time: 'Add to Saved', icon: '📁' },
  { text: 'Created a note in Calculus Corner', time: 'Add to Saved', icon: '📝' },
  { text: 'Completed Pomodoro session', time: 'Add to Saved', icon: '🍅' },
  { text: 'Ranked #3 on Leaderboard', time: 'Add to Saved', icon: '🏆' },
]

const LEADERBOARD_NEARBY = [
  { rank: 1, name: 'Zain Ali', xp: '6,420 XP' },
  { rank: 2, name: 'Sara Khan', xp: '4,270 XP' },
  { rank: 3, name: 'Ahmad Raza', xp: '4,250 XP', isYou: true },
  { rank: 4, name: 'Hamza Niaz', xp: '3,980 XP' },
]

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="page-inner">
      <div className="profile-layout">
        {/* Left col */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Profile card */}
          <div className="card profile-header-card">
            <div className="profile-avatar-area">
              <div className="avatar avatar-xl">{user?.avatar || 'AM'}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 22 }}>{user?.name || 'Abdullah Malik'}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13 }}>@{user?.username || 'AbdullahMalik'}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13 }}>🏛️ {user?.university || 'University of Central Punjab'}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Learning today, leading tomorrow</div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm">✏️ Edit Profile</button>
          </div>

          {/* Stats row */}
          <div className="grid-4" style={{ margin: '16px 0' }}>
            {[
              { value: '4,250', label: 'XP', sub: 'Total XP', icon: '⚡' },
              { value: '12 Days', label: 'Streak', sub: 'Current Streak', icon: '🔥' },
              { value: '28', label: 'Rooms', sub: 'Rooms Joined', icon: '🚪' },
              { value: '47', label: 'Files', sub: 'Files Shared', icon: '📁' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Rank row */}
          <div className="card" style={{ marginBottom: 16, padding: '16px 20px' }}>
            <div className="flex justify-between items-center">
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Your Rank</div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>Top 8% of all students</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>1,250 XP to reach Rank #2</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 32, color: 'var(--green)' }}>#3</div>
                <div className="badge badge-green">FAST NUCES</div>
              </div>
            </div>
          </div>

          {/* Study Activity */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📊 Study Activity</div>
            <div className="activity-grid">
              {ACTIVITY_GRID.map((cell, i) => (
                <div key={i} className={`activity-cell intensity-${cell.active ? cell.intensity : 0}`} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Last 8 weeks of study activity</div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700 }}>🕐 Recent Activity</div>
              <button className="btn btn-ghost btn-sm">View All Activities →</button>
            </div>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center gap-3" style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div style={{ flex: 1, fontSize: 13 }}>{a.text}</div>
                <button className="btn btn-outline btn-sm">{a.time}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="profile-right-col">
          {/* Leaderboard preview */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🏆 Leaderboard Position (Top 8%)</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 10 }}>Subject Breakdown:</div>
            {[
              { sub: 'Let set', xp: '3,570 XP' }, { sub: 'Maths', xp: '3,520 XP' },
              { sub: 'Chemistry', xp: '3,450 XP' }, { sub: 'Ahmad Raza Chan', xp: '3,280 XP' },
              { sub: 'Hamza Malik', xp: '3,180 XP' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span>{r.sub}</span>
                <span className="badge badge-yellow">⚡ {r.xp}</span>
              </div>
            ))}
            <div style={{ marginTop: 10 }}>
              {LEADERBOARD_NEARBY.map(r => (
                <div key={r.rank} className={`flex justify-between items-center p-2 ${r.isYou ? 'badge badge-green' : ''}`}
                  style={{ padding: '6px 8px', borderRadius: 6, marginBottom: 4, background: r.isYou ? 'var(--green-bg)' : 'transparent' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.rank}. {r.name} {r.isYou ? '(You)' : ''}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements preview */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🎖️ Achievements</div>
            <div className="grid-2" style={{ gap: 8 }}>
              {[
                { icon: '🎖️', label: 'AI Enthusiast', desc: 'Used AI 20 times', progress: 74 },
                { icon: '🔥', label: 'Streak Master', desc: 'Study 7 days in a row', progress: 100 },
                { icon: '⚡', label: 'XP Grinder', desc: 'Earn 1,000 XP', progress: 88 },
                { icon: '🚪', label: 'Room Explorer', desc: 'Join 10 rooms', progress: 60 },
              ].map((a, i) => (
                <div key={i} className="card" style={{ padding: 12 }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>{a.desc}</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${a.progress}%`, background: a.progress === 100 ? 'var(--green)' : 'var(--blue)' }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>{a.progress}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
