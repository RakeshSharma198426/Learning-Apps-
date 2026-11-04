# Structure

## Top-level layout
- `src/` contains application source
- `public/` holds static assets and shared resources
- `tests/e2e/` contains end-to-end specs
- `scripts/` contains maintenance and Zerovity automation helpers
- `.zerovity/` stores generated knowledge, hooks, and invariants
- `.planning/` stores project planning and codebase-mapping outputs

## Source organization
- `src/pages/` — route-level screens (Dashboard, Jobs, Projects, Login, Unauthorized)
- `src/components/` — reusable blocks for UI, cards, pagination, sorting, tables, buttons
- `src/api/` — HTTP + Redux slice logic
- `src/utils/` — auth helpers and shared utility code
- `src/routes/` — routing and route guards
- `src/styles/` and `src/theme/` — shared look-and-feel and global styling
- `src/layouts/` — shell layout and page containers
- `src/constants/` — locale strings and string constants

## Code-level pattern
The project favors plain React component functions with explicit props and `useState`/`useEffect` flows. Most page and component modules import shared assets directly, and the app relies on a fairly flat architecture: page modules compose reusable components rather than introducing deep subfeature packages.

## Notable files
- `src/main.jsx` — provider/bootstrap entry
- `src/App.jsx` — auth and route gating
- `src/store.jsx` — central reducer registry
- `src/api/projectsSlice.jsx` — project fetch state logic
- `src/api/jobsSlice.jsx` — job fetch state logic
- `src/routes/appRoutes.jsx` — route map
- `src/utils/auth.js` — auth config and environment values
