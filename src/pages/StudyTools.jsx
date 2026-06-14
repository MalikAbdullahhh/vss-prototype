import { useState, useEffect, useRef } from 'react'
import './StudyTools.css'

const TASKS = [
  { id: 1, title: 'Complete Data Structures Assignment', room: 'DSA', due: 'May 16, 2025', priority: 'High', done: false },
  { id: 2, title: 'Read Thermodynamics Chapter 3', room: 'Maths', due: 'May 16, 2025', priority: 'Medium', done: true },
  { id: 3, title: 'Revise Math Formulas', room: 'Maths', due: 'May 13, 2025', priority: 'Low', done: false },
  { id: 4, title: 'Attend AI & ML Webinar', room: 'AI & ML', due: 'May 19, 2025', priority: 'High', done: false },
]

const NOTES_LIST = [
  { title: 'Photosynthesis Summary', content: 'Photosynthesis is the process used by green plants to make their own food.', time: '1 hour ago' },
  { title: 'Important Equations', content: 'Sunlight + Water + Carbon Dioxide → Glucose (Food) + Oxygen', time: '2 hours ago' },
  { title: 'Chemistry Learning Tips', content: 'Carbon is in many important molecules in life — the "backbone" of organic chemistry.', time: '1 day ago' },
  { title: 'Project Ideas', content: 'AI Study assistant with voice recognition for note-taking.', time: '2 days ago' },
]

export default function StudyTools() {
  const [timerSec, setTimerSec] = useState(25 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(2)
  const [tasks, setTasks] = useState(TASKS)
  const [taskFilter, setTaskFilter] = useState('All')
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState(NOTES_LIST)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSec(s => {
          if (s <= 1) {
            setTimerRunning(false)
            clearInterval(timerRef.current)
            return isBreak ? 25 * 60 : 5 * 60
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [timerRunning, isBreak])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const toggleTask = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const addNote = () => {
    if (!newNote.trim()) return
    setNotes(n => [{ title: 'New Note', content: newNote, time: 'just now' }, ...n])
    setNewNote('')
  }

  const filteredTasks = tasks.filter(t =>
    taskFilter === 'All' ? true :
    taskFilter === 'Progress' ? !t.done :
    taskFilter === 'Upcoming' ? !t.done :
    t.done
  )

  const progress = Math.round((1 - timerSec / (25 * 60)) * 100)

  return (
    <div className="page-inner">
      <div className="section-header">
        <div>
          <div className="section-title">🛠️ Study Tools ✨</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Smart and simple tools to help you study better and stay productive.</div>
        </div>
      </div>

      <div className="study-tools-grid">
        {/* Study Planner */}
        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>📅 Study Planner</div>
            <button className="btn btn-primary btn-sm">+ Create Task</button>
          </div>
          <div className="flex gap-2" style={{ marginBottom: 14 }}>
            {['All', 'Progress', 'Upcoming', 'Completed'].map(f => (
              <button key={f} className={`btn btn-sm ${taskFilter === f ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setTaskFilter(f)}>{f}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 10 }}>
            Progress: {tasks.filter(t => t.done).length}/{tasks.length} tasks
          </div>
          <div className="progress-bar" style={{ marginBottom: 14 }}>
            <div className="progress-fill" style={{ width: `${(tasks.filter(t=>t.done).length/tasks.length)*100}%` }} />
          </div>
          {filteredTasks.map(t => (
            <div key={t.id} className={`task-item ${t.done ? 'done' : ''}`}>
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)}
                style={{ accentColor: 'var(--green)', width: 16, height: 16, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-3)' : 'var(--text)' }}>{t.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{t.room} · {t.due}</div>
              </div>
              <span className={`badge ${t.priority === 'High' ? 'badge-red' : t.priority === 'Medium' ? 'badge-yellow' : 'badge-green'}`}>
                {t.priority}
              </span>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
            View Completed (1) →
          </button>
        </div>

        {/* Pomodoro Timer */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🍅 Pomodoro Timer</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>
            Focus better with Pomodoro technique and track your sessions.
          </div>
          <div className="flex gap-2 justify-center" style={{ marginBottom: 24 }}>
            <button className="btn btn-sm" style={{ background: isBreak ? 'var(--bg)' : 'var(--green)', color: isBreak ? 'var(--text)' : '#fff' }}
              onClick={() => { setIsBreak(false); setTimerSec(25*60); setTimerRunning(false) }}>Focus Time</button>
            <button className="btn btn-sm" style={{ background: isBreak ? 'var(--green)' : 'var(--bg)', color: isBreak ? '#fff' : 'var(--text)' }}
              onClick={() => { setIsBreak(true); setTimerSec(5*60); setTimerRunning(false) }}>Start Break</button>
          </div>
          <div className="pomodoro-circle">
            <svg viewBox="0 0 120 120" width="160" height="160">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--green)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - (1 - timerSec / (isBreak ? 5*60 : 25*60)))}`}
                strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 1s' }} />
              <text x="60" y="55" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text)">{formatTime(timerSec)}</text>
              <text x="60" y="74" textAnchor="middle" fontSize="10" fill="var(--text-3)">{isBreak ? 'Break' : 'Focus Time'}</text>
            </svg>
          </div>
          <div className="flex gap-3 justify-center" style={{ marginTop: 16 }}>
            <div className="stat-card" style={{ padding: '8px 16px', textAlign: 'center', minWidth: 70 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{sessions}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Completed</div>
            </div>
            <div className="stat-card" style={{ padding: '8px 16px', textAlign: 'center', minWidth: 70 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>50m</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Today's Focus</div>
            </div>
          </div>
          <div className="flex gap-2 justify-center" style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={() => setTimerRunning(r => !r)}>
              {timerRunning ? '⏸ Pause' : '▶ Start Focus'}
            </button>
            <button className="btn btn-outline" onClick={() => { setTimerRunning(false); setTimerSec(isBreak ? 5*60 : 25*60) }}>Reset</button>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-3)' }}>
            Today: {sessions} sessions · 10:30 AM – Focus · 11:05 AM – Break · 11:10 AM – Focus
          </div>
        </div>

        {/* Quick Notes */}
        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>📋 Quick Notes</div>
            <button className="btn btn-outline btn-sm">+ New Note</button>
          </div>
          <textarea className="input" rows={3} placeholder="Jot down a quick note..."
            value={newNote} onChange={e => setNewNote(e.target.value)} style={{ marginBottom: 8 }} />
          <button className="btn btn-primary btn-sm" onClick={addNote} style={{ marginBottom: 16 }}>Save to Notes →</button>
          {notes.map((n, i) => (
            <div key={i} className="card" style={{ padding: '12px', marginBottom: 10, background: i === 0 ? '#fffde7' : 'var(--bg)' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{n.title}</div>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm">📋</button>
                  <button className="btn btn-ghost btn-sm">✏️</button>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{n.content}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{n.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracker + Room Activity */}
      <div className="grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 16 }}>📈 Progress Tracker</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Track your study progress and achievements over time.</div>
          <div className="grid-4" style={{ marginBottom: 16, gap: 10 }}>
            {[{ v: '4h', l: 'Study Hours' }, { v: '17', l: 'Tasks Done' }, { v: '8', l: 'Rooms Active' }, { v: '12', l: 'Streak Days' }].map(s => (
              <div key={s.l} className="stat-card" style={{ padding: '10px', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Weekly Study Activity</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
            {[2, 4, 3, 5, 2, 6, 4].map((h, i) => (
              <div key={i} style={{ flex: 1, background: i === 5 ? 'var(--green)' : 'var(--green-bg)', borderRadius: 4, height: `${h * 10}px`, transition: 'height 0.3s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: 'var(--text-3)' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🕐 Room Activity</div>
          {[
            { text: 'Completed task "Thermodynamics Revision"', time: '3 hours ago', icon: '✅' },
            { text: 'Completed a Pomodoro session', time: '4 hours ago', icon: '🍅' },
            { text: 'Uploaded file "DSA Notes.pdf"', time: '5 hours ago', icon: '📁' },
            { text: 'Joined room "AI & ML Learners"', time: '6 hours ago', icon: '🚪' },
            { text: 'Created a quick note', time: 'Yesterday', icon: '📝' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 12 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
