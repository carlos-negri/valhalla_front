# Source Files Overview (src/)

This document summarizes each file/folder under `src/` and explains its purpose, current behavior, and any notable implementation details or TODOs. ⚡️

---

## Top-level folders

- **`app/`** — Expo router pages (app routes). Each file here becomes a route in the app.
- **`components/`** — Reusable UI components (Header, Sidebar, Input, Button, Cliente component).
- **`contexts/`** — React Context providers and hooks for app state (Auth, Cliente, Agendamento, Caixa).
- **`mocks/`** — Local mock data used in development (agendamentos, caixa).
- **`services/`** — Shared services such as API client and storage abstraction.

---

## `src/app/` (routes)

- `index.tsx` — **Login screen** (route `/`). Handles user sign-in via `api.post('/login')`, writes token/user to storage, and uses `AuthContext.signIn`.
- `dashboard.tsx` — **Dashboard page** (route `/dashboard`). Simple welcome screen and drawer access.
- `lista.tsx` — **Agendamentos list page** (route `/lista`). Lists scheduled services using `useAgendamentos()` and shows `Header` + `Sidebar`.
- `agendar.tsx` — **Agendar (schedule) page** (route `/agendar`). UI to choose client, service, date and time. Implements 30-minute interval generation and disallows scheduling less than 30 minutes from now; dynamically falls back if native date/time picker is missing.
- `caixa.tsx` — **Caixa (cash flow) page** (route `/caixa`). Shows transactions and computed `saldo`, and provides test buttons to add entrada/saída using `useCaixa()`.
- `mocks/` (thin re-export stubs) — Re-exports real mocks from `src/mocks` to avoid expo-router treating them as pages.
- `services/` (thin re-export stubs) — Re-exports `api` and `storage` from `src/services` for compatibility.
- `contexts/` (thin re-export stubs) — Re-exports context hooks/providers from `src/contexts` to avoid router warnings.
- `_layout.tsx` — **Root layout / auth gate**. Wraps the app with context providers: `AuthProvider`, `SafeAreaProvider`, `ClienteProvider`, `AgendamentoProvider`, `CaixaProvider`. Contains `AuthGate` which waits for auth load state.

---

## `src/components/`

- `Header/index.tsx` & `Header/styles.ts` — Top header component with menu button and title.
- `Sidebar/index.tsx` & `Sidebar/styles.ts` — Sliding overlay menu with navigation items (Dashboard, Agendamentos, Caixa, Agendar) and Logout. Now scrollable and accessible.
- `Button/index.tsx` & `Button/styles.ts` — Generic button component used across screens.
- `Input/index.tsx` & `Input/styles.ts` — Styled `TextInput` wrapper used throughout forms.
- `Cliente.tsx` — Small component related to client display/selection (app-specific usage).

---

## `src/contexts/`

- `AuthContext.tsx` — Authentication provider and hook. Persists token and user via `src/services/storage`, sets `api.defaults.headers.Authorization` and tries to validate session with `/dashboard`. On failure it falls back to stored user if available. Exposes `{ user, loading, signIn, signOut }`.
- `AgendamentoContext.tsx` — Holds agendamentos, initialised with mock data from `src/mocks/agendamentos`. Exposes `agendamentos` and `adicionarAgendamento()`.
- `CaixaContext.tsx` — Holds caixa transactions (mocked initial state). Computes `saldo` and exposes `adicionarTransacao()` for adding entries/exits.
- `ClienteContext.tsx` — Lightweight client store used by pages and `Sidebar` (exposes `nome`, `setNome`, `logout`).

---

## `src/mocks/`

- `agendamentos.ts` — Example agendamento(s) used for local development and initial UI population.
- `caixa.ts` — Example caixa transactions used as initial data for `CaixaContext`.

---

## `src/services/`

- `api.ts` — Axios instance configured with `baseURL: 'http://192.168.1.12:8000/api'`. Used by auth and other API calls. 🔧 Note: current backend returns 404 for base path in dev; verify the backend host/port when testing.
- `storage.ts` — Abstraction over persistent storage: uses `expo-secure-store` when available, and falls back to `localStorage` on web. Exposes `setItem`, `getItem`, `deleteItem` as async functions for cross-platform durability.

---

## Notable design decisions & TODOs ⚠️

- Many non-route modules were moved out of `src/app` to avoid expo-router treating them as pages. App-level re-export stubs exist to avoid router warnings while keeping imports working.
- `Agendar` has a graceful fallback if `@react-native-community/datetimepicker` is not installed — this prevents crashes on some platforms.
- `AuthContext` catches `/dashboard` errors and tries to recover the stored `user` for a better UX when the backend is unstable.
- TODO: remove the `src/app` re-export stubs after final verification and ensure there are no accidental route files left in `app/` (this will remove confusion and stray runtime warnings).
- TODO: verify the backend endpoints with a running API to validate login/session flows.

---

If you'd like, I can:
- Generate a more detailed per-file documentation (including exported types & function signatures) ✅
- Add quick links to relevant files and open suspicious files for review 🔍

Would you like the more detailed version (with types + example usage), or is this high-level map enough for now?