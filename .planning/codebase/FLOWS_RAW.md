# Flows Raw

## 1. App bootstrap
- Browser loads the root app from `src/main.jsx`
- Redux store, MUI theme, router, and MSAL provider are initialized
- `src/App.jsx` checks whether the user is already authenticated or has a redirect response from Azure AD
- The app decides whether to render protected routes or login flow

## 2. Login and MSAL lifecycle
- `src/App.jsx` calls `instance.initialize()` and `instance.handleRedirectPromise()`
- Decoded claims are read from the access token
- Role and group checks are compared to configured environment values
- On success, token details are stored in `sessionStorage` and the user is redirected to `/dashboard`
- On unauthorized role/group, the app stores an auth error and navigates to the unauthorized page

## 3. API request flow
- UI components dispatch Redux thunks for jobs or projects
- The thunk calls the shared `api` client from `src/api/axios.jsx`
- The request interceptor reads the current token from `sessionStorage`
- If the token is expired or invalid, MSAL attempts silent acquisition
- If silent acquisition fails, the app logs the user out and clears session data
- The request is sent with Authorization and optional subscription key headers

## 4. Dashboard data flow
- Dashboard loads recent project and job data on mount
- Project/job lists are filtered by current tab (`my` vs `all`)
- `fetchProjects` and `fetchJobs` load results and expose loading/error state to UI
- Stats cards and list tables render from the slice state

## 5. Project and job listing flow
- User navigates to project or job routes via router
- Route page loads list data and renders item cards or tables
- Empty states are rendered via shared `NoListAvailableYet` abstraction
- User can trigger navigation or list actions, with some actions currently placeholder-driven

## 6. Unauthorized flow
- If the user lacks valid Azure AD role or group claims, they are redirected to `/unauthorized-error`
- The route layer plus app-level auth gate enforce access control

## 7. E2E and verification flow
- Playwright smoke tests exercise page-level flows
- Jest ensures component and slice behaviors remain valid
- Build and lint commands verify production readiness

## Key business-facing outcomes
The app is intended to support:
- user sign-in via corporate identity
- viewing project and job status dashboards
- reviewing recent work items and portfolio progress
- enforcing access based on identity claims and association metadata
