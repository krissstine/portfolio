/* ╔══════════════════════════════════════════════════════════════════╗
   ║  Cwm.jsx — CommunityCleanUp                                      ║
   ║                                                                  ║
   ║  1) CWM_PROJECT → the project data (edit text here)             ║
   ║  2) CwmDetails() → the "Details" content shown in the popup      ║
   ╚══════════════════════════════════════════════════════════════════╝ */

import cwm from '../photos/cwm.png'

/* ---- SWIMLANE DIAGRAM ----
   Link: the draw.io file on Google Drive (set sharing to "Anyone with the link").
   Picture (optional): export the diagram as PNG and save it as
   photos/cwmswimlane.png. It shows up automatically. */
const CWM_SWIMLANE_LINK = ''

const cwmSwimlaneFiles = import.meta.glob('../photos/cwmswimlane*.png', { eager: true })
const CWM_SWIMLANE_IMG = Object.values(cwmSwimlaneFiles)[0]?.default || null

/* ---- SYSTEM DOCUMENTATION ----
   Link: the process narrative on Google Drive (set sharing to "Anyone with the link"). */
const CWM_DOCS_LINK = ''

/* ---- DATA: everything about CommunityCleanUp ---- */
export const CWM_PROJECT = {
  title: 'CommunityCleanUp: Waste Management System',
  desc: 'A community platform where residents report waste problems with photos, and staff track each report from pending to resolved.',
  long: 'CommunityCleanUp lets residents report waste problems and lets staff fix them, all in one place. Residents submit a report with its type, location, priority, and an optional photo. Staff move each report through pending, in progress, and resolved, and everyone can follow along with upvotes and comments. Admins manage reports and user accounts. The app runs in the browser and saves data to local storage.',
  image: cwm,
  link: 'https://community-waste-management-black.vercel.app/',
  role: 'Full-stack developer (design, build, deploy)',
  tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Vercel'],

  /* Demo accounts, shown so visitors can try each role */
  demoAccounts: [
    { role: 'Admin', email: 'admin@cwm.com', password: '123456' },
    { role: 'Resident', email: 'john@example.com', password: '123456' },
    { role: 'Staff', email: 'sarah@example.com', password: '123456' },
  ],

  /* ---- FLOWCHART: how the app works, step by step ---- */
  flowchart: [
    { type: 'start', text: 'Open CommunityCleanUp' },
    { type: 'data', text: 'Sign in or register, then load users, reports and comments from local storage' },
    {
      type: 'decision',
      text: 'What role is the signed-in user?',
      branches: [
        { label: 'Resident', text: 'Submit a report, upvote, comment, or delete own comments' },
        { label: 'Staff', text: 'Search and filter reports, start work, or mark resolved' },
        { label: 'Admin', text: 'All staff actions, plus delete reports, comments, and users' },
      ],
    },
    { type: 'data', text: 'Save changes to local storage and refresh the view' },
    { type: 'end', text: 'Log out' },
  ],

  /* ---- FEATURES, grouped by who uses them ---- */
  accessFeatures: [
    'Sign in with email and password. The session stays active after a refresh until you log out',
    'Register as a Resident or a Staff Member. Admin accounts cannot be created from the form',
    'Passwords must be at least 6 characters, and each email can be registered only once',
  ],

  residentFeatures: [
    'Report form with a title, waste type, location, description, and priority',
    'Optional photo, resized and compressed before it is saved to keep storage small',
    'Drafts save as you type, so an unfinished report is kept if you leave the page',
    'Upvote and comment on any report, like comments, and delete your own comments',
  ],

  staffFeatures: [
    'All Reports page with search and filters for waste type and status',
    'Start work on a pending report, then mark it resolved',
  ],

  adminFeatures: [
    'Dashboard statistics: total users, issues resolved, and active issues',
    'Delete any report or comment, and manage users from one table',
    'Deleting a user also removes their reports and comments',
  ],

  /* ---- HOW A REPORT MOVES THROUGH THE SYSTEM ---- */
  workflow: [
    'A resident submits a report. It starts as pending, with the date and the reporter\'s name recorded',
    'Staff start work on it, and it moves to in progress',
    'Staff mark it resolved. Everyone can then see the final status on the report card',
  ],

  /* ---- PROBLEMS I SOLVED ---- */
  challenges: [
    'Photo storage: each photo is resized and compressed before it is saved, and a clear message appears if storage is full',
    'Cascading deletes: removing a report or user also removes its comments, so no orphaned data is left behind',
    'Role-based screens: each role sees only the pages and buttons it needs',
    'Lost work: drafts are saved while typing, so refreshing the page does not erase them',
  ],

  /* ---- FRONT END ---- */
  frontend: {
    languages: ['JavaScript (ES6+)', 'JSX', 'HTML5', 'CSS3'],
    tools: ['React (hooks)', 'Vite', 'Font Awesome icons', 'npm'],
    techniques: [
      'Component state with useState and useEffect, re-rendering after each data change',
      'Page switching by state, and login or register by URL hash',
      'Canvas-based image resizing and JPEG compression',
      'Role-based screens and buttons for residents, staff, and admins',
      'Live search and filters on the reports list',
    ],
    storage: 'Browser local storage (users, reports, comments, and session)',
    hosting: 'Vercel',
  },

  workflowTools: ['Git', 'GitHub', 'VS Code'],

  concepts: [
    'Role-based access control in the interface',
    'Multi-step status workflow for reports',
    'Client-side authentication with the session kept in local storage',
    'Image upload, resizing, and compression with canvas',
    'Cascading deletes and comment counts kept in step',
    'Cloud deployment (Vercel) and version control (Git)',
  ],

  /* ---- DESIGN DECISIONS AND LIMITS ---- */
  decisions: [
    'Data is stored in the browser, so reports and users live on one device. A back end with a real database is the next step.',
    'Passwords are stored as plain text in local storage. This is fine for a demo, but a real system needs hashed passwords on a server.',
    'The demo accounts use a default password and should be changed before real use.',
    'The location is free text, not a map pin, so the same place can be written in different ways.',
  ],
}

/* ---- styles for the flowchart (inline, same as Money Planner) ---- */
const FLOW = {
  box: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.05)',
    fontSize: '0.92rem',
    lineHeight: 1.45,
    textAlign: 'center',
  },
  start: { background: '#000', color: '#fff', borderRadius: '999px' },
  end: { background: '#fff', color: '#000', borderRadius: '999px' },
  data: { background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.5)' },
  decision: { background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.5)' },
  arrow: { textAlign: 'center', color: '#9a9aa8', fontSize: '1rem', lineHeight: 1, margin: '4px 0' },
}

/* ---- small helpers ---- */
function ChipGroup({ title, items }) {
  return (
    <>
      <h4 className="modal-sub">{title}</h4>
      <div className="chips">
        {items.map((i) => <span key={i} className="chip">{i}</span>)}
      </div>
    </>
  )
}

function BulletGroup({ title, items }) {
  return (
    <>
      <h4 className="modal-sub">{title}</h4>
      <ul className="modal-list">
        {items.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </>
  )
}

/* ---- COMPONENT: the flowchart, drawn with styled boxes and arrows ---- */
function FlowChart({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', margin: '12px 0 8px' }}>
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1
        const style = { ...FLOW.box, ...(FLOW[s.type] || {}) }

        return (
          <div key={i}>
            {s.type === 'decision' ? (
              <>
                <div style={style}><strong>{s.text}</strong></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', marginTop: '8px' }}>
                  {s.branches.map((b) => (
                    <div key={b.label} style={{ ...FLOW.box, textAlign: 'left', fontSize: '0.85rem' }}>
                      <strong>{b.label}:</strong> {b.text}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={style}>{s.text}</div>
            )}
            {!isLast && <div style={FLOW.arrow}>↓</div>}
          </div>
        )
      })}
    </div>
  )
}

/* ---- COMPONENT: the Details content for the popup ---- */
export default function CwmDetails() {
  const p = CWM_PROJECT

  return (
    <>
      <h4 className="modal-sub">About this project</h4>
      <p className="modal-text">{p.long}</p>

      <h4 className="modal-sub">How the app works</h4>
      <FlowChart steps={p.flowchart} />

      <h4 className="modal-sub">How a report moves through the system</h4>
      <ol className="modal-list">
        {p.workflow.map((s) => <li key={s}>{s}</li>)}
      </ol>

      {/* SYSTEM FLOW (swimlane), shown only when a link or picture is set */}
      {(CWM_SWIMLANE_LINK || CWM_SWIMLANE_IMG) && (
        <>
          <h4 className="modal-sub">System flow (swimlane diagram)</h4>
          {CWM_SWIMLANE_IMG && (
            <a href={CWM_SWIMLANE_LINK || undefined} target="_blank" rel="noopener noreferrer">
              <img
                src={CWM_SWIMLANE_IMG}
                alt="Swimlane diagram of CommunityCleanUp showing the resident, staff, admin, React app, and browser local storage"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }}
              />
            </a>
          )}
          {CWM_SWIMLANE_LINK && (
            <p>
              <a className="btn ghost" href={CWM_SWIMLANE_LINK} target="_blank" rel="noopener noreferrer">
                Open the swimlane file →
              </a>
            </p>
          )}
        </>
      )}

      {/* SYSTEM DOCUMENTATION, shown only when a link is set */}
      {CWM_DOCS_LINK && (
        <>
          <h4 className="modal-sub">System documentation</h4>
          <p className="modal-text">
            The process narrative for the system: its purpose, participants, inputs, step-by-step flow for each role, decision points, exceptions, outputs, and known limitations.
          </p>
          <p>
            <a className="btn ghost" href={CWM_DOCS_LINK} target="_blank" rel="noopener noreferrer">
              Open the documentation →
            </a>
          </p>
        </>
      )}

      <BulletGroup title="Accounts and access" items={p.accessFeatures} />

      <h4 className="modal-sub">Try it with a demo account</h4>
      <ul className="modal-list">
        {p.demoAccounts.map((d) => (
          <li key={d.email}><strong>{d.role}:</strong> {d.email} (password: {d.password})</li>
        ))}
      </ul>

      <BulletGroup title="Resident features" items={p.residentFeatures} />
      <BulletGroup title="Staff features" items={p.staffFeatures} />
      <BulletGroup title="Admin features" items={p.adminFeatures} />
      <BulletGroup title="Challenges I solved" items={p.challenges} />

      <h4 className="modal-sub">My role</h4>
      <p className="modal-text">{p.role}</p>

      <ChipGroup title="Front end: languages" items={p.frontend.languages} />
      <ChipGroup title="Front end: frameworks and tools" items={p.frontend.tools} />
      <BulletGroup title="Front end: techniques" items={p.frontend.techniques} />
      <p className="modal-text">Data storage: {p.frontend.storage}</p>
      <p className="modal-text">Hosted on: {p.frontend.hosting}</p>

      <ChipGroup title="Workflow and tools" items={p.workflowTools} />
      <ChipGroup title="Concepts I practiced" items={p.concepts} />

      <BulletGroup title="Design decisions and limits" items={p.decisions} />
    </>
  )
}