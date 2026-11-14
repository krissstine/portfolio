/* ╔══════════════════════════════════════════════════════════════════╗
   ║  Selfproj.jsx — Self-Attendance System (my first project)         ║
   ║                                                                  ║
   ║  1) SELF_PROJECT  → the project data (edit text here)            ║
   ║  2) SelfProj()    → the "Details" content shown in the popup     ║
   ╚══════════════════════════════════════════════════════════════════╝ */

import selfatten from '../photos/selfatten.png'

/* ---- SWIMLANE DIAGRAM ----
   Link: the draw.io file on Google Drive (set sharing to "Anyone with the link").
   Picture: export the diagram from draw.io as PNG (File > Export as > PNG)
   and save it as  photos/swimlane.png  (any name starting with "swimlane"
   works). It shows up automatically. If no file exists, only the link shows,
   so the build never breaks. */
const SWIMLANE_LINK =
  'https://drive.google.com/file/d/1nn3xubUd63EUZ1_gosLnw9T33RkA9KWY/view?usp=sharing'

const swimlaneFiles = import.meta.glob('../photos/swimlane*.png', { eager: true })
const SWIMLANE_IMG = Object.values(swimlaneFiles)[0]?.default || null

/* ---- SYSTEM DOCUMENTATION ----
   Link: the documentation file on Google Drive (set sharing to
   "Anyone with the link"). */
const DOCS_LINK =
  'https://drive.google.com/file/d/1dIgb8U2wxnYlo8fXPIQw6yd9n4P8QcSt/view?usp=sharing'

/* ---- DATA: everything about the Self-Attendance System ---- */
export const SELF_PROJECT = {
  title: 'Self-Attendance System',
  desc: 'A web app where students register, clock in to their classes with a live evidence photo, and message their admin, while admins manage subjects, enrollment, and attendance.',
  long: 'My first full-stack project. Students register, log in, see the classes they are enrolled in, and clock in while a class is in session by taking a live evidence photo. Admins have a separate login to manage subjects and enrollment, review and correct attendance, check evidence photos, and answer student messages and requests. The front end is React and Vite (static site on Render). The back end is a Laravel API with a PostgreSQL database, packaged with Docker and deployed on Render.',
  image: selfatten,
  link: 'https://self-attendace-system.onrender.com/',
  role: 'Full-stack developer (planning, design, front end, back end, deploy)',

  studentFeatures: [
    'Two-step registration and login',
    "Today view: classes in session right now, based on the server's clock",
    'Weekly schedule of the subjects the admin enrolled the student in',
    'Clock in with a live camera photo stamped with class, date, and time (phone camera as a fallback)',
    'History with photo thumbnails; students can delete their own photo and the record stays',
    'Photos are removed automatically after 16 weeks',
    'Messages and requests to the admin (excuse, correction, other) with Pending or Approved status and admin replies',
  ],

  adminFeatures: [
    'Separate admin login and dashboard',
    'Attendance by subject and date: set Present, Late, or Absent, with search, filters, and counts',
    'Class-time check that blocks the list outside the class schedule, with an "open anyway" option on class days',
    'Evidence tab to review and remove student photos',
    'Messages tab to approve requests and reply to messages',
    'Subjects: create, edit, and delete with days, times, room, and instructor',
    'Enroll students in subjects, with a schedule-clash check',
    "Searchable subject picker that lists the day's classes first",
  ],

  generalFeatures: [
    'Responsive layout: bottom tab bar and bottom sheets on phones',
    'Keyboard and screen-reader support (ARIA roles, focus styles, reduced motion)',
  ],

  /* How self-recorded attendance is kept honest (design trade-off) */
  integrity: [
    'Clocking in needs a live photo stamped with the class, date, and time',
    "Class windows follow the server's clock, not the student's phone",
    'The admin can review every photo and correct any status',
    'Students control their own photos (delete any time, automatic removal after 16 weeks)',
    'Trade-off: there is no location or biometric check, so admin review is the safeguard',
  ],

  /* ---- FRONT END ---- */
  frontend: {
    languages: ['JavaScript (ES6+)', 'JSX', 'CSS3'],
    tools: ['React', 'React DOM', 'Vite', 'ESLint', 'npm'],
    browserApis: ['Camera (getUserMedia)', 'Canvas', 'Fetch', 'FormData', 'localStorage'],
    hosting: 'Render (Static Site)',
  },

  /* ---- BACK END (attendance-api) ---- */
  backend: {
    languages: ['PHP'],
    tools: ['Laravel', 'PostgreSQL', 'Composer', 'Artisan CLI', 'REST API', 'Bearer-token authentication', 'Docker'],
    hosting: 'Render (Docker Web Service, Singapore)',
    database: 'Neon (managed PostgreSQL)',
  },

  /* Other tools and workflow */
  workflow: [
    'Git',
    'GitHub',
    'VS Code',
    'Environment variables (.env)',
    'GitHub Copilot',
    'BLACKBOX AI',
    'Claude Code',
  ],

  /* Concepts practiced — commonly listed in job requirements */
  concepts: [
    'Full-stack development (front end and back end)',
    'Component-based architecture and React hooks',
    'Token-based authentication with separate student and admin logins',
    'REST API design and integration (CRUD)',
    'File upload (multipart) and image handling (camera, canvas, JPEG)',
    'Loading protected images with a Bearer token',
    'Time-based rules using server time',
    'Schedule-conflict validation',
    'Cross-origin requests (CORS) between the front end and the API',
    'Database migrations and models',
    'MVC architecture (Laravel)',
    'Containerization (Docker)',
    'Cloud deployment (Render)',
    'Responsive and accessible UI',
    'Form handling and validation',
    'Version control (Git)',
  ],

  /* Used by the project card in App.jsx */
  tags: ['React', 'Vite', 'JavaScript', 'Laravel', 'PHP', 'PostgreSQL', 'Neon', 'Docker', 'Render'],
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

/* ---- COMPONENT: the Details content for the popup ---- */
function SelfProj() {
  const p = SELF_PROJECT

  return (
    <>
      <h4 className="modal-sub">About this project</h4>
      <p className="modal-text">{p.long}</p>

      <BulletGroup title="Student features" items={p.studentFeatures} />
      <BulletGroup title="Admin features" items={p.adminFeatures} />
      <BulletGroup title="Across the app" items={p.generalFeatures} />
      <BulletGroup title="How self-recorded attendance is kept honest" items={p.integrity} />

      <h4 className="modal-sub">My role</h4>
      <p className="modal-text">{p.role}</p>

      {/* SYSTEM FLOW (swimlane) */}
      <h4 className="modal-sub">System flow (swimlane diagram)</h4>
      {SWIMLANE_IMG && (
        <a href={SWIMLANE_LINK} target="_blank" rel="noopener noreferrer">
          <img
            src={SWIMLANE_IMG}
            alt="Swimlane diagram of the Self-Attendance System showing the student, admin, React front end, Laravel API, and PostgreSQL"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }}
          />
        </a>
      )}
      <p className="modal-text">
        The diagram follows each function (register, clock in, history, messages, attendance, evidence, subjects) across the student, admin, React front end, Laravel API, and PostgreSQL.
      </p>
      <p>
        <a className="btn ghost" href={SWIMLANE_LINK} target="_blank" rel="noopener noreferrer">
          Open the swimlane file →
        </a>
      </p>

      {/* SYSTEM DOCUMENTATION */}
      <h4 className="modal-sub">System documentation</h4>
      <p className="modal-text">
        The process narrative for the system: its purpose, participants, inputs, step-by-step flow for the student and the admin, decision points, exceptions, and outputs.
      </p>
      <p>
        <a className="btn ghost" href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
          Open the documentation →
        </a>
      </p>

      {/* FRONT END */}
      <ChipGroup title="Front end: languages" items={p.frontend.languages} />
      <ChipGroup title="Front end: frameworks and tools" items={p.frontend.tools} />
      <ChipGroup title="Front end: browser APIs" items={p.frontend.browserApis} />
      <p className="modal-text">Hosted on: {p.frontend.hosting}</p>

      {/* BACK END */}
      <ChipGroup title="Back end: languages" items={p.backend.languages} />
      <ChipGroup title="Back end: frameworks and tools" items={p.backend.tools} />
      <p className="modal-text">Hosted on: {p.backend.hosting}</p>
      <p className="modal-text">Database hosted on: {p.backend.database}</p>

      <ChipGroup title="Workflow and tools" items={p.workflow} />
      <ChipGroup title="Concepts I practiced" items={p.concepts} />
    </>
  )
}

export default SelfProj