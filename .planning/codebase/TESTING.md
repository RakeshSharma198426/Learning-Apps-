# Testing

## Current test coverage
The repository already contains both unit-style component tests and E2E smoke tests.

### Unit and component tests
- `src/specs/` contains numerous React and Redux-related tests
- Example files include:
  - `src/specs/components/Jobs.test.jsx`
  - `src/specs/components/projectsSlice.test.js`
  - `src/specs/common/Header.test.jsx`
  - `src/specs/common/SidebarLayout.test.jsx`

### E2E tests
- `tests/e2e/smoke.spec.js`
- Playwright config exists at `playwright.config.js`

## Commands
- `npm test` — Jest-based suite
- `npm run e2e` — Playwright suite
- `npm run build` — production build check
- `npm run lint` — ESLint validation

## Testing strengths
- Test structure is present before new work and covers multiple UI modules
- E2E smoke configuration exists

## Testing gaps
- There is no formal test policy or coverage target in project docs
- Auth-sensitive flows are not explicitly covered in a security-focused manner
- The app’s MSAL redirect and token refresh flows need targeted tests if used in production-critical scenarios
