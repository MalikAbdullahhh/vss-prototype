import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../App'
import './Auth.css'

const INTERESTS_LIST = ['Note Sharing', 'Online Studying', 'AI Help', 'Online Help', 'Others']

export default function SignupStep2() {
  const [interests, setInterests] = useState([])
  const [affiliation, setAffiliation] = useState('')
  const [interestText, setInterestText] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const toggleInterest = (i) => setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  const handle = (e) => { e.preventDefault(); login(); navigate('/app') }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← Back to Home</Link>
      <div className="auth-doodles">
        <div className="auth-doodle auth-doodle-1">👩‍🎓</div>
        <div className="auth-doodle auth-doodle-2">🧑‍💻</div>
        <div className="auth-doodle auth-doodle-3">👨‍🏫</div>
        <div className="auth-doodle auth-doodle-4">👩‍💻</div>
        <div className="auth-star auth-star-1">⭐</div>
        <div className="auth-bubble auth-bubble-1" />
        <div className="auth-bubble auth-bubble-2" />
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handle}>
          <div style={{ marginBottom: 12 }}>
            <label className="label">Check Interests</label>
            <div className="auth-checkbox-group">
              {INTERESTS_LIST.map(i => (
                <label key={i} className="auth-checkbox-item">
                  <input type="checkbox" checked={interests.includes(i)}
                    onChange={() => toggleInterest(i)} />
                  {i}
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="label">Affiliation</label>
            <select className="input" value={affiliation} onChange={e => setAffiliation(e.target.value)}>
              <option value="">Select from Dropdown</option>
              <option>University of Central Punjab</option>
              <option>FAST NUCES</option>
              <option>COMSATS University</option>
              <option>LUMS</option>
              <option>NUST</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label">Interests</label>
            <input className="input" placeholder="e.g. coding, physics, AI coding..."
              value={interestText} onChange={e => setInterestText(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
            Create Account
          </button>
        </form>
      </div>
      <div className="auth-footer">© 2026 Virtual Study Space. All rights reserved.</div>
    </div>
  )
}
