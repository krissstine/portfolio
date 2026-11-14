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
import cwm from '../photos/cwm.png'
import moneyplan from '../photos/moneyplan.png'
import cert1 from '../photos/cert1.png'


/* ---- JS: DATA object (all your content lives here) ---- */
/* ------------------------------------------------------------------
   EDIT YOUR CONTENT HERE — everything below feeds the page.
   ------------------------------------------------------------------ */
const DATA = {
  name: 'Kristine',
  role: 'Full-Stack Web Developer',
  tagline: 'I turn ideas into reliable, easy-to-use web apps, from the first sketch to launch.',
  bio: [
    'I build fast, reliable web apps, from React interfaces to REST API back ends and databases, and ship them so real users can actually use them.',
    'I take ideas from plan to launch: feature scoping, UI design, front end, back end, database, authentication, admin dashboards, and deployment.',
  ],
  skills: [
    'Full-Stack Web Development',
    'React & Vite',
    'Responsive UI Design',
    'REST APIs & Databases',
    'Authentication & Admin Dashboards',
    'Git & GitHub',
    'Deployment (Vercel, Render)',
  ],

  /* Each project has: desc (short, shown on the card) and
     long / features / role (shown in the Details popup).
     A project can also have Details: a component that fills the popup
     with its own content.

     The Self-Attendance System keeps ALL of its content in Selfproj.jsx
     (title, card text, tags, image, live link, and the Details popup).
     To change anything about it, edit Selfproj.jsx only. */
  projects: [
    {
      ...SELF_PROJECT,   // title, desc, tags, image, link, and the rest, from Selfproj.jsx
      Details: SelfProj, // the popup content, also from Selfproj.jsx
    },
    {
      title: 'CommunityCleanUp: Waste Management System',
      desc: 'A web platform that helps communities organize waste collection and clean-up activities, with a simple login and an easy-to-use dashboard.',
      long: 'A platform that helps communities organize waste collection schedules and clean-up drives in one place.',
      features: [
        'Simple login system',
        'Dashboard for clean-up activities',
        'Schedule and track waste collection',
        'Responsive layout for phones and desktops',
      ],
      role: 'Full-stack developer (design, build, deploy)',
      tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Vercel'],
      image: cwm,
      link: 'https://community-waste-management-black.vercel.app/',
    },
    {
      title: 'Money Planner',
      desc: 'A personal finance app to track accounts, plan monthly budgets, set savings goals, and view spending on a calendar, all in one place.',
      long: 'A personal finance app that keeps accounts, budgets, savings goals, and spending history together.',
      features: [
        'Track multiple accounts',
        'Monthly budget planning',
        'Savings goals',
        'Calendar view of spending',
      ],
      role: 'Full-stack developer (design, build, deploy)',
      tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Vercel'],
      image: moneyplan,
      link: 'https://money-planner-xi.vercel.app/',
    },
  ],

  stack: [
    { group: 'Frontend (Web)', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS'] },
    { group: 'Backend & Database', items: ['Node.js', 'Express', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'] },
    { group: 'Mobile & Desktop Apps', items: ['React Native', 'Flutter', 'Electron', 'Java', 'C# (.NET)'] },
    { group: 'DevOps & Tools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma', 'VS Code', 'Render', 'Vercel'] },
  ],

  timeline: [
    {
      when: '2026',
      title: 'Virtual Job Simulations (Forage)',
      org: 'Bloomberg · Datacom · PwC · Third Bridge · and more',
      desc: 'Completed multiple professional job simulations covering research, customer service, merchandising, and business operations.',
    },
    {
      when: '2024 – Present',
      title: 'Member / Volunteer',
      org: 'JCI Zamboanga City',
      desc: 'Collaborate on community projects, coordinate schedules, and support event logistics.',
    },
    {
      when: '2023 – 2027',
      title: 'BS Information Systems',
      org: 'Zamboanga Peninsula Polytechnic State University',
      desc: 'Studying information systems, business processes, and organizational tools.',
    },
  ],

  certificates: [
    {
      title: 'Certificate of Participation',
      issuer: 'Western Mindanao State University · College of Computing Studies',
      date: 'March 21, 2026',
      desc: 'Awarded for active involvement in and successful completion of the CS TALK: Hack. Build. Innovate. online seminar, recognizing commitment to professional growth and the advancement of the CS community.',
      image: cert1,
    },
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
  ['experience', 'Timeline'],
  ['proof', 'Proof'],
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
  const [zoom, setZoom] = useState(null)            // certificate being viewed bigger
  const [project, setProject] = useState(null)      // project shown in the Details popup

  /* ---- JS LOGIC: plays the intro animation and reveals sections on scroll ---- */
  useEffect(() => {
    playIntro()
    const stopReveal = revealOnScroll()
    const stopScroll = trackScroll()
    return () => { stopReveal(); stopScroll() }
  }, [])

  /* ---- JS LOGIC: close popups with the Esc key ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setZoom(null); setProject(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ---- JS LOGIC: stop the page from scrolling behind an open popup ---- */
  useEffect(() => {
    document.body.style.overflow = (project || zoom) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project, zoom])

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
              <a href="#contact" className="btn primary">Work with me</a>
              <a href="#projects" className="btn ghost">See my work</a>
            </div>
            <div className="chips" style={{ marginTop: '24px' }}>
              {DATA.skills.map((k) => <span key={k} className="chip">{k}</span>)}
            </div>
          </div>
        </section>

        {/* HTML: PROJECTS */}
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
                <div className="chips">
                  {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>

                {/* Details button opens the popup, View opens the live site */}
                <div className="card-actions">
                  <button type="button" className="btn-view" onClick={() => setProject(p)}>
                    Details
                  </button>
                  <a
                    className="btn-view"
                    href={p.link || '#'}
                    target={p.link ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    View <span className="arrow">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* HTML: TECH STACK */}
        <Section id="stack" eyebrow="Tools I use" title="Tech Stack">
          <div className="grid four">
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

        {/* HTML: WORK HISTORY / TIMELINE */}
        <Section id="experience" eyebrow="My journey" title="Work History & Timeline">
          <div className="timeline">
            {DATA.timeline.map((t) => (
              <div key={t.title} className="t-item">
                <span className="dot" />
                <div className="card glass">
                  <span className="when">{t.when}</span>
                  <h3>{t.title}</h3>
                  <p className="org">{t.org}</p>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* HTML: SOCIAL PROOF (certificates + badges) */}
        <Section id="proof" eyebrow="Certificates & credentials" title="Social Proof">
          <div className="grid two">
            {DATA.certificates.map((c) => (
              <article key={c.title} className="card glass hover">
                <img
                  src={c.image}
                  alt={c.title}
                  title="Click to view bigger"
                  role="button"
                  tabIndex={0}
                  onClick={() => setZoom(c)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setZoom(c) }}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '14px', cursor: 'zoom-in' }}
                />
                <h3>{c.title}</h3>
                <p className="org">{c.issuer}</p>
                <span className="when">{c.date}</span>
                <p>{c.desc}</p>
              </article>
            ))}
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
                {DATA.contact.links.map((l) => (
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

            {/* Projects with their own Details component (Selfproj.jsx) fill the popup themselves */}
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
              <button className="btn ghost" onClick={() => setProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* HTML: BIG PHOTO VIEWER (opens when a certificate is clicked) */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setZoom(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '16px', right: '20px',
              background: 'transparent', border: 'none', color: '#fff',
              fontSize: '2rem', lineHeight: 1, cursor: 'pointer',
            }}
          >✕</button>
          <img
            src={zoom.image}
            alt={zoom.title}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '12px', cursor: 'default' }}
          />
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