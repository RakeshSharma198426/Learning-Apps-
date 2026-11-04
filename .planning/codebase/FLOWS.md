# Flows

## 1. Application startup and route gating
The app entry point in `src/main.jsx` creates the providers and browser router, then renders the root `App` component. The app-level bootstrap in `src/App.jsx` initializes MSAL, checks redirect responses, and determines whether the user is authenticated before rendering the route tree. This creates a clear split between public access (typically login) and private access (dashboard/project/job pages).

## 2. Authentication and authorization path
Authentication is driven by Azure AD through MSAL. When a redirect response is present, the app decodes the JWT from the access token and reads claims such as preferred username, name, object ID, roles, and groups. It compares those claims to the configured environment values for authorized role and group membership. If valid, the app stores the token and user metadata into `sessionStorage`, clears the post-login redirect flag, and routes the user to `/dashboard`. If not valid, it writes an auth error and redirects to the unauthorized page.

## 3. Protected API access
All project and job requests flow through a central Axios instance implemented in `src/api/axios.jsx`. The interceptor loads the session token and refreshes it through MSAL when expired. If silent token acquisition fails, the user is logged out and session state is cleared. The request is then sent with an Authorization header and optional APIM subscription key. This centralization protects the rest of the app from repeated auth logic and makes the data layer consistent.

## 4. Dashboard intelligence flow
The dashboard page assembles a summary of the portfolio by dispatching `fetchJobs` and `fetchProjects` thunks. It reads the Redux slices to populate recent project and job sections, quick stats, and empty-state behavior. Users can switch between `my` and `all` views; the filters change the request parameters and refresh the data set. The dashboard is thus the operational home page and the primary composition point for connected business data.

## 5. Listing and navigation flow
The app routes to project and job pages through a centralized route configuration. Each page relies on the Redux data slices to populate lists or cards and to expose loading and error states. Empty states are handled by shared UI components to keep the UX consistent. Some navigation actions remain placeholders or console-driven flows, indicating a still-evolving final product behavior rather than a fully completed feature model.

## 6. Security and failure handling flow
Authentication failure, token refresh failure, and invalid role/group claims all funnel into explicit redirect or logout actions. The app does not hide those failures; it persists auth error state and routes users to the unauthorized page or to login. This is a reasonable baseline, but the fact that tokens live in session storage means the security boundary should be revisited in a formal review before major growth.

## 7. Verification and quality flow
The repo contains Jest tests for slices and components and Playwright smoke tests for page-level interactions. The build and lint scripts provide pre-deployment validation, and the Zerovity-generated knowledge graph provides static impact analysis to understand the blast radius of change. This gives the team a solid baseline but not yet a formal policy layer for security or architecture decisions.

## Summary
The primary business flow is: sign in with Azure AD → validate claims → store token → load dashboard data → access project/job views → render list and summary UI → enforce auth boundaries. The architecture is workable and already tested, but it needs stronger security documentation, ADRs, and clearer service boundaries before broad modernization or feature expansion.
