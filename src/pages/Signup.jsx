import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const navigate = useNavigate()

  const handle = (e) => { e.preventDefault(); navigate('/signup/step2') }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← Back to Home</Link>
      <div className="auth-doodles">
        <div className="auth-doodle auth-doodle-1">👩‍🎓</div>
        <div className="auth-doodle auth-doodle-2">🧑‍💻</div>
        <div className="auth-doodle auth-doodle-3">👨‍🏫</div>
        <div className="auth-doodle auth-doodle-4">👩‍💻</div>
        <div className="auth-star auth-star-1">⭐</div>
        <div className="auth-star auth-star-2">✨</div>
        <div className="auth-bubble auth-bubble-1" />
        <div className="auth-bubble auth-bubble-2" />
        <div className="auth-bubble auth-bubble-3" />
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handle}>
          <div style={{ marginBottom: 12 }}>
            <label className="label">Username <span style={{ color: 'red' }}>*</span></label>
            <input className="input" placeholder="Enter Username" required
              value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="label">Email <span style={{ color: 'red' }}>*</span></label>
            <input className="input" type="email" placeholder="Enter Email Address" required
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="label">Password <span style={{ color: 'red' }}>*</span></label>
            <input className="input" type="password" placeholder="Enter Password" required
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label">Confirm Password <span style={{ color: 'red' }}>*</span></label>
            <input className="input" type="password" placeholder="Re-enter Password" required
              value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Next</button>
          <p className="auth-switch">Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
      <div className="auth-footer">© 2026 Virtual Study Space. All rights reserved.</div>
    </div>
  )
}
