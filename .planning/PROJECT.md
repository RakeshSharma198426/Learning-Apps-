# Project Overview

## Summary

This project is a React 19 front-end application built with Vite and designed around a dashboard view for jobs and projects. It is a brownfield SPA with Azure AD authentication, Redux data flow, route-based access control, and UI composition through MUI and SCSS.

## Technology profile

- Vite + React 19.0.0
- React Router DOM for page routing
- Redux Toolkit for application state
- Axios for API access
- MUI/Emotion for components and theme
- MSAL for Microsoft identity integration
- Jest + Testing Library + Playwright for automated coverage

## Major modules

- `src/main.jsx`: application bootstrap and global providers
- `src/App.jsx`: app initialization and MSAL redirect handling
- `src/routes/appRoutes.jsx`: route registry and access pattern
- `src/store.jsx`: combined reducer configuration
- `src/api/projectsSlice.jsx` and `src/api/jobsSlice.jsx`: async data loading
- `src/utils/auth.js`: auth env config and token helpers
- `src/components/*`: reusable UI blocks and cards
- `src/pages/*`: page-level feature screens and route entry points

## Observed patterns

- Auth decisions are centralized around MSAL and `sessionStorage` token retention.
- The app follows a feature- and page-oriented layout rather than a strongly modular domain architecture.
- Many UI components are directly coupled to locale strings, route configuration, and state selectors.
- There is no formal architecture review or ADR record yet.

## Strengths

- Clear route and UI separation by page and component directory.
- State slices are centralized and easy to follow for dashboard and listing screens.
- Testing infrastructure is already present, with unit and E2E layers covering the app.
- The knowledge graph has been generated and can be used for impact analysis before edits.

## Recommended onboarding direction

This is best treated as a brownfield modernization / continuation project rather than greenfield work. The next steps should focus on strengthening auth boundaries, documenting architecture decisions, and codifying invariants for route, state, and security rules.
