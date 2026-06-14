import { useNavigate } from 'react-router-dom'
import './Landing.css'

const features = [
  { icon: '🤖', title: 'AI Study Assistance', desc: 'Summarize notes, generate quizzes, and get instant help with your studies' },
  { icon: '👥', title: 'Live Collaboration', desc: 'Work together in real-time with text, audio, and video chat' },
  { icon: '📁', title: 'File Sharing', desc: 'Upload and organize study materials with your group instantly' },
  { icon: '🔍', title: 'Smart Detection', desc: 'AI-powered similarity check to avoid duplicate work across your team' },
]

const team = [
  { name: 'Aima Ajmal', color: '#f9c5c5', emoji: '👩‍💻' },
  { name: 'Abdullah Malik', color: '#c5d9f9', emoji: '👨‍💻' },
  { name: 'Malik M. Farhan', color: '#c5f9d9', emoji: '👨‍🎓' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <span>🏠</span>
          <span>Virtual Study Space</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>Log In</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1 className="landing-headline">
            Study<br />
            <span className="text-red">Together</span><br />
            Smarter
          </h1>
          <p className="landing-sub">
            One unified platform for everything — AI study tools, real-time video collaboration, smart file sharing, and virtual study rooms.
          </p>
          <div className="landing-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/signup')}>
              Get Started Free
            </button>
            <div className="landing-social-proof">
              <div className="landing-avatars">
                {['🧑','👩','👨','🧕'].map((e,i) => (
                  <div key={i} className="landing-avatar-chip">{e}</div>
                ))}
              </div>
              <span>10k+ Students</span>
            </div>
          </div>
        </div>
        <div className="landing-hero-img">
          <div className="landing-hero-illustration">
            <div className="hero-blob hero-blob-1">📚</div>
            <div className="hero-blob hero-blob-2">💻</div>
            <div className="hero-blob hero-blob-3">🎯</div>
            <div className="hero-center-card">
              <div style={{ fontSize: 48, textAlign: 'center' }}>🎓</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>Study Together</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12 }}>4 students online now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="landing-marquee">
        {[...Array(6)].map((_,i) => (
          <span key={i}>Virtual Study Space</span>
        ))}
      </div>

      {/* Features */}
      <section className="landing-features" id="features">
        <h2>Everything You Need in One Place</h2>
        <p>Stop switching between apps. Get AI tools, collaboration, and file management all together.</p>
        <div className="landing-features-grid">
          {features.map(f => (
            <div key={f.title} className="landing-feature-card">
              <div className="landing-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="landing-banner">
        <p className="landing-banner-eyebrow">Ready to Start?</p>
        <h2>Join Now</h2>
        <button className="btn btn-outline btn-lg" onClick={() => navigate('/signup')}>
          Create Your First Room
        </button>
        <p style={{ marginTop: 16, opacity: 0.7 }}>10,000+ students already learning together</p>
      </section>

      {/* Team */}
      <section className="landing-team" id="about">
        <h2>Meet the Team</h2>
        <div className="landing-team-grid">
          {team.map(m => (
            <div key={m.name} className="landing-team-card" style={{ borderTop: `4px solid ${m.color}` }}>
              <div className="landing-team-avatar" style={{ background: m.color }}>
                {m.emoji}
              </div>
              <div className="landing-team-name">{m.name}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Virtual Study Space</div>
          <div style={{ color: 'var(--text-3)', fontSize: 13 }}>University of Central Punjab</div>
          <div style={{ color: 'var(--text-3)', fontSize: 13 }}>BSCS Final Year Project | Spring 2026</div>
        </div>
      </section>

      <footer className="landing-footer">
        © 2026 Virtual Study Space. All rights reserved.
      </footer>
    </div>
  )
}
