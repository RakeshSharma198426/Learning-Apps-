# CLAUDE.md

## Project overview

This repository is a Vite-based React 19 single-page application for a Wipfli/GenAI front-end. The app serves a dashboard-driven workflow with project and job views, Azure AD sign-in, and Redux Toolkit state slices for API-backed data.

## Detected stack

- Frontend: React 19 / Vite
- UI: MUI + Emotion + SCSS
- State: Redux Toolkit
- Routing: React Router v7
- Auth: Microsoft MSAL + JWT validation
- API layer: Axios with env-based base URL and subscription key injection
- Testing: Jest + Testing Library + Playwright
- CI/CD: Azure Pipelines configuration present at root

## Key runtime architecture

- Entry point: `src/main.jsx`
- App bootstrap: `src/App.jsx`
- Route registry: `src/routes/appRoutes.jsx`
- Authentication and env config: `src/utils/auth.js`
- API clients and data slices: `src/api/*.jsx`
- Shared layouts and visuals: `src/layouts`, `src/components`, `src/theme`, `src/styles`

## Main flows

- MSAL redirect authentication initializes in `src/App.jsx` and stores access tokens in `sessionStorage`.
- `src/api/axios.jsx` injects the bearer token and APIM subscription header on each request.
- Redux slices in `src/api/projectsSlice.jsx` and `src/api/jobsSlice.jsx` load project and job lists.
- Route protection relies on `isAuthenticated()` and `PrivateRoute`/`PublicRoute` wrappers.
- Dashboard, project, and job pages interact with the state slices and route-level navigation.

## Testing and verification

- Unit tests live under `src/specs`.
- E2E smoke tests live under `tests/e2e`.
- Commands:
  - `npm test`
  - `npm run e2e`
  - `npm run build`
  - `npm run lint`

## Current onboarding findings

- Knowledge graph and learning pipeline have been generated successfully under `.zerovity/knowledge`.
- The repo has no explicit security policy, threat model, or security tooling configuration in the project root.
- There are no ADRs or architecture documents yet; `architecture.md` is still a placeholder.
- The biggest blast-radius modules are the dashboard page, jobs page, projects page, and shared route/global UI modules.

## Recommended next steps

1. Add project-level security policy and threat model documentation.
2. Add architecture decision records for auth, routing, and data access boundaries.
3. Review auth storage patterns and consider moving token handling toward a more robust model.
4. Run `/zerovity:invariant-catalog --from-knowledge` to formalize project-specific guardrails.
