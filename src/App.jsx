/* ╔══════════════════════════════════════════════════════════════════╗
   ║  HOW THIS FILE IS ORGANIZED                                      ║
   ║                                                                  ║
   ║  LAYER 1 → JAVASCRIPT  (top)    imports, DATA, NAV, logic        ║
   ║  LAYER 2 → HTML / JSX  (bottom) everything inside return ( )     ║
   ║  LAYER 3 → CSS         → App.css + Details.css (imported above)  ║
   ╚══════════════════════════════════════════════════════════════════╝ */


/* ---- JS: imports ---- */
import { useState, useEffect } from 'react'
import './App.css'
import './Details.css'
import { playIntro, revealOnScroll, trackScroll } from './animations'
import SelfProj, { SELF_PROJECT } from './Selfproj.jsx'
import MoneyPlan, { MONEY_PROJECT } from './Moneyplan.jsx'
import CwmDetails, { CWM_PROJECT } from './Cwm.jsx'


/* ---- JS: DATA object (all your content lives here) ---- */
/* ------------------------------------------------------------------
   EDIT YOUR CONTENT HERE — everything below feeds the page.

   TO DO (fill these in so the page shows evidence, not just claims):
   1. (done) DATA.github is set and shows in the header + contact
   2. In Selfproj.jsx / Cwm.jsx / Moneyplan.jsx, inside each *_PROJECT
      object, add:
         link:      'https://your-live-demo-url'
         repo:      'https://github.com/you/your-repo'
         problem:   'One line: what problem it solves'
         role:      'One line: what YOU built'
         challenge: 'One line: the hardest technical thing and how you solved it'
      The cards below show each of these automatically when present.
   ------------------------------------------------------------------ */
const DATA = {
  name: 'Kristine Mae Regidor',
  role: 'Full-Stack Web Developer',
  tagline: 'I build and ship full-stack web apps: React frontends, REST APIs, databases, auth, and deployment.',
  bio: [
    'I take products from plan to launch: scoping, UI design, front end, back end, admin dashboards, and getting them live for real users.',
  ],
  skills: [
    'Full-Stack Web Development',
    'React & Vite',
    'REST APIs & Databases',
    'Authentication & Admin Dashboards',
    'Git & GitHub',
    'Deployment (Vercel, Render)',
  ],

  github: 'https://github.com/krissstine',
  linkedin: 'https://www.linkedin.com/in/kristine-mae-regidor/',

  /* Each project keeps ALL of its content in its own file:
     Selfproj.jsx (Self-Attendance), Cwm.jsx (CommunityCleanUp),
     Moneyplan.jsx (Money Planner). Lead project goes first. */
  projects: [
    {
      ...SELF_PROJECT,   // title, desc, tags, image, link, repo, problem, role, challenge
      Details: SelfProj, // the popup content
    },
    {
      ...CWM_PROJECT,
      Details: CwmDetails,
    },
    {
      ...MONEY_PROJECT,
      Details: MoneyPlan,
    },
  ],

  /* Only list what you can show work for. Add a "Mobile & Desktop" group
     back once you have a project (e.g. a small Tauri/Electron app) on the page. */
  stack: [
    { group: 'Frontend (Web)', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS'] },
    { group: 'Backend & Database', items: ['Node.js', 'Express', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'] },
    { group: 'DevOps & Tools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma', 'VS Code', 'Render', 'Vercel'] },
  ],

  /* Paid or contract work goes here. Leave [] to hide the section. */
  freelance: [
    // { when: '2026', title: 'Project name', org: 'Client', desc: 'What you delivered.' },
  ],

  education: {
    when: '2024 – 2028',
    title: 'BS Information Systems',
    org: 'Zamboanga Peninsula Polytechnic State University',
    desc: 'Studying information systems, business processes, and organizational tools.',
  },

  /* One small line, not a section of its own. */
  additional: [
    'Virtual job simulations (Forage): Bloomberg, Datacom, PwC, Third Bridge, and more',
    'Member / Volunteer, JCI Zamboanga City',
  ],

  contact: {
    email: 'maekristine56@gmail.com',
    location: 'Zamboanga City, Philippines',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kristine-mae-regidor/' },
      { label: 'Teams', href: 'https://teams.live.com/l/chat/0/0?users=maekristine56@gmail.com' },
    ],
  },
}

/* ---- JS: NAV list (builds the menu links) ---- */
const NAV = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['stack', 'Tech Stack'],
  ['background', 'Background'],
  ['contact', 'Contact'],
]

/* ---- JS function that returns a small reusable piece of HTML ---- */
function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="sec reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="sec-title">{title}</h2>
      {children}
    </section>
  )
}

/* ---- JS: the main App component ---- */
function App() {

  /* ---- JS LOGIC: state (the page's "memory") ---- */
  const [menuOpen, setMenuOpen] = useState(false)   // is the mobile menu open?
  const [status, setStatus] = useState('idle')      // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [project, setProject] = useState(null)      // project shown in the Details popup

  /* ---- JS LOGIC: plays the intro animation and reveals sections on scroll ---- */
  useEffect(() => {
    playIntro()
    const stopReveal = revealOnScroll()
    const stopScroll = trackScroll()
    return () => { stopReveal(); stopScroll() }
  }, [])

  /* ---- JS LOGIC: close the popup with the Esc key ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ---- JS LOGIC: stop the page from scrolling behind an open popup ---- */
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  /* ---- JS LOGIC: runs when the contact form is submitted ---- */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'd17cd560-53d1-43c1-9813-b624290150b7',
          subject: `Portfolio inquiry from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  /* contact chips: GitHub first (if set), then the rest */
  const contactLinks = [
    ...(DATA.github ? [{ label: 'GitHub', href: DATA.github }] : []),
    ...DATA.contact.links,
  ]

  return (
    <div className="portfolio">

      {/* HTML: thin progress bar at the very top (fills as you scroll) */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* HTML: floating blobs behind the glass */}
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      {/* HTML: NAV (top menu bar) */}
      <header className="nav glass">
        <a href="#top" className="brand">{DATA.name}<span>.</span></a>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">☰</button>
        <nav className={menuOpen ? 'links open' : 'links'}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          {DATA.github && (
            <a href={DATA.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          )}
          <a href={DATA.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </nav>
      </header>

      <main id="top">

        {/* HTML: INTRO / BIO */}
        <section id="about" className="hero">
          <div className="hero-text glass">
            <p className="eyebrow">Hello, I'm {DATA.name} 👋</p>
            <h1>{DATA.role}</h1>
            <p className="lead">{DATA.tagline}</p>
            {DATA.bio.map((p, i) => (
              <p key={i} className="body">{p}</p>
            ))}
            <div className="cta">
              <a href="#projects" className="btn primary">See my work</a>
              <a href="#contact" className="btn ghost">Work with me</a>
            </div>
            <div className="chips" style={{ marginTop: '24px' }}>
              {DATA.skills.map((k) => <span key={k} className="chip">{k}</span>)}
            </div>
          </div>
        </section>

        {/* HTML: PROJECTS (the core of the page) */}
        <Section id="projects" eyebrow="Selected work" title="Projects">
          <div className="grid three">
            {DATA.projects.map((p) => (
              <article key={p.title} className="card glass hover">
                {p.image ? (
                  <img className="thumb-img" src={p.image} alt={p.title} />
                ) : (
                  <div className="thumb" />
                )}
                <h3>{p.title}</h3>
                <p>{p.desc}</p>

                {/* Problem / role / challenge show only when you've filled them in */}
                {(p.problem || p.role || p.challenge) && (
                  <dl>
                    {p.problem && (<><dt>Problem</dt><dd>{p.problem}</dd></>)}
                    {p.role && (<><dt>My role</dt><dd>{p.role}</dd></>)}
                    {p.challenge && (<><dt>Challenge</dt><dd>{p.challenge}</dd></>)}
                  </dl>
                )}

                <div className="chips">
                  {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>

                {/* Details opens the popup; Live demo and Code are the proof */}
                <div className="card-actions">
                  <button type="button" className="btn-view" onClick={() => setProject(p)}>
                    Details
                  </button>
                  {p.link && (
                    <a className="btn-view" href={p.link} target="_blank" rel="noopener noreferrer">
                      Live demo <span className="arrow">→</span>
                    </a>
                  )}
                  {p.repo && (
                    <a className="btn-view" href={p.repo} target="_blank" rel="noopener noreferrer">
                      Code <span className="arrow">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* HTML: TECH STACK */}
        <Section id="stack" eyebrow="Tools I use" title="Tech Stack">
          <div className="grid three">
            {DATA.stack.map((g) => (
              <div key={g.group} className="card glass">
                <h3>{g.group}</h3>
                <div className="chips">
                  {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* HTML: BACKGROUND (freelance if any, education, one small "additional" line) */}
        <Section id="background" eyebrow="Where I'm coming from" title="Background">
          <div className="timeline">
            {DATA.freelance.map((f) => (
              <div key={f.title} className="t-item">
                <span className="dot" />
                <div className="card glass">
                  <span className="when">{f.when}</span>
                  <h3>{f.title}</h3>
                  <p className="org">{f.org}</p>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
            <div className="t-item">
              <span className="dot" />
              <div className="card glass">
                <span className="when">{DATA.education.when}</span>
                <h3>{DATA.education.title}</h3>
                <p className="org">{DATA.education.org}</p>
                <p>{DATA.education.desc}</p>
              </div>
            </div>
          </div>
          <div className="chips" style={{ marginTop: '18px' }}>
            {DATA.additional.map((a) => <span key={a} className="chip">{a}</span>)}
          </div>
        </Section>

        {/* HTML: CONTACT */}
        <Section id="contact" eyebrow="Let's talk" title="Contact Information">
          <div className="grid two contact">
            <div className="card glass">
              <h3>Get in touch</h3>
              <p>📧 {DATA.contact.email}</p>
              <p>📍 {DATA.contact.location}</p>
              <div className="chips">
                {contactLinks.map((l) => (
                  <a key={l.label} href={l.href} className="chip link" target="_blank" rel="noopener noreferrer">{l.label}</a>
                ))}
              </div>
            </div>
            <form className="card glass form" onSubmit={handleSubmit}>
              <input
                required placeholder="Your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required type="email" placeholder="Your email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                required rows="4" placeholder="How can I help?" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button className="btn primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'sent' && <p className="form-msg ok">✅ Message sent! I'll get back to you soon.</p>}
              {status === 'error' && <p className="form-msg err">Something went wrong. Please email me directly at {DATA.contact.email}.</p>}
            </form>
          </div>
        </Section>
      </main>

      {/* HTML: PROJECT DETAILS POPUP (opens when "Details" is clicked) */}
      {project && (
        <div className="modal-backdrop" onClick={() => setProject(null)}>
          <div
            className="modal glass"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setProject(null)} aria-label="Close">✕</button>

            {project.image && <img className="modal-img" src={project.image} alt={project.title} />}

            <h3 className="modal-title">{project.title}</h3>

            {/* Projects with their own Details component fill the popup themselves */}
            {project.Details ? (
              <project.Details />
            ) : (
              <>
                <p className="modal-text">{project.long || project.desc}</p>

                {project.features && (
                  <>
                    <h4 className="modal-sub">Key features</h4>
                    <ul className="modal-list">
                      {project.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </>
                )}

                {project.role && (
                  <>
                    <h4 className="modal-sub">My role</h4>
                    <p className="modal-text">{project.role}</p>
                  </>
                )}
              </>
            )}

            <h4 className="modal-sub">Built with</h4>
            <div className="chips">
              {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="modal-actions">
              {project.link && (
                <a className="btn primary" href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit live site →
                </a>
              )}
              {project.repo && (
                <a className="btn ghost" href={project.repo} target="_blank" rel="noopener noreferrer">
                  View code ↗
                </a>
              )}
              <button className="btn ghost" onClick={() => setProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* HTML: BACK-TO-TOP BUTTON (hidden until you scroll down) */}
      <button
        type="button"
        className="to-top"
        aria-label="Scroll back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>

      {/* HTML: FOOTER */}
      <footer className="foot">
        © {new Date().getFullYear()} {DATA.name} · Built with React + Vite
      </footer>
    </div>
  )
}

export default App