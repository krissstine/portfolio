/* ╔══════════════════════════════════════════════════════════════════╗
   ║  HOW THIS FILE IS ORGANIZED                                      ║
   ║                                                                  ║
   ║  LAYER 1 → JAVASCRIPT  (top)    imports, DATA, NAV, logic        ║
   ║  LAYER 2 → HTML / JSX  (bottom) everything inside return ( )     ║
   ║  LAYER 3 → CSS         → moved to App.css (imported above)       ║
   ╚══════════════════════════════════════════════════════════════════╝ */


/* ████████████████████████████████████████████████████████████████████
   ██  LAYER 1 — JAVASCRIPT  (START)                                 ██
   ████████████████████████████████████████████████████████████████████ */

/* ---- JS: imports ---- */
import { useState, useEffect } from 'react'
import './App.css'
import { playIntro, revealOnScroll } from './animations'


/* ---- JS: DATA object (all your content lives here) ---- */
/* ------------------------------------------------------------------
   EDIT YOUR CONTENT HERE — everything below feeds the page.
   ------------------------------------------------------------------ */
const DATA = {
  name: 'Kristine',
  role: 'Full - Stack Web Developer',
  tagline: 'Organized, reliable, and detail-driven support for busy teams and founders.',
  bio: [
    "I'm a 3rd-year BS Information Systems student at Zamboanga Peninsula Polytechnic State University, building a career as an Executive Assistant and Virtual Assistant.",
    'I turn messy inboxes, calendars, and processes into calm, well-run systems — so the people I support can focus on the work that matters most.',
  ],
  stats: [
    { value: '10+', label: 'Job simulations completed' },
    { value: '2027', label: 'Graduating' },
    { value: '24/7', label: 'Async-ready mindset' },
  ],

  projects: [
    {
      title: 'Executive Inbox & Calendar Management',
      desc: 'A sample workflow for triaging email, scheduling meetings across time zones, and preparing daily briefs.',
      tags: ['Google Workspace', 'Calendly', 'Notion'],
      image: "https://media.cntraveler.com/photos/68ff82e7977accaf27ac5b35/16:9/w_2560%2Cc_limit/GettyImages-2078516558.jpg",
      link: 'https://self-attendace-system.onrender.com/',
    },
    {
      title: 'Client Onboarding System',
      desc: 'A reusable onboarding kit: intake form, welcome checklist, SOP library, and task tracker.',
      tags: ['Notion', 'Trello', 'Canva'],
    },
    {
      title: 'Travel & Event Coordination Plan',
      desc: 'End-to-end itinerary, budget sheet, and vendor tracker for a multi-day corporate event.',
      tags: ['Excel', 'Google Sheets', 'Slack'],
    },
  ],

  stack: [
    { group: 'Productivity', items: ['Notion', 'Google Workspace', 'Microsoft 365', 'Trello', 'Asana'] },
    { group: 'Communication', items: ['Slack', 'Zoom', 'Gmail', 'Microsoft Teams', 'Calendly'] },
    { group: 'Design & Docs', items: ['Canva', 'Google Docs', 'Word', 'PowerPoint', 'Google Slides'] },
    { group: 'Data & Admin', items: ['Excel', 'Google Sheets', 'Forms & Surveys', 'Expense Tracking', 'Data Entry'] },
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

  testimonials: [
    {
      quote: 'Replace this with a real testimonial from a professor, supervisor, or client.',
      who: 'Name, Title',
    },
    {
      quote: 'Reliable, proactive, and always ahead of the deadline.',
      who: 'Add a real reference here',
    },
  ],
  badges: ['Bloomberg Simulation', 'Datacom Simulation', 'PwC Simulation', 'Third Bridge Simulation', 'Customer Service Simulation'],

  caseStudies: [
    {
      title: 'Cutting Scheduling Back-and-Forth by Half',
      problem: 'A busy founder lost hours each week coordinating meetings across time zones.',
      solution: 'Set up a shared booking link, buffer rules, and a weekly agenda template.',
      result: 'Fewer scheduling emails and a calmer, more predictable calendar.',
    },
    {
      title: 'Building a One-Page SOP Library',
      problem: 'Recurring tasks lived in scattered chats and memory.',
      solution: 'Documented each task in a simple Notion SOP database with owners and checklists.',
      result: 'Faster handoffs and consistent quality across the team.',
    },
  ],

  openSource: [
    {
      title: 'Free Notion Templates',
      desc: 'Shareable planners and trackers for students and freelancers.',
      link: '#',
    },
    {
      title: 'Community Volunteer Work',
      desc: 'Project support and coordination through JCI Zamboanga City.',
      link: '#',
    },
    {
      title: 'Shared Study Resources',
      desc: 'Open notes and guides for information systems coursework.',
      link: '#',
    },
  ],

  posts: [
    { title: '5 Habits of a Great Virtual Assistant', date: 'Coming soon', read: '4 min read', link: '#' },
    { title: 'How I Organize an Executive Inbox', date: 'Coming soon', read: '6 min read', link: '#' },
    { title: 'Notion Systems Every EA Should Know', date: 'Coming soon', read: '5 min read', link: '#' },
  ],

  contact: {
    email: 'your.email@example.com',
    location: 'Zamboanga City, Philippines',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Notion Portfolio', href: '#' },
      { label: 'Email', href: 'mailto:your.email@example.com' },
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
  ['cases', 'Case Studies'],
  ['open', 'Open Source'],
  ['blog', 'Blog'],
  ['contact', 'Contact'],
]

/* ---- JS function that returns a small reusable piece of HTML ---- */
function Section({ id, eyebrow, title, children }) {
  return (
    /* HTML (JSX) template used by every section */
    
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
  const [status, setStatus] = useState('idle')  // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' }) // what's typed in the form

  /* ---- JS LOGIC: sets the browser tab title ---- */
  useEffect(() => {
  playIntro()
  const stop = revealOnScroll()
  return stop
}, [])

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

/* ████████████████████████████████████████████████████████████████████
   ██  LAYER 1 — JAVASCRIPT  (END of the logic part)                 ██
   ████████████████████████████████████████████████████████████████████ */


/* ████████████████████████████████████████████████████████████████████
   ██  LAYER 2 — HTML (written as JSX)  (START)                      ██
   ██  Everything inside return ( ... ) is the page structure.       ██
   ████████████████████████████████████████████████████████████████████ */
  return (
    <div className="portfolio">


      {/* HTML: floating blobs behind the glass */}
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      {/* HTML: NAV (top menu bar) */}
      <header className="nav glass">
        <a href="#top" className="brand">{DATA.name}<span>.</span></a>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">☰</button>
        <nav className={menuOpen ? 'links open' : 'links'}>
          {/* JS inside HTML: .map() loops through the NAV list */}
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
            <div className="stats">
              {DATA.stats.map((s) => (
                <div key={s.label} className="stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

    {/* HTML: Full - Stack Web DeveloperPROJECTS */}
<Section id="projects" eyebrow="Selected work" title="Full - Stack Web DeveloperProjects">
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
       <a
  className="btn-view"
  href={p.link || '#'}
  target={p.link ? '_blank' : undefined}
  rel="noopener noreferrer"
>
  View <span className="arrow">→</span>
</a>
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

        {/* HTML: SOCIAL PROOF */}
        <Section id="proof" eyebrow="Kind words & credentials" title="Social Proof">
          <div className="grid two">
            {DATA.testimonials.map((t, i) => (
              <blockquote key={i} className="card glass quote">
                <p>“{t.quote}”</p>
                <footer>— {t.who}</footer>
              </blockquote>
            ))}
          </div>
          <div className="chips badges">
            {DATA.badges.map((b) => <span key={b} className="chip badge">🏅 {b}</span>)}
          </div>
        </Section>

        {/* HTML: CASE STUDIES */}
        <Section id="cases" eyebrow="Problem → Solution → Result" title="Case Studies">
          <div className="grid two">
            {DATA.caseStudies.map((c) => (
              <article key={c.title} className="card glass hover">
                <h3>{c.title}</h3>
                <dl>
                  <dt>Problem</dt><dd>{c.problem}</dd>
                  <dt>Solution</dt><dd>{c.solution}</dd>
                  <dt>Result</dt><dd>{c.result}</dd>
                </dl>
              </article>
            ))}
          </div>
        </Section>

        {/* HTML: OPEN SOURCE CONTRIBUTIONS */}
        <Section id="open" eyebrow="Giving back" title="Open Source Contributions">
          <div className="grid three">
            {DATA.openSource.map((o) => (
              <a key={o.title} href={o.link} className="card glass hover linkcard">
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <span className="more">View →</span>
              </a>
            ))}
          </div>
        </Section>

        {/* HTML: BLOG / ARTICLES */}
        <Section id="blog" eyebrow="Thoughts & guides" title="Blog / Articles">
          <div className="grid three">
            {DATA.posts.map((p) => (
              <a key={p.title} href={p.link} className="card glass hover linkcard">
                <span className="when">{p.date} · {p.read}</span>
                <h3>{p.title}</h3>
                <span className="more">Read article →</span>
              </a>
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
                  <a key={l.label} href={l.href} className="chip link">{l.label}</a>
                ))}
              </div>
            </div>
            {/* HTML form → connected to the JS function handleSubmit (Layer 1) */}
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

      {/* HTML: FOOTER */}
      <footer className="foot">
        © {new Date().getFullYear()} {DATA.name} · Built with React + Vite
      </footer>
    </div>
  )
}
/* ████████████████████████████████████████████████████████████████████
   ██  LAYER 2 — HTML (JSX)  (END)                                   ██
   ████████████████████████████████████████████████████████████████████ */

export default App