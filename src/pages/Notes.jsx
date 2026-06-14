import { useState } from 'react'
import './Notes.css'

const INIT_NOTES = [
  { id: 1, title: 'Data Structures – Lecture 5', content: 'Binary trees are hierarchical data structures in which each node has at most two children. Key operations: Insert, Delete, Search.\n\nTime complexity:\n- Search: O(log n) average\n- Insert: O(log n) average\n- Delete: O(log n) average', subject: 'Computer Science', date: 'May 12, 2025', tags: ['DSA', 'Trees', 'Algorithms'], pinned: true },
  { id: 2, title: 'Photosynthesis Summary', content: 'Photosynthesis is the process used by green plants to make their own food.\n\n🌱 Sunlight + Water + CO₂ → Glucose + Oxygen', subject: 'Biology', date: 'May 10, 2025', tags: ['Biology', 'Science'], pinned: false },
  { id: 3, title: 'Calculus – Integration Formulas', content: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n∫eˣ dx = eˣ + C\n∫sin(x) dx = -cos(x) + C\n∫cos(x) dx = sin(x) + C', subject: 'Mathematics', date: 'May 8, 2025', tags: ['Math', 'Calculus'], pinned: true },
  { id: 4, title: 'OOP Concepts Overview', content: 'The four pillars of OOP:\n1. Encapsulation – hiding internal state\n2. Abstraction – showing only relevant data\n3. Inheritance – deriving new classes\n4. Polymorphism – many forms', subject: 'Computer Science', date: 'May 5, 2025', tags: ['OOP', 'Programming'], pinned: false },
  { id: 5, title: 'Thermodynamics Laws', content: 'Zeroth Law: Thermal equilibrium\nFirst Law: Energy conservation\nSecond Law: Entropy always increases\nThird Law: Absolute zero entropy', subject: 'Physics', date: 'May 3, 2025', tags: ['Physics', 'Thermo'], pinned: false },
  { id: 6, title: 'Newton\'s Laws of Motion', content: '1st Law: An object remains at rest unless acted upon by a force.\n2nd Law: F = ma\n3rd Law: Every action has an equal and opposite reaction.', subject: 'Physics', date: 'Apr 30, 2025', tags: ['Physics', 'Mechanics'], pinned: false },
]

const COLORS = ['#fffde7', '#e8f5e9', '#e8f0fb', '#fde8e8', '#f3e8fb', '#e8f8fb']

export default function Notes() {
  const [notes, setNotes] = useState(INIT_NOTES)
  const [selected, setSelected] = useState(INIT_NOTES[0])
  const [search, setSearch] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [newMode, setNewMode] = useState(false)

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  const startEdit = () => {
    setEditTitle(selected.title)
    setEditContent(selected.content)
    setEditMode(true)
  }

  const saveEdit = () => {
    setNotes(ns => ns.map(n => n.id === selected.id ? { ...n, title: editTitle, content: editContent } : n))
    setSelected(s => ({ ...s, title: editTitle, content: editContent }))
    setEditMode(false)
  }

  const createNew = () => {
    const newNote = {
      id: Date.now(), title: 'New Note', content: 'Start writing...',
      subject: 'General', date: 'Today', tags: [], pinned: false
    }
    setNotes(ns => [newNote, ...ns])
    setSelected(newNote)
    setEditTitle(newNote.title)
    setEditContent(newNote.content)
    setEditMode(true)
  }

  const deleteNote = (id) => {
    setNotes(ns => ns.filter(n => n.id !== id))
    setSelected(notes.find(n => n.id !== id) || null)
  }

  const togglePin = (id) => setNotes(ns => ns.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))

  const pinned = filtered.filter(n => n.pinned)
  const unpinned = filtered.filter(n => !n.pinned)

  return (
    <div className="notes-layout">
      {/* Sidebar list */}
      <div className="notes-list-panel">
        <div className="notes-list-header">
          <div style={{ fontWeight: 800, fontSize: 16 }}>📝 My Notes</div>
          <button className="btn btn-primary btn-sm" onClick={createNew}>+ New</button>
        </div>
        <input className="input" placeholder="🔍 Search notes..." value={search}
          onChange={e => setSearch(e.target.value)} style={{ marginBottom: 12 }} />

        {pinned.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase' }}>📌 Pinned</div>
            {pinned.map((n, i) => (
              <div key={n.id} className={`note-list-item ${selected?.id === n.id ? 'active' : ''}`}
                style={{ background: COLORS[i % COLORS.length] }}
                onClick={() => { setSelected(n); setEditMode(false) }}>
                <div className="flex justify-between items-center">
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{n.title}</div>
                  <span style={{ fontSize: 14 }}>📌</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{n.date}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {n.content.split('\n')[0]}
                </div>
              </div>
            ))}
          </>
        )}

        {unpinned.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', margin: '12px 0 6px', textTransform: 'uppercase' }}>All Notes</div>
            {unpinned.map((n, i) => (
              <div key={n.id} className={`note-list-item ${selected?.id === n.id ? 'active' : ''}`}
                onClick={() => { setSelected(n); setEditMode(false) }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{n.date} · {n.subject}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {n.content.split('\n')[0]}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Editor */}
      <div className="notes-editor">
        {selected ? (
          <>
            <div className="notes-editor-header">
              <div style={{ flex: 1 }}>
                {editMode ? (
                  <input className="notes-title-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                ) : (
                  <h1 className="notes-view-title">{selected.title}</h1>
                )}
                <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
                  <span className="badge badge-blue">{selected.subject}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{selected.date}</span>
                  {selected.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm" onClick={() => togglePin(selected.id)}>
                  {selected.pinned ? '📌' : '📍'}
                </button>
                {editMode ? (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={saveEdit}>💾 Save</button>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditMode(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline btn-sm" onClick={startEdit}>✏️ Edit</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => deleteNote(selected.id)}>🗑️</button>
                  </>
                )}
              </div>
            </div>

            <div className="notes-editor-body">
              {editMode ? (
                <textarea className="notes-textarea" value={editContent}
                  onChange={e => setEditContent(e.target.value)} />
              ) : (
                <div className="notes-content">
                  {selected.content.split('\n').map((line, i) => (
                    <p key={i} style={{ marginBottom: 6 }}>{line || <br />}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom toolbar */}
            {editMode && (
              <div className="notes-toolbar">
                {['B', 'I', 'U', '—', 'H1', 'H2', '—', '• List', '1. List', '—', 'Link', 'Image'].map((t, i) => (
                  t === '—' ? <div key={i} style={{ width: 1, height: 20, background: 'var(--border)' }} /> :
                  <button key={t} className="btn btn-ghost btn-sm" style={{ minWidth: 32, fontWeight: t.length === 1 ? 800 : 600 }}>{t}</button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: 'var(--text-3)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Select a note or create a new one</div>
            <button className="btn btn-primary" onClick={createNew}>+ Create New Note</button>
          </div>
        )}
      </div>
    </div>
  )
}
