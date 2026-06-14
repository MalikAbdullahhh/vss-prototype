import { useState } from 'react'
import './SavedFiles.css'

const FILTERS = ['All Files', 'Computer Science', 'Exam & Revision', 'Math', 'Languages', 'General', 'My Uploads']

const FILES = [
  { name: 'Data Structures Notes.pdf', size: '2.3MB', date: 'Jan 5, 2026', subject: 'Computer Science', type: 'pdf', color: '#f9e8e8' },
  { name: 'OOP Lecture Slides.pdf', size: '4.1MB', date: 'Jan 3, 2026', subject: 'Computer Science', type: 'pdf', color: '#f9e8e8' },
  { name: 'Python Assignments Guy', size: '1.2MB', date: 'Jan 2, 2026', subject: 'Computer Science', type: 'py', color: '#e8f0fb' },
  { name: 'Database OFB Beginnings', size: '3.4MB', date: 'Dec 30, 2025', subject: 'Computer Science', type: 'db', color: '#e8f5e9' },
  { name: 'Finals Revision Sheet.pdf', size: '900KB', date: 'Dec 28, 2025', subject: 'Exam & Revision', type: 'pdf', color: '#f9e8e8' },
  { name: 'Mock Paper – Semester 4.pdf', size: '1.5MB', date: 'Dec 25, 2025', subject: 'Exam & Revision', type: 'pdf', color: '#f9e8e8' },
  { name: 'Formula Sheet Direct.pdf', size: '450KB', date: 'Dec 20, 2025', subject: 'Math', type: 'pdf', color: '#f9e8e8' },
  { name: 'Calculus Chapter 4.pdf', size: '2.1MB', date: 'Dec 18, 2025', subject: 'Math', type: 'pdf', color: '#f9e8e8' },
  { name: 'Linear Algebra Notes.pdf', size: '1.8MB', date: 'Dec 15, 2025', subject: 'Math', type: 'pdf', color: '#f9e8e8' },
  { name: 'Group Project Brief.docx', size: '3.3MB', date: 'May 5, 2026', subject: 'General', type: 'docx', color: '#e8f0fb' },
  { name: 'Study Schedule Week.pdf', size: '500KB', date: 'May 5, 2026', subject: 'General', type: 'pdf', color: '#f9e8e8' },
  { name: 'Attending Notes Junk.txt', size: '50KB', date: 'May 3, 2026', subject: 'General', type: 'txt', color: '#f0f0f0' },
]

const TYPE_ICONS = { pdf: '📄', docx: '📝', py: '🐍', db: '🗄️', txt: '📋', default: '📄' }
const SUBJECTS = ['Computer Science', 'Exam & Revision', 'Math', 'Languages', 'General']
const TAGS_LIST = ['lecture notes', 'semester 6', 'important', 'reference']

export default function SavedFiles() {
  const [active, setActive] = useState('All Files')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadStep, setUploadStep] = useState(0) // 0=empty, 1=filled, 2=uploading, 3=done
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [subject, setSubject] = useState('')
  const [visibility, setVisibility] = useState('Private')
  const [tags, setTags] = useState(['lecture notes', 'semester 6'])
  const [tagInput, setTagInput] = useState('')
  const [success, setSuccess] = useState(false)

  const filtered = active === 'All Files' ? FILES :
    active === 'My Uploads' ? FILES.slice(0, 4) :
    FILES.filter(f => f.subject === active)

  const openUpload = () => { setUploadStep(0); setUploadOpen(true); setSuccess(false); setFileName(''); setSubject('') }

  const simulateUpload = () => {
    setUploadStep(2)
    setTimeout(() => { setUploadStep(3); setSuccess(true) }, 1500)
  }

  const handleFileDrop = () => {
    setFileName('Data Structures Notes.pdf')
    setUploadStep(1)
  }

  const removeTag = (t) => setTags(ts => ts.filter(x => x !== t))
  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags(ts => [...ts, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <div className="page-inner">
      <div className="section-header">
        <div>
          <div className="section-title">⭐ Saved Files</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>All your uploaded and saved academic files in one place</div>
        </div>
        <button className="btn btn-danger" onClick={openUpload}>☁️ Upload File</button>
      </div>

      {/* Filter tabs */}
      <div className="files-tabs">
        {FILTERS.map(f => (
          <button key={f} className={`files-tab ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input className="input" style={{ maxWidth: 180 }} placeholder="🔍 Search files..." />
        </div>
      </div>

      {/* Files grid */}
      <div className="files-grid">
        {filtered.map((f, i) => (
          <div key={i} className="file-card card">
            <div className="file-card-icon" style={{ background: f.color }}>
              <span>{TYPE_ICONS[f.type] || TYPE_ICONS.default}</span>
              <span className="file-card-type">{f.type.toUpperCase()}</span>
            </div>
            <div className="file-card-body">
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 2 }}>
                <span className="badge badge-blue">{f.subject}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>
                {f.size} · {f.date}
              </div>
              <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center' }}>View File</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between" style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Showing 1–{filtered.length} of {FILES.length} files</div>
        <div className="flex gap-1">
          {[1,2,3].map(n => (
            <button key={n} className={`btn btn-sm ${n === 1 ? 'btn-primary' : 'btn-ghost'}`}>{n}</button>
          ))}
          <span style={{ padding: '5px 8px', fontSize: 13 }}>...</span>
          <button className="btn btn-ghost btn-sm">Next →</button>
        </div>
        <select className="input" style={{ maxWidth: 120, fontSize: 12 }}>
          <option>Sort by: Recent</option><option>Sort by: Name</option><option>Sort by: Size</option>
        </select>
      </div>

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setUploadOpen(false) }}>
          <div className="modal">
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--green)', marginBottom: 8 }}>File Uploaded!</div>
                <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
                  Data Structures Notes.pdf has been saved to Computer Science
                </div>
                <button className="btn btn-primary" onClick={() => setUploadOpen(false)}>Done</button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <div className="modal-title">☁️ Upload File</div>
                  <button className="btn btn-ghost btn-sm" onClick={() => setUploadOpen(false)}>✕</button>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>Add a file to your saved collection</div>

                {uploadStep === 0 ? (
                  <div className={`upload-drop-zone ${dragOver ? 'drag' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); handleFileDrop() }}
                    onClick={handleFileDrop}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>☁️</div>
                    <div style={{ fontWeight: 700 }}>Drag & drop your file here</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', margin: '8px 0 12px' }}>or</div>
                    <button className="btn btn-danger">Browse Files</button>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>
                      Supports PDF, DOCX, JPG, PNG, PY, TXT · Max 25MB
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="upload-file-chip">
                      <span>📄</span>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>Data Structures Notes.pdf</span>
                      <span style={{ fontSize: 12, color: 'var(--text-3)' }}>2.4MB</span>
                      {uploadStep === 2 ? (
                        <span className="badge badge-blue">Uploading...</span>
                      ) : (
                        <button className="btn btn-ghost btn-sm" onClick={() => setUploadStep(0)}>✕</button>
                      )}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <label className="label">File Name</label>
                      <input className="input" value="Data Structures Notes.pdf" onChange={() => {}} />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label className="label">Subject</label>
                      <div className="files-subject-options">
                        {SUBJECTS.map(s => (
                          <label key={s} className="files-radio-item">
                            <input type="radio" name="subject" checked={subject === s}
                              onChange={() => setSubject(s)} style={{ accentColor: 'var(--green)' }} />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label className="label">Link to Study Room <span style={{ color: 'var(--text-3)' }}>(Optional)</span></label>
                      <input className="input" placeholder="Going Try Study" />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label className="label">Description <span style={{ color: 'var(--text-3)' }}>(Optional)</span></label>
                      <textarea className="input" rows={2} placeholder="Apply a short note about this file..." />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label className="label">Tags</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                        {tags.map(t => (
                          <span key={t} className="tag">
                            {t} <span className="close" onClick={() => removeTag(t)}>✕</span>
                          </span>
                        ))}
                      </div>
                      <input className="input" placeholder="Press enter to add tag..." value={tagInput}
                        onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label className="label">File Visibility</label>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {['Private', 'Room Members'].map(v => (
                          <label key={v} className="flex items-center gap-2" style={{ cursor: 'pointer', fontSize: 13 }}>
                            <input type="radio" name="vis" checked={visibility === v}
                              onChange={() => setVisibility(v)} style={{ accentColor: 'var(--green)' }} />
                            {v}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}
                        onClick={() => setUploadOpen(false)}>Cancel</button>
                      <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }}
                        onClick={simulateUpload}>
                        {uploadStep === 2 ? '⏳ Uploading...' : '☁️ Upload File'}
                      </button>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>
                      🔒 Your file is encrypted and stored securely
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
