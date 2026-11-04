# Conventions

## Coding patterns
- React functional components are the default pattern
- Files use a mix of JSX and JS module style
- Imports are explicit and route- or component-driven
- Default exports are used in several modules
- Utility and auth logic are kept separate from UI render logic

## Naming and structure
- PascalCase for React components and UI files
- lowercase directories for feature groupings (`pages`, `components`, `api`)
- state slices named by domain (`projects`, `jobs`)
- route constants kept in a single module (`src/routes/path.js`)

## Styling conventions
- MUI theme provider for global design system
- Emotion `Global` injection for global styles
- SCSS files for component-specific styling

## Domain conventions
- Locale strings are centralized in `src/constants/locale-strings.jsx`
- Reusable `NoListAvailableYet`, `Loader`, and list-card components are used to standardize empty/loading states
- Request shaping and filtering logic is centralized in slice thunk params

## Observed gaps
- No formal TypeScript type enforcement or strict typing model
- No editorconfig or explicit formatting policy file detected
- No architecture or security policy documentation is forcing conventions beyond code style
