import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Award, BookOpenCheck, Brain, FileStack, GraduationCap, Menu, MessageSquare,
  ScanSearch, Sparkles, Timer, Trophy, Users, Video, X,
} from 'lucide-react'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/dm-sans'
import './Landing.css'

/** Adds .is-in to elements with [data-reveal] when they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.vss [data-reveal]')
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const people = [
  { n: 'Aima', c: '#f4b6a8' },
  { n: 'Abdullah', c: '#b9d3f0' },
  { n: 'Farhan', c: '#bfe3c9' },
  { n: 'Sana', c: '#f1d9a6' },
]

const chat = [
  { who: 'Aima', text: 'Starting chapter 4 — DB normalisation 📚' },
  { who: 'Abdullah', text: 'Uploaded my 3NF notes to the room files' },
  { who: 'AI', text: 'Made a 5-question quiz from those notes. Ready when you are.' },
]

/** Live study-room mock: pomodoro ring, presence and a chat that fills in. */
function RoomPreview() {
  const [secs, setSecs] = useState(25 * 60 - 7)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setShown(chat.length); return undefined }
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 25 * 60)), 1000)
    const c = setInterval(() => setShown((n) => (n >= chat.length + 2 ? 1 : n + 1)), 1800)
    return () => { clearInterval(t); clearInterval(c) }
  }, [])
  const progress = 1 - secs / (25 * 60)
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <div className="vss-room" aria-label="Study room preview">
      <div className="vss-room__top">
        <div>
          <span className="vss-kicker">Room · Databases</span>
          <strong>Finals prep — Chapter 4</strong>
        </div>
        <span className="vss-live"><i /> 4 studying</span>
      </div>
      <div className="vss-room__body">
        <div className="vss-timer">
          <svg viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r="52" className="vss-timer__bg" />
            <circle cx="60" cy="60" r="52" className="vss-timer__fg" style={{ strokeDashoffset: 327 * (1 - progress) }} />
          </svg>
          <div className="vss-timer__label">
            <b>{mm}:{ss}</b>
            <span>Focus</span>
          </div>
        </div>
        <div className="vss-people">
          {people.map((p, i) => (
            <div key={p.n} className="vss-person" style={{ '--d': `${i * 0.15}s` }}>
              <span className="vss-avatar" style={{ background: p.c }}>{p.n[0]}</span>
              <span>{p.n}</span>
              {i < 2 && <Video size={13} />}
            </div>
          ))}
        </div>
      </div>
      <div className="vss-chat">
        {chat.slice(0, Math.min(shown, chat.length)).map((m) => (
          <div key={m.text} className={`vss-msg ${m.who === 'AI' ? 'is-ai' : ''}`}>
            {m.who === 'AI' ? <Sparkles size={14} /> : <span className="vss-avatar sm" style={{ background: people.find((p) => p.n === m.who)?.c }}>{m.who[0]}</span>}
            <p><b>{m.who === 'AI' ? 'Study assistant' : m.who}</b> {m.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const features = [
  { icon: Brain, t: 'AI study assistant', d: 'Summarise notes, generate quizzes and get explanations at your level.', wide: true },
  { icon: Video, t: 'Live study rooms', d: 'Text, audio and video in one room — with a shared focus timer.' },
  { icon: FileStack, t: 'Shared files', d: 'Upload slides and notes once; the whole group has them.' },
  { icon: ScanSearch, t: 'Similarity check', d: 'Spot overlapping work across the team before you submit.' },
  { icon: BookOpenCheck, t: 'Notes & study tools', d: 'Structured notes, flashcards and a Pomodoro timer built in.' },
  { icon: Trophy, t: 'Leaderboard & badges', d: 'Streaks and achievements that reward showing up — so consistency, not cramming, gets noticed.', full: true },
]

const steps = [
  { icon: Users, t: 'Open a room', d: 'Invite classmates or join a public room for your course.' },
  { icon: Timer, t: 'Focus together', d: 'Run shared Pomodoro sessions with your camera on or off.' },
  { icon: MessageSquare, t: 'Ask, quiz, share', d: 'Use the AI assistant and shared files without leaving the room.' },
  { icon: Award, t: 'Track progress', d: 'Earn streaks and badges, and see your study time add up.' },
]

const team = [
  { name: 'Aima Ajmal', c: '#f4b6a8' },
  { name: 'Abdullah Malik', c: '#b9d3f0' },
  { name: 'Malik M. Farhan', c: '#bfe3c9' },
]

export default function Landing() {
  useReveal()
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle('is-scrolled', window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="vss">
      <header ref={navRef} className="vss-nav">
        <div className="vss-wrap vss-nav__in">
          <Link to="/" className="vss-logo"><span><GraduationCap size={18} /></span>Virtual Study Space</Link>
          <nav className={`vss-links ${open ? 'is-open' : ''}`}>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#how" onClick={() => setOpen(false)}>How it works</a>
            <a href="#team" onClick={() => setOpen(false)}>Team</a>
            <Link to="/login" className="vss-links__login">Log in</Link>
            <Link to="/signup" className="vss-btn vss-btn--ink">Get started</Link>
          </nav>
          <button type="button" className="vss-burger" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section className="vss-hero">
        <div className="vss-wrap vss-hero__in">
          <div>
            <span className="vss-pill" data-reveal><GraduationCap size={14} /> Final-year project · UCP</span>
            <h1 data-reveal>Study together.<br /><em>Focus</em> better.</h1>
            <p className="vss-lead" data-reveal>
              One calm space for group study — live rooms with a shared focus timer, an AI assistant that turns your notes into quizzes, and all your files in one place.
            </p>
            <div className="vss-ctas" data-reveal>
              <Link to="/signup" className="vss-btn vss-btn--ink">Create your first room <ArrowUpRight size={16} /></Link>
              <Link to="/login" className="vss-btn vss-btn--line">Log in</Link>
            </div>
          </div>
          <div data-reveal className="vss-hero__demo"><RoomPreview /></div>
        </div>
      </section>

      <section id="features" className="vss-section">
        <div className="vss-wrap">
          <span className="vss-kicker" data-reveal>Everything in one place</span>
          <h2 data-reveal>Stop switching apps <em>mid-study.</em></h2>
          <div className="vss-bento">
            {features.map((f, i) => (
              <article key={f.t} className={`vss-card ${f.wide ? 'is-wide' : ''} ${f.full ? 'is-full' : ''}`} data-reveal style={{ '--d': `${(i % 3) * 0.08}s` }}>
                <span className="vss-icon"><f.icon size={20} /></span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="vss-section vss-section--tint">
        <div className="vss-wrap">
          <span className="vss-kicker" data-reveal>How a session works</span>
          <h2 data-reveal>From <em>open room</em> to finished chapter.</h2>
          <ol className="vss-steps">
            {steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ '--d': `${i * 0.08}s` }}>
                <span className="vss-step__n">0{i + 1}</span>
                <s.icon size={22} />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="vss-section">
        <div className="vss-wrap vss-team">
          <div data-reveal>
            <span className="vss-kicker">Built by students, for students</span>
            <h2>Made at the <em>University of Central Punjab.</em></h2>
            <p className="vss-lead">Virtual Study Space is our BSCS final-year project (Spring 2026) — designed around how we actually study for exams together.</p>
          </div>
          <div className="vss-team__list">
            {team.map((m, i) => (
              <div key={m.name} className="vss-member" data-reveal style={{ '--d': `${i * 0.08}s` }}>
                <span className="vss-avatar lg" style={{ background: m.c }}>{m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
                <div>
                  <strong>{m.name}</strong>
                  <span>BSCS · UCP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vss-cta">
        <div className="vss-wrap" data-reveal>
          <h2>Your next study session <em>starts here.</em></h2>
          <p className="vss-lead">Free to use. Create a room in under a minute and send the link to your group.</p>
          <div className="vss-ctas">
            <Link to="/signup" className="vss-btn vss-btn--coral">Get started free <ArrowUpRight size={16} /></Link>
            <Link to="/login" className="vss-btn vss-btn--line-light">Log in</Link>
          </div>
        </div>
      </section>

      <footer className="vss-foot">
        <div className="vss-wrap vss-foot__in">
          <span className="vss-logo"><span><GraduationCap size={16} /></span>Virtual Study Space</span>
          <span>BSCS Final Year Project · University of Central Punjab · 2026</span>
        </div>
      </footer>
    </div>
  )
}
