# Technical Debt and Risk Assessment

## High risk

### 1. Auth is token-driven and sessionStorage-based
**Evidence:** `src/App.jsx`, `src/utils/auth.js`, `src/api/axios.jsx`.

- Access tokens are stored in `sessionStorage` and read throughout the app.
- Token refresh and logout are handled inline with side effects and route redirects.
- This pattern makes token lifecycle and security hardening more fragile than a modern cookie or server-issued session model.

**Recommendation:** Review the authentication model, document the trust boundaries, and add a stricter security review before further auth changes.

### 2. No explicit security policy or architecture documentation
**Evidence:** `.zerovity/knowledge/security.md` and `.zerovity/knowledge/architecture.md`.

- There is no `SECURITY.md`, threat model, or ADR history.
- This leaves security expectations and architectural decisions implicit rather than enforced.

**Recommendation:** Add a security baseline and at least a minimal ADR set for auth, API access, and routing.

### 3. Route and API boundaries are not strongly isolated
**Evidence:** `src/routes/appRoutes.jsx`, `src/api/axios.jsx`, `src/pages/*`.

- API calls are globally configured with environment headers and token handling.
- Feature modules are page-centric and may be tightly coupled to shared globals.

**Recommendation:** Introduce clearer service-layer boundaries and shared app contracts before broad refactors.

## Medium risk

### 4. Error handling is inconsistent in async flows
**Evidence:** `src/api/projectsSlice.jsx`, `src/api/jobsSlice.jsx`, `src/App.jsx`.

- Some handlers read `err.response.status` without guarding `err.response`.
- Renderer-side logic sometimes treats error states as a page-state decision rather than a structured failure object.

**Recommendation:** Add a central API error strategy and normalize error payload handling.

### 5. Dashboard and route behavior include placeholder / debug logic
**Evidence:** `src/pages/Dashboard/DashboardView.jsx`.

- Several handlers log placeholder actions and leave navigation or create-project flows incomplete.

**Recommendation:** Treat these as sprint-state placeholders and separate them from production-ready UX flows before scaling the app.

## Low risk

### 6. knowledge graph indicates high-blast-radius modules
**Evidence:** `.zerovity/knowledge/GRAPH_REPORT.md`.

- Dashboard, jobs, projects, and shared constants are highly interconnected.
- This is normal for a mature page-based SPA but means changes require impact review.

**Recommendation:** Continue using the graph for impact analysis before edits.

## Summary

The application is operational and well-structured for a React front-end, but the primary gaps are around security posture, architecture documentation, and auth strategy. Those should be addressed before any large-scale feature or migration work.
