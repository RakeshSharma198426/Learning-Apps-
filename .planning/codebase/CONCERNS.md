# Concerns

## Security concerns
- Access token is stored in `sessionStorage` and used by the shared Axios interceptor
- MSAL redirect logic handles auth with direct window navigation and session cleanup
- No root-level `SECURITY.md` or threat model document exists
- No security scanning configuration is present at repository level

## Architectural concerns
- The app is page-centric and highly reliant on shared UI constants and route helpers
- `src/constants/locale-strings.jsx` is imported widely and behaves like a near-global contract
- Dashboard logic mixes concerns: route navigation, data orchestration, empty/loading states, and view composition

## Maintainability concerns
- Several flows still contain placeholder or debug logging (`console.log`) rather than implemented product actions
- The app lacks ADRs and architecture documentation, increasing the risk of drift in later changes
- No formal mandate or policy enforcement is codified in the repo

## Risk assessment
The project is functional and testable, but its main risk is the combination of auth complexity, minimal formal security documentation, and a fairly flat component structure. These are manageable risks if code changes continue with repository-level invariants and route/auth boundary reviews.
