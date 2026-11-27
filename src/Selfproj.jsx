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

  /* ---- DEMO LOGIN (for testing the live site) ----
     Shown in the popup under "Try it yourself". To hide it, set demo to null. */
  demo: {
    note: 'Use this admin account to explore the admin side of the live site. The free Render server sleeps when idle, so the first load can take about a minute.',
    username: 'self-attendanceadmin',
    password: 'self-attendanceadminspassword',
  },

  /* ---- CASE STUDY: the questions interviewers ask ---- */
  problem:
    'Taking attendance by hand on paper or in a chat is slow and easy to get wrong. Names get missed, late arrivals are not recorded, and nobody can prove who was actually in class. A plain "I am present" button would be just as easy to fake. This system fixes both problems: students clock in only while their class is in session and must attach a live evidence photo, and the admin can review every photo and correct any record, so attendance is faster and backed by proof.',

  approach: [
    'Why Laravel for the back end: it gives a lot of the hard parts out of the box, including routing, validation, database migrations and models (MVC), and token-based authentication. As a first full-stack project, that let me spend my time on the attendance rules instead of building plumbing from scratch.',
    'Why PostgreSQL instead of MySQL: the data is relational (students, subjects, enrollments, attendance records, messages), and PostgreSQL handles that well with strict data types and constraints that protect the data. It is also what managed hosts such as Neon offer, so I could use a managed database in the cloud instead of running my own.',
    'Why a separate React front end and Laravel API: keeping them apart meant I could host and change each one on its own, and the same API could serve a different front end later.',
    'Why Docker on Render: the container runs the same way on my machine and on the server, so deployment does not depend on how the server happens to be set up.',
    'Why two separate logins: students and admins can do very different things, so each has its own login and token, and student screens never expose admin actions.',
  ],

  hardPart: [
    'Photo capture and upload: the app takes a live photo with the camera (getUserMedia), draws it on a canvas with the class, date, and time stamped on it, converts it to JPEG, and sends it to the API as multipart form data. A phone-camera fallback covers devices where the live camera is blocked.',
    'Protecting the photos: evidence photos are private, so the front end loads them with a Bearer token instead of an open link. Students can delete their own photo, the record stays, and old photos are removed automatically after 16 weeks.',
    "Keeping records honest: class windows are decided by the server's clock, not the student's phone, so changing the phone's time does not let someone clock in. The admin can review every photo and correct any status.",
    'Schedule rules: enrolling a student checks for schedule clashes, and the admin attendance list is blocked outside the class schedule unless the admin chooses to open it anyway.',
    'Connecting the pieces in the cloud: the React site, the Laravel API, and the database live on different hosts, so I had to set up CORS, environment variables, and a Docker build before they could talk to each other.',
  ],

  result: [
    'Deployed and running at the live link above: the front end on Render, the Laravel API in a Docker container on Render, and the database on Neon.',
    'The full flow works end to end: register, log in, clock in with a photo, review attendance as an admin, and send and answer messages.',
    'Works on phones and desktops, with keyboard and screen-reader support.',
  ],

  retrospective: [
    'Add a stronger check on who is clocking in. Right now there is no location or biometric check, so the live photo and admin review are the only safeguards. A location check would make it harder to clock in from home.',
    'Write automated tests for the attendance rules (class windows, late versus present, schedule clashes), since a small mistake there gives wrong records.',
    'Plan the database and the API first on paper, so fewer changes are needed halfway through. As my first full-stack project, I learned a lot by building and then reshaping it.',
    'Store photos in dedicated file storage with backups, instead of relying on the app server, so evidence is not lost if the server is rebuilt.',
  ],

  swimlaneExplain:
    "This swimlane diagram follows each function (register, clock in, history, messages, attendance, evidence, subjects) across five lanes: the student, the admin, the React front end, the Laravel API, and PostgreSQL. People only act and decide, the React front end collects input and shows results, the Laravel API applies the rules (login, class-time checks, schedule clashes) and PostgreSQL only stores the records. I designed it in lanes on purpose, to show where each rule lives and what happens in each hand-off, for example a student's photo travelling from the camera to the API to the admin's review screen. Because every rule sits in the API lane, the front end can be changed or replaced without changing how attendance is protected.",

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

/* One labelled credential line (username / password) */
function CredRow({ label, value }) {
  return (
    <p className="modal-text" style={{ margin: '0 0 6px' }}>
      <span style={{ opacity: 0.7 }}>{label}: </span>
      <code
        style={{
          padding: '3px 10px',
          borderRadius: '8px',
          background: 'rgba(167,139,255,.14)',
          border: '1px solid rgba(167,139,255,.3)',
          userSelect: 'all',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </code>
    </p>
  )
}

/* ---- COMPONENT: the Details content for the popup ---- */
function SelfProj() {
  const p = SELF_PROJECT

  return (
    <>
      <h4 className="modal-sub">About this project</h4>
      <p className="modal-text">{p.long}</p>

      {/* TRY IT YOURSELF (demo admin login) */}
      {p.demo && (
        <>
          <h4 className="modal-sub">Try it yourself (demo admin login)</h4>
          <p className="modal-text">{p.demo.note}</p>
          <CredRow label="Username" value={p.demo.username} />
          <CredRow label="Password" value={p.demo.password} />
          {p.link && (
            <p>
              <a className="btn ghost" href={p.link} target="_blank" rel="noopener noreferrer">
                Open the live site →
              </a>
            </p>
          )}
        </>
      )}

      <h4 className="modal-sub">The problem</h4>
      <p className="modal-text">{p.problem}</p>

      <BulletGroup title="My approach: why these choices" items={p.approach} />

      <BulletGroup title="Student features" items={p.studentFeatures} />
      <BulletGroup title="Admin features" items={p.adminFeatures} />
      <BulletGroup title="Across the app" items={p.generalFeatures} />
      <BulletGroup title="How self-recorded attendance is kept honest" items={p.integrity} />

      <BulletGroup title="The hardest parts and how I solved them" items={p.hardPart} />
      <BulletGroup title="Result" items={p.result} />
      <BulletGroup title="What I would do differently" items={p.retrospective} />

      <h4 className="modal-sub">My role</h4>
      <p className="modal-text">{p.role}</p>

      {/* SYSTEM FLOW (swimlane) */}
      <h4 className="modal-sub">System flow (swimlane diagram)</h4>
      <p className="modal-text">{p.swimlaneExplain}</p>
      {SWIMLANE_IMG && (
        <a href={SWIMLANE_LINK} target="_blank" rel="noopener noreferrer">
          <img
            src={SWIMLANE_IMG}
            alt="Swimlane diagram of the Self-Attendance System showing the student, admin, React front end, Laravel API, and PostgreSQL"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }}
          />
        </a>
      )}
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