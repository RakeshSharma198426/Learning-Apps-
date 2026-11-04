# Stack

## Overview
This repository is a Vite-based React 19 frontend that presents a dashboard for projects and jobs, backed by Azure AD authentication and a REST API.

## Runtime stack
- React 19.0.0
- Vite 6.3.1
- React Router DOM 7.5.1
- Redux Toolkit 2.8.2
- Axios 1.9.0
- MUI 7.1.0 and Emotion
- Sass for styling
- MSAL browser/react for Microsoft identity
- JWT decoding for token verification

## Build and tooling
- ESLint 9.22.0
- Jest 29.7.0
- Testing Library 16.3.0
- Playwright 1.64.1
- Vitest 3.1.3
- Azure Pipelines YAML at repository root

## Environment assumptions
The app relies on environment variables for:
- `VITE_MSAL_CLIENT_ID`
- `VITE_MSAL_TENANT_ID`
- `VITE_REDIRECT_URI`
- `VITE_POST_LOGOUT_REDIRECT_URI`
- `VITE_MSAL_ROLE`
- `VITE_MSAL_GROUP`
- `VITE_MSAL_API_SCOPE`
- `VITE_API_BASE_URL`
- `VITE_API_OCP_APIM_SUBSCRIPTION_KEY`

## Observed implementation shape
The app is a client-side SPA with protected routes, centralized auth, and Redux slices for async fetching of projects and jobs. The stack is modern but architecture remains page-centric rather than domain-driven.
