# Bachat Frontend

Bachat is a personal finance tracker. This folder contains the website that
people use to review income, expenses, savings goals, and reports.

## Features

- Dashboard with monthly income, expenses, savings, spending by category, and
  goal progress.
- Transactions: add, view, search, edit, and delete income or expense records.
- Savings goals: create and update goals, add money to a goal, and track
  progress and deadlines.
- Reports with totals and charts for a selected period.
- Responsive layout with navigation between the dashboard, transactions,
  goals, and reports.

## Technology

- React 19 and JavaScript
- Vite for local development and production builds
- Tailwind CSS for styling
- React Router for page navigation
- Axios for requests to the backend
- Recharts for charts
- Lucide React for icons
- date-fns for date utilities

## Requirements

- Node.js and npm
- The Bachat backend running at `http://localhost:3000`

## Run locally

From this folder, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. The frontend sends API
requests to `http://localhost:3000/api`; start the backend as described in
`../backend/README.md`.

## Other commands

```bash
npm run build    # Create the production files in dist/
npm run preview  # Preview the production build locally
npm run lint     # Check the frontend code with ESLint
```

## Project layout

- `src/pages/` contains the dashboard, transaction, goal, and report pages.
- `src/components/` contains shared layout and chart components.
- `src/hooks/` and `src/services/` contain data-fetching logic and API calls.
- `public/` contains static assets served by Vite.
