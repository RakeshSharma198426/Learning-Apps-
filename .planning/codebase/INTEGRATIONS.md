# Integrations

## Authentication and identity
- Microsoft Authentication Library (`@azure/msal-browser`, `@azure/msal-react`)
- Azure AD redirect-based sign-in flow initialized in `src/App.jsx`
- JWT claims validation with `jwt-decode` for role and group checks
- Protected routes enforced by `PrivateRoute` and `PublicRoute`

## API integration
- Shared HTTP client: `src/api/axios.jsx`
- Request interceptor attaches bearer token from `sessionStorage`
- Additional APIM subscription header is injected if configured
- Token refresh flows through MSAL silent acquisition, logout redirect on required interaction

## State integration
- Redux store created in `src/store.jsx`
- Feature slices:
  - `src/api/projectsSlice.jsx`
  - `src/api/jobsSlice.jsx`

## External UI frameworks
- MUI components and theme provider
- Emotion global styles and CSS baseline
- SCSS layout and card styling

## CI/CD
- `azure-pipelines.yml` defines Azure pipeline steps for build/test automation
- Vite + Jest/Playwright commands are wired into package scripts

## Key integration risks
- Session storage is used to keep auth tokens, which makes lifecycle and security harder to reason about.
- The API layer depends on environment-driven configuration without a central contract validation layer.
- There is no dedicated security policy or threat model document yet.
