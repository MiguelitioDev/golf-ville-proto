# Golf Ville concept site

Private, uncommissioned sales prototype (MJ Studios). It is **not** the official Golf Ville Resort Suites website.

- Stack: Vite, React 19, TypeScript (strict), CSS Modules with design tokens, Vitest.
- Plan and status: [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).
- Image rights are unconfirmed. `npm run build:production` fails until every included asset is `approved` in `src/assets/manifest.ts`. `npm run build` is the presentation build.
- Contact data and address are unverified placeholders (`src/config/site.ts`).

## Scripts

```
npm run dev          # local dev server
npm run typecheck    # tsc -b
npm run lint         # oxlint
npm test             # vitest run
npm run build        # presentation build (noindex)
npm run build:production  # rights-guarded build
```
