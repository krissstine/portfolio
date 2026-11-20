/* ╔══════════════════════════════════════════════════════════════════╗
   ║  Moneyplan.jsx — Money Planner                                   ║
   ║                                                                  ║
   ║  1) MONEY_PROJECT → the project data (edit text here)            ║
   ║  2) MoneyPlan()   → the "Details" content shown in the popup     ║
   ╚══════════════════════════════════════════════════════════════════╝ */

import moneyplan from '../photos/moneyplan.png'

/* ---- SWIMLANE DIAGRAM ----
   Link: the draw.io file on Google Drive (set sharing to "Anyone with the link").
   Picture (optional): export the diagram from draw.io as PNG and save it as
   photos/moneyswimlane.png. It shows up automatically. If no file exists,
   only the link shows, so the build never breaks. */
const MONEY_SWIMLANE_LINK =
  'https://drive.google.com/file/d/1FhycyruIZmg69FyDIey3El3Z_k-LlhxJ/view?usp=sharing'

const moneySwimlaneFiles = import.meta.glob('../photos/moneyswimlane*.png', { eager: true })
const MONEY_SWIMLANE_IMG = Object.values(moneySwimlaneFiles)[0]?.default || null

/* ---- SYSTEM DOCUMENTATION ----
   Link: the process narrative PDF on Google Drive (set sharing to
   "Anyone with the link"). */
const MONEY_DOCS_LINK =
  'https://drive.google.com/file/d/1_C14M7NyM7xOZxsExE_S-Pr2UBzyk5Ig/view?usp=sharing'

/* ---- DATA: everything about the Money Planner ---- */
export const MONEY_PROJECT = {
  title: 'Money Planner',
  desc: 'A personal finance web app for tracking income and expenses, monthly budgets, savings goals, and upcoming bills, all in one place.',
  long: 'Money Planner is a personal finance web app with four connected pages: Accounts, Monthly Budget, Savings Goals, and Upcoming Bills. It runs entirely in the browser and saves data to local storage, so records survive a page refresh. A key rule keeps the numbers realistic: a month needs income before any expense can be recorded, so every budget starts from real money in.',
  image: moneyplan,
  link: 'https://money-planner-xi.vercel.app/',
  role: 'Full-stack developer (design, build, deploy)',
  tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Vercel'],

  /* ---- CASE STUDY: the questions interviewers ask ---- */
  problem:
    'Most people track money in their head or in a loose notes app, so spending gets out of hand and nobody notices until the month is over. Many budgeting tools also let you record expenses before any income exists, which produces budgets that look fine but are not based on real money. Money Planner fixes this by keeping income, budgets, savings goals, and bills in one place, and by refusing to record an expense for a month that has no income.',

  approach: [
    'Why React and Vite: the app is mostly forms, lists, and live totals that change as soon as a record is added. React state fits that well, and Vite gives fast reloads and a simple build for deployment.',
    'Why local storage instead of a database: I wanted a working app that anyone can open without creating an account. Local storage meant I could finish and deploy the whole product first, and keep the data layer small enough to understand fully.',
    'Why no router library: with only four pages, switching by state kept the code simple and removed one dependency.',
    'Why Vercel: it deploys straight from GitHub, so every push can become a live version with no server to manage.',
  ],

  hardPart: [
    'Keeping budgets realistic: the income-first rule had to be checked per month, not globally. Each expense is checked against the income of its own month before it is saved.',
    'Drawing the pie chart without a library: I calculated each category\'s share of the total and converted it into SVG arc paths. It was more work than installing a chart package, but it taught me how the chart really works and keeps the bundle small.',
    'Making CSV export safe: values that begin with characters such as = or + can run as formulas when the file is opened in a spreadsheet. I escape those values so exported data cannot execute anything.',
    'Not losing data: records are written to local storage on every change and loaded when the app opens, so a refresh does not erase anything.',
  ],

  result: [
    'Deployed and running at the live link above, with no login needed, so anyone can try it right away.',
    'All four pages work end to end: Accounts, Monthly Budget, Savings Goals, and Upcoming Bills, including CSV export.',
    'Works on both phones and desktops.',
  ],

  retrospective: [
    'Add a back end earlier. Local storage keeps data on one device and one browser, and a user can edit it by hand, so it is not tamper-proof. An Express and PostgreSQL back end with authentication would fix both problems.',
    'Write automated tests for the money calculations (totals, monthly grouping, savings per month), since those are the parts where a small bug gives wrong numbers.',
    'Split the larger page components into smaller ones sooner, so each file does one job and is easier to change.',
  ],

  swimlaneExplain:
    'This swimlane diagram shows who does what in the system, with one lane each for the user, the React pages, and browser local storage. The user only enters data and makes choices. The React pages validate that input, apply rules such as income before expenses, and calculate the totals and charts. Local storage only saves and returns records. I designed it in lanes on purpose, to keep responsibilities separate: validation lives in one place, storage is the only part that touches saved data, and the screens just display results. It also shows exactly where a future back end would plug in, because replacing the storage lane with an API and database would not change the user or page lanes.',

  /* ---- FLOWCHART: how the app works, step by step ---- */
  flowchart: [
    { type: 'start', text: 'Open Money Planner' },
    { type: 'data', text: 'Load transactions, budgets and goals from local storage' },
    {
      type: 'decision',
      text: 'Which page does the user choose?',
      branches: [
        { label: 'Accounts', text: 'Add or delete a transaction, or export CSV (expense blocked if the month has no income)' },
        { label: 'Monthly', text: 'Pick a month, view totals and the pie chart, set category budgets' },
        { label: 'Savings', text: 'Create a goal, add savings, see progress and the monthly amount needed' },
        { label: 'Bills', text: 'Add a bill, pick a month, mark bills as paid' },
      ],
    },
    { type: 'data', text: 'Save changes to local storage and refresh the view' },
    { type: 'end', text: 'Close the app' },
  ],

  /* ---- HOW A RECORD MOVES THROUGH THE SYSTEM ---- */
  workflow: [
    'The user records income for a month. This unlocks expenses for that month',
    'The user records expenses with a description, amount, category, and date, and the balance updates right away',
    'The Monthly Budget page groups those records by month and category, and compares spending with each category budget',
    'Savings goals and upcoming bills are tracked on their own pages, and the user can export everything to CSV',
  ],

  /* ---- FEATURES, grouped by the page they belong to ---- */
  accountsFeatures: [
    'Record income and expenses with a description, amount, category, and date',
    'Income-first rule: expenses are blocked for any month that has no income yet',
    'Total income, total expenses, and current balance at a glance',
    'Delete any record from the transaction history',
    'Export all records to a CSV spreadsheet with a summary, full transaction list, category totals, and monthly totals',
  ],

  monthlyFeatures: [
    'Pick any month to see its income, total spent, and remaining amount',
    'Progress bar showing how much of the month\'s income is used, turning amber at 80% and red when over',
    'Pie chart of spending by category, drawn with SVG and no chart library',
    'Set a monthly budget for each category and track spent vs. budget',
  ],

  savingsFeatures: [
    'Create goals with a target amount, an amount already saved, and an optional target date',
    'Add savings to any goal at any time',
    'Shows how much to save per month to reach a goal by its target date',
    'Summary of total saved, total of all targets, and goals reached',
  ],

  calendarFeatures: [
    'Month calendar with each bill placed on its due date',
    'Add one-time bills or bills that repeat every month',
    'Mark bills as paid for each month; unpaid bills past their due date show as overdue',
    'Totals for bills due, paid, and still to pay this month',
  ],

  generalFeatures: [
    'Four pages switched from one navigation bar using state, with no router library',
    'Data saved in local storage so it persists after a refresh',
    'Dark glass design, responsive for phones and desktops',
    'Form input validated before anything is saved',
  ],

  /* ---- FRONT END ---- */
  frontend: {
    languages: ['JavaScript (ES6+)', 'JSX', 'HTML5', 'CSS3'],
    tools: ['React (hooks)', 'Vite', 'ESLint', 'npm'],
    techniques: [
      'Component state with useState, useEffect, and useMemo',
      'Page switching by state, with no router library',
      'Responsive layout with CSS Grid and Flexbox',
      'CSS variables for the dark glass theme',
      'Custom SVG pie chart with no chart library',
      'Native date, month, and number inputs with validation',
    ],
    storage: 'Browser local storage (transactions, budgets, goals, and bills)',
    hosting: 'Vercel',
  },

  /* Other tools and workflow */
  workflowTools: ['Git', 'GitHub', 'VS Code'],

  /* Concepts practiced, commonly listed in job requirements */
  concepts: [
    'Component-based architecture with React hooks (useState, useEffect, useMemo)',
    'Derived data: totals and monthly summaries calculated from one list of records',
    'State-based page navigation without a router library',
    'Custom SVG pie chart generated from data',
    'Business-rule validation (income before expenses)',
    'Date handling: local dates and grouping by month',
    'CSV export with escaping and protection against spreadsheet formula injection',
    'Persistent client-side storage with local storage',
    'Responsive UI design',
    'Cloud deployment (Vercel) and version control (Git)',
  ],

  /* ---- DESIGN DECISIONS AND LIMITS ---- */
  decisions: [
    'Data is stored in the browser, so records live on one device and browser. There is no login yet.',
    'Budgets are set per category and compare against each month\'s spending.',
    'Next step: add an Express and PostgreSQL back end with authentication so data syncs across devices.',
  ],
}

/* ---- styles for the flowchart (inline, so no extra CSS file is needed) ---- */
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
  data: { background: 'rgba(255,242,204,0.12)', borderColor: 'rgba(214,182,86,0.6)' },
  decision: { background: 'rgba(255,242,204,0.12)', borderColor: 'rgba(214,182,86,0.6)' },
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
function MoneyPlan() {
  const p = MONEY_PROJECT

  return (
    <>
      <h4 className="modal-sub">About this project</h4>
      <p className="modal-text">{p.long}</p>

      <h4 className="modal-sub">The problem</h4>
      <p className="modal-text">{p.problem}</p>

      <BulletGroup title="My approach: why these choices" items={p.approach} />

      <h4 className="modal-sub">How the app works</h4>
      <FlowChart steps={p.flowchart} />

      <h4 className="modal-sub">How a record moves through the system</h4>
      <ol className="modal-list">
        {p.workflow.map((s) => <li key={s}>{s}</li>)}
      </ol>

      {/* SYSTEM FLOW (swimlane), shown only when a link or picture is set */}
      {(MONEY_SWIMLANE_LINK || MONEY_SWIMLANE_IMG) && (
        <>
          <h4 className="modal-sub">System flow (swimlane diagram)</h4>
          <p className="modal-text">{p.swimlaneExplain}</p>
          {MONEY_SWIMLANE_IMG && (
            <a href={MONEY_SWIMLANE_LINK || undefined} target="_blank" rel="noopener noreferrer">
              <img
                src={MONEY_SWIMLANE_IMG}
                alt="Swimlane diagram of the Money Planner showing the user, the React pages, and browser local storage"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }}
              />
            </a>
          )}
          {MONEY_SWIMLANE_LINK && (
            <p>
              <a className="btn ghost" href={MONEY_SWIMLANE_LINK} target="_blank" rel="noopener noreferrer">
                Open the swimlane file →
              </a>
            </p>
          )}
        </>
      )}

      {/* SYSTEM DOCUMENTATION, shown only when a link is set */}
      {MONEY_DOCS_LINK && (
        <>
          <h4 className="modal-sub">System documentation</h4>
          <p className="modal-text">
            The process narrative for the system: its purpose, participants, inputs, step-by-step flow for each page, decision points, exceptions, outputs, and known limitations.
          </p>
          <p>
            <a className="btn ghost" href={MONEY_DOCS_LINK} target="_blank" rel="noopener noreferrer">
              Open the documentation →
            </a>
          </p>
        </>
      )}

      <BulletGroup title="Accounts page" items={p.accountsFeatures} />
      <BulletGroup title="Monthly budget page" items={p.monthlyFeatures} />
      <BulletGroup title="Savings goals page" items={p.savingsFeatures} />
      <BulletGroup title="Upcoming bills page" items={p.calendarFeatures} />
      <BulletGroup title="Across the app" items={p.generalFeatures} />

      <BulletGroup title="The hardest parts and how I solved them" items={p.hardPart} />
      <BulletGroup title="Result" items={p.result} />
      <BulletGroup title="What I would do differently" items={p.retrospective} />

      <h4 className="modal-sub">My role</h4>
      <p className="modal-text">{p.role}</p>

      <ChipGroup title="Front end: languages" items={p.frontend.languages} />
      <ChipGroup title="Front end: frameworks and tools" items={p.frontend.tools} />
      <BulletGroup title="Front end: techniques" items={p.frontend.techniques} />
      <p className="modal-text">Data storage: {p.frontend.storage}</p>
      <p className="modal-text">Hosted on: {p.frontend.hosting}</p>

      <ChipGroup title="Workflow and tools" items={p.workflowTools} />
      <ChipGroup title="Concepts I practiced" items={p.concepts} />

      <BulletGroup title="Design decisions and next steps" items={p.decisions} />
    </>
  )
}

export default MoneyPlan