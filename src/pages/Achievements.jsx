import { useNavigate } from 'react-router-dom'
import './Achievements.css'

const BADGES = [
  { icon: '🔥', label: 'Streak Master', desc: 'Study 7 days in a row', date: 'May 10, 2025', done: true, progress: 100 },
  { icon: '⚡', label: 'XP Grinder', desc: 'Earn 1,000 XP total', date: 'May 8, 2025', done: true, progress: 100 },
  { icon: '🚪', label: 'Room Explorer', desc: 'Join 10 rooms', date: 'May 5, 2025', done: false, progress: 60, current: 6 },
  { icon: '👥', label: 'Active Participant', desc: 'Send 50 messages', date: 'May 10, 2025', done: true, progress: 100 },
  { icon: '🎖️', label: 'AI Enthusiast', desc: 'Use AI tools 20 times', date: '', done: false, progress: 74, current: 14 },
  { icon: '🏆', label: 'Leaderboard Legend', desc: 'Reach Top 10', date: 'May 8, 2025', done: true, progress: 100 },
  { icon: '📁', label: 'File Sharer', desc: 'Upload 5 study files', date: '', done: false, progress: 80, current: 4 },
  { icon: '✅', label: 'Perfect Week', desc: 'Complete all tasks in a week', date: '', done: false, progress: 40 },
  { icon: '📝', label: 'Note Taker', desc: 'Create 10 notes', date: '', done: false, progress: 50, current: 5 },
  { icon: '🎯', label: 'Goal Setter', desc: 'Set 5 study goals', date: '', done: false, progress: 20, current: 1 },
  { icon: '🌍', label: 'Global Scholar', desc: 'Reach Top 5% globally', date: '', done: false, progress: 30 },
  { icon: '🧠', label: 'Knowledge Seeker', desc: 'Study 50 hours total', date: '', done: false, progress: 85, current: 42 },
]

const MILESTONES = [
  { icon: '🔥', label: 'Streak Master', date: 'May 10, 2025' },
  { icon: '👥', label: 'Active Participant', date: 'May 8, 2025' },
  { icon: '⚡', label: 'XP Milestone', date: 'May 8, 2025' },
  { icon: '🏆', label: 'Leaderboard Legend', date: 'Apr 29, 2025' },
  { icon: '🚪', label: 'Level Up!', date: 'Apr 28, 2025' },
]

const CATEGORY_PROGRESS = [
  { label: 'Study', val: 60, color: 'var(--green)' },
  { label: 'Participation', val: 80, color: 'var(--blue)' },
  { label: 'Streaks', val: 56, color: 'var(--orange)' },
  { label: 'Sharing', val: 60, color: 'var(--purple)' },
  { label: 'Special', val: 33, color: 'var(--yellow)' },
]

export default function Achievements() {
  const navigate = useNavigate()
  const earned = BADGES.filter(b => b.done).length

  return (
    <div className="page-inner">
      {/* Header Banner */}
      <div className="achievements-banner">
        <div>
          <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 4 }}>🎖️ Achievements ✨</div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Celebrate your progress and unlock new milestones</div>
        </div>
        <div className="achievements-banner-stats">
          {[
            { value: earned, label: 'Achievements Earned', sub: `Out of ${BADGES.length}`, icon: '🎖️' },
            { value: 12, label: 'Day Study Streak', sub: 'Best: 24 Days', icon: '🔥' },
            { value: '4,250 XP', label: 'Total XP Earned', sub: 'Top 5% to next level', icon: '⚡' },
            { value: 'Top 5%', label: 'Global Ranking', sub: 'Among all VSS users', icon: '🌍' },
            { value: 'Level 8', label: 'Current Level', sub: 'Scholar', icon: '📚' },
          ].map(s => (
            <div key={s.label} className="achievements-stat">
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{s.label}</div>
              <div style={{ fontSize: 10, opacity: 0.6 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 60, position: 'absolute', right: 24, bottom: -10, opacity: 0.2 }}>🏆</div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2" style={{ margin: '20px 0' }}>
        {['All Achievement', 'Study', 'Participation', 'Streaks', 'Sharing', 'Special'].map(t => (
          <button key={t} className={`btn btn-sm ${t === 'All Achievement' ? 'btn-primary' : 'btn-outline'}`}>{t}</button>
        ))}
        <select className="input" style={{ maxWidth: 160, marginLeft: 'auto' }}>
          <option>Sort by: Progress</option>
          <option>Sort by: Earned</option>
          <option>Sort by: Name</option>
        </select>
      </div>

      <div className="achievements-layout">
        {/* Badges grid */}
        <div style={{ flex: 1 }}>
          <div className="achievements-grid">
            {BADGES.map((b, i) => (
              <div key={i} className={`achievement-card card ${b.done ? 'earned' : ''}`}>
                <div className="achievement-icon">{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{b.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10, lineHeight: 1.4 }}>{b.desc}</div>
                {b.done ? (
                  <div>
                    <span className="badge badge-green">✅ Earned</span>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>{b.date}</div>
                  </div>
                ) : (
                  <div>
                    <div className="progress-bar" style={{ marginBottom: 4 }}>
                      <div className="progress-fill" style={{ width: `${b.progress}%` }} />
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{b.progress}% {b.current ? `— ${b.current} done` : ''}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Category progress */}
          <div className="card" style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>📊 Achievement Progress Overview</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {CATEGORY_PROGRESS.map(c => (
                <div key={c.label} style={{ flex: 1, minWidth: 100 }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.val}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${c.val}%`, background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="achievements-right">
          {/* Next achievement */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🎯 Next Achievement</div>
            <div className="achievement-card card earned" style={{ padding: 16 }}>
              <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>🎖️</div>
              <div style={{ fontWeight: 700, textAlign: 'center' }}>AI Enthusiast</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', margin: '4px 0 10px' }}>
                Use AI tools 20 times
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '74%' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>14/20 — 74%</div>
              <button className="btn btn-primary btn-sm w-full" style={{ marginTop: 10, justifyContent: 'center' }}
                onClick={() => navigate('/app/ai')}>View Stats →</button>
            </div>
          </div>

          {/* Milestones */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🏁 Recent Milestones</div>
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{m.date}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full" style={{ marginTop: 8, justifyContent: 'center' }}>
              View All Milestones →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
