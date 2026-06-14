import { useState } from 'react'
import './Leaderboard.css'

const TOP3 = [
  { rank: 2, name: 'Sara Khan', uni: 'National University of Sciences', xp: 4270, avatar: '👩', badge: '🥈' },
  { rank: 1, name: 'Zain Ali', uni: 'Lahore University of Mgmt. Sci.', xp: 6420, avatar: '👨', badge: '🥇' },
  { rank: 3, name: 'Ahmad Raza (You)', uni: 'University of Central Punjab', xp: 4250, avatar: '🧑', badge: '🥉', isYou: true },
]

const FULL_RANKINGS = [
  { rank: 1, name: 'Zain Ali', uni: 'Lahore University of Mgmt. Sci.', xp: 6420, streak: 166, rooms: 25 },
  { rank: 2, name: 'Sara Khan', uni: 'National University of Sciences', xp: 4270, streak: 120, rooms: 12 },
  { rank: 3, name: 'Ahmad Raza (You)', uni: 'University of Central Punjab', xp: 4250, streak: 129, rooms: 28, isYou: true },
  { rank: 4, name: 'Hamza Niaz', uni: 'FAST NUCES', xp: 3980, streak: 80, rooms: 22, badge: 'FAST NUCES' },
  { rank: 5, name: 'Ayasha Malik', uni: 'COMSATS University', xp: 3450, streak: 166, rooms: 24 },
  { rank: 6, name: 'Usman Tariq', uni: 'Information Technology Univ.', xp: 4980, streak: 88, rooms: 22 },
  { rank: 7, name: 'Noa Fatima', uni: 'Punjab University', xp: 4630, streak: 88, rooms: 20 },
  { rank: 8, name: 'Bilal Ahmed', uni: 'Lahore University of Mgmt. Sci.', xp: 4370, streak: 16, rooms: 18 },
  { rank: 9, name: 'Hina Batooli', uni: 'National Textile University', xp: 4050, streak: 60, rooms: 14 },
  { rank: 10, name: 'Ali Hasnain', uni: 'FAST NUCES', xp: 3890, streak: 56, rooms: 22, badge: 'FAST NUCES' },
]

const STATS = [
  { label: 'Global Rank', value: '#3', icon: '🌍' },
  { label: 'Total XP', value: '4,250 ⚡', icon: '⚡' },
  { label: 'Current Streak', value: '12 Days 🔥', icon: '🔥' },
  { label: 'Percentile', value: 'Top 5%', icon: '📊' },
  { label: 'This Week', value: '+320 ↑', icon: '📈' },
]

export default function Leaderboard() {
  const [scope, setScope] = useState('All Time')
  const [view, setView] = useState('Global')

  return (
    <div className="page-inner">
      {/* Banner */}
      <div className="lb-banner">
        <div className="lb-banner-content">
          <div style={{ fontSize: 28, marginBottom: 6 }}>🏆</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Leaderboard</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>See how you rank among all VSS students</div>
        </div>
        <div className="lb-your-rank">
          Your Rank: <span style={{ fontWeight: 800 }}>#3</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 items-center" style={{ margin: '20px 0' }}>
        {['Global', 'My University', 'My Rooms'].map(v => (
          <button key={v} className={`btn btn-sm ${view === v ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView(v)}>{v}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {['All Time', 'This Month', 'This Week', 'Today'].map(s => (
            <button key={s} className={`btn btn-sm ${scope === s ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setScope(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="lb-podium">
        {TOP3.map(p => (
          <div key={p.rank} className={`lb-podium-item ${p.rank === 1 ? 'first' : ''} ${p.isYou ? 'you' : ''}`}>
            <div className="lb-podium-avatar">{p.avatar}</div>
            <div className="lb-podium-badge">{p.badge}</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{p.uni}</div>
            <div className="badge badge-yellow">⚡ {p.xp.toLocaleString()} XP</div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>🏅 Full Rankings ✨</div>
        <div className="lb-table">
          <div className="lb-table-head">
            <span>Rank</span>
            <span>Player</span>
            <span>University</span>
            <span>XP</span>
            <span>Streak</span>
            <span>Rooms</span>
            <span>Badge</span>
          </div>
          {FULL_RANKINGS.map(r => (
            <div key={r.rank} className={`lb-table-row ${r.isYou ? 'you' : ''}`}>
              <span style={{ fontWeight: 700, color: r.rank <= 3 ? 'var(--yellow)' : 'var(--text)' }}>
                {r.rank <= 3 ? ['🥇','🥈','🥉'][r.rank-1] : r.rank}
              </span>
              <span className="flex items-center gap-2">
                <span style={{ fontSize: 20 }}>🧑</span>
                <span style={{ fontWeight: 600 }}>{r.name} {r.isYou ? <span className="badge badge-blue">You</span> : null}</span>
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.uni}</span>
              <span className="badge badge-yellow">⚡ {r.xp.toLocaleString()}</span>
              <span style={{ fontSize: 13 }}>🔥 {r.streak}</span>
              <span style={{ fontSize: 13 }}>🚪 {r.rooms}</span>
              <span>{r.badge ? <span className="badge badge-red">{r.badge}</span> : '—'}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center" style={{ marginTop: 16 }}>
          <button className="btn btn-outline btn-sm">← Previous</button>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} className={`btn btn-sm ${n === 1 ? 'btn-primary' : 'btn-ghost'}`}>{n}</button>
            ))}
            <span style={{ padding: '5px 8px', fontSize: 13 }}>...</span>
            <button className="btn btn-ghost btn-sm">Next →</button>
          </div>
        </div>
      </div>

      {/* My Stats */}
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>📊 My Stats Summary</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          {STATS.map(s => (
            <div key={s.label} className="stat-card" style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: 18 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>XP Progress to Next Rank</div>
        <div className="flex items-center gap-3">
          <div style={{ flex: 1 }}>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: '78%' }} />
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>78%</span>
        </div>
        <div className="flex justify-between" style={{ marginTop: 6, fontSize: 12, color: 'var(--text-3)' }}>
          <span>6,350 XP — Current XP</span>
          <span>1,250 XP to reach Rank #2</span>
          <span>7,600 XP — XP for Rank #2</span>
        </div>
      </div>
    </div>
  )
}
