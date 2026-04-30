# RATA Boilerplate

Reusable frontend boilerplate for building RATA admin applications. It provides a ready-to-extend app shell with authentication guards, routing, API clients, reusable UI components, upload helpers, and common project conventions.

The app is built with Vite, React 18, TypeScript, React Router, TanStack Query, Axios, Tailwind CSS, twin.macro, and styled-components.

## Features

- Protected admin layout with sidebar navigation
- Login/logout and route guard helpers
- Example dashboard and user management screens
- Reusable UI primitives under `src/nui`
- Upload and upload-picture components
- Paginated table/card helpers
- REST API client with bearer token support
- GraphQL client and codegen script wiring

## Tech Stack

- **Runtime:** React 18 + Vite
- **Language:** TypeScript
- **Routing:** React Router
- **Server state:** TanStack React Query
- **Forms/validation:** React Hook Form, Zod
- **Styling:** Tailwind CSS, twin.macro, styled-components
- **UI libraries:** Radix UI, Ant Design, lucide-react, Iconify
- **HTTP:** Axios, graphql-request
- **Build target:** Vercel/static Vite build

## Getting Started

### Prerequisites

- Node.js 18 or newer
- pnpm

### Install dependencies

```bash
pnpm install
```

### Configure environment

Create or update `.env` in the project root with the API endpoint for your target app.

```bash
VITE_API_ENDPOINT=https://your-api.example.com/api
```

The codebase also contains helpers for these optional Vite variables:

```bash
VITE_APP_TITLE=
VITE_APP_URL=
VITE_APP_ENV=
VITE_MOCK_URL=
VITE_GQL_ENDPOINT=
VITE_GQL_UPLOAD_ENDPOINT=
VITE_GQL_CODEGEN_ENDPOINT=
VITE_MIDTRANS_IS_PRODUCTION=
VITE_MIDTRANS_CLIENT_KEY=
VITE_MIDTRANS_PAYMENT_REQUEST_URL=
```

Only configure the values needed by the feature you are running locally. Each new project can replace these with its own service URLs and integration keys.

### Start development server

```bash
pnpm dev
```

Vite is configured to run on `http://localhost:3001`.

### Build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

The preview script serves the app on `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Type-check and build the production bundle |
| `pnpm preview` | Preview the production build on port 3000 |
| `pnpm serve` | Start Vite on `0.0.0.0:8000` |
| `pnpm codegen` | Run GraphQL code generation when `codegen.ts` is available |

## Project Structure

```text
src/
  _app.tsx                 App providers, router, protected layout
  main.tsx                 React entrypoint
  api/                     REST API clients
  assets/                  Static TS/TSX assets and SVG components
  components/              App-level components, auth, uploads
  config/                  Shared configuration
  constants/               Shared option lists and constants
  features/                Feature modules and route definitions
    auth/
    dashboard/
    live/
    ready/
    user/
  libs/                    Shared clients such as query and GraphQL clients
  model/                   Shared models and validation schemas
  nui/                     Reusable internal UI components
  stores/                  Zustand stores
  styles/                  Global CSS and styled-components globals
  utils/                   Shared utilities
```

## Routing

Routes are assembled in `src/_app.tsx`.

- Public auth routes are loaded from `src/features/auth/routes.tsx`
- Protected routes use `ProtectedLayout` and `AppLayout`
- Dashboard and user routes are mounted under `/`
- Readiness/liveness routes are mounted separately

Authentication state is handled through helpers in `src/components/auth`. API requests automatically attach a bearer token when one is available.

## API Clients

- REST requests use `src/api/axiosInstance.ts`
- The REST base URL comes from `VITE_API_ENDPOINT`
- GraphQL requests use `src/libs/gql-client.ts`
- Uploads can use `VITE_GQL_UPLOAD_ENDPOINT`

## Path Aliases

TypeScript and Vite support aliases from `tsconfig.json`, including:

```text
@/*          -> src/*
@features/* -> src/features/*
@libs/*     -> src/libs/*
@nui/*      -> src/nui/*
@utils/*    -> src/utils/*
@gql/*      -> generated/gql/*
```

## Development Notes

- Keep feature-specific code inside `src/features/<feature>`.
- Put reusable app UI in `src/nui` or `src/components` depending on scope.
- Use the existing route module pattern when adding new pages.
- Prefer `@/`, `@features/`, `@nui/`, and other configured aliases over deep relative imports.
- Replace example features, navigation items, and API endpoints when starting a new RATA app.
- Run `pnpm build` before shipping changes.
