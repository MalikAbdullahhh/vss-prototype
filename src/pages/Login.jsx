import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../App'
import './Auth.css'

const DOODLES = ['👨‍💻','👩‍🎓','🧑‍🏫','👩‍💻']

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = (e) => { e.preventDefault(); login(); navigate('/app') }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← Back to Home</Link>

      <div className="auth-doodles">
        {DOODLES.map((d, i) => (
          <div key={i} className={`auth-doodle auth-doodle-${i + 1}`}>{d}</div>
        ))}
        <div className="auth-star auth-star-1">⭐</div>
        <div className="auth-star auth-star-2">✨</div>
        <div className="auth-bubble auth-bubble-1" />
        <div className="auth-bubble auth-bubble-2" />
        <div className="auth-bubble auth-bubble-3" />
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Log In</h2>
        <form onSubmit={handle}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Username</label>
            <input className="input" placeholder="Enter Username" value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Enter Password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Log In</button>
          <div className="auth-divider"><span>or</span></div>
          <button type="button" className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>
            🌐 Log In with Google
          </button>
          <p className="auth-switch">
            Don't have an Account? <Link to="/signup">Create an Account</Link>
          </p>
        </form>
      </div>

      <div className="auth-footer">© 2026 Virtual Study Space. All rights reserved.</div>
    </div>
  )
}
