# Aaron Douglas Next.js + Supabase starter

A small, reviewed baseline for authenticated Aaron Douglas client
applications. Repositories created from this template start with:

- Next.js App Router, React, TypeScript, and Tailwind CSS
- Supabase browser and server clients
- environment-variable examples without credentials
- lint, typecheck, development, and production scripts

## Start locally

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Add a local or hosted Supabase project URL and publishable key to
`.env.local`. Never commit service-role keys or provider credentials.

## Checks

```bash
pnpm exec playwright install --with-deps chromium   # once, before the first e2e run
pnpm verify                                         # lint, typecheck, unit tests, e2e
```

`pnpm verify` runs the same sequence as CI, so a green run locally predicts a green
pipeline. Individual steps are available as `pnpm lint`, `pnpm check` (Biome only),
`pnpm typecheck`, `pnpm test`, and `pnpm e2e`. `pnpm lint:fix` and `pnpm format` apply
fixes.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request against `main` and
`staging`, using the shared `.github/actions/setup` composite action (pnpm + Node 20 +
a frozen-lockfile install):

- **lint** — Biome, then ESLint
- **typecheck** — `tsc --noEmit`, then a production `next build`
- **test** — Jest with Testing Library
- **e2e** — Playwright against a real production server, gated on the three jobs above

The e2e job reads Supabase credentials from repository secrets when they exist and falls
back to safe defaults, so a fresh project from this template is green before any secret
is configured. Deploy steps are intentionally left out — add them to `ci.yml` once a
target is chosen.
