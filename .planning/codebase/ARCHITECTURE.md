# Architecture

## High-level architecture
This frontend uses a layered SPA design:
1. Bootstrap and provider setup
2. Router-based page composition
3. Feature-level screens
4. Redux slice data loading
5. Shared UI and utility modules

## Entry and bootstrap
- `src/main.jsx` initializes the app with:
  - browser router
  - Redux provider
  - MUI theme + CSS baseline
  - global style injection
  - MSAL provider
- `src/App.jsx` runs app-level redirect auth initialization and decides whether to render protected routes.

## Route architecture
- `src/routes/appRoutes.jsx` defines public and private route groups
- `src/routes/privateRoute.jsx` protects authenticated pages
- `src/routes/publicRoute.jsx` gates login-related access
- `src/routes/path.js` centralizes route constants

## Data-flow shape
- UI pages fetch or select data from Redux slices
- Slices wrap REST calls through `src/api/axios.jsx`
- Data is normalized as Redux state objects for project and job lists
- Dashboard components compose summary cards, stats, and tables from this state

## Architecture maturity
The codebase is operational and understandable, but not strongly domain-separated. It is primarily organized by page and shared component, not by bounded contexts or feature modules. Authorization, route protection, and API integration are centralized enough to be maintainable, but the app still has to be watched carefully when broad UI or auth changes are made.

## Notable architecture gaps
- No ADRs or architecture records exist
- No explicit domain model or service layer abstraction beyond HTTP + Redux
- No documented system boundaries for auth or API contracts
