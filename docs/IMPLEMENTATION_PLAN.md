# MJ Studios — Golf Ville Resort Suites: Concept Prototype

**Implementation plan** · Author: Claude (architect/reviewer) · Implementer: Antigravity (`agy`) · Research date: 2026-10-25

> Status: private sales concept by MJ Studios. **Not commissioned, not official, not for production deploy.** Every fact below is labelled **[V]** verified by me in this session, **[L]** reported only by third-party listings (unverified), **[I]** inferred, or **[?]** open question.

---

## 1. Executive summary

We will build a single-page, mobile-first React 19 + TypeScript (strict) + Vite site in plain CSS (design tokens + CSS Modules), with no UI framework and no animation library. Content, contact configuration, image metadata and inquiry delivery live in typed modules, separate from presentation (SOLID applied through module boundaries, not class hierarchies).

The memorable idea is the **Aerial Atlas**: the hero is the one genuine aerial photograph of the property, annotated with a few labelled points (dunes, golf course, lake, pools, buildings) that are visibly present in the photo. It is honest (nothing invented), specific to this property, and gives us the single orchestrated motion moment. Everything else stays quiet: forest-green/sand surfaces, a refined serif, generous whitespace, photography doing the work.

Hard constraints that shape the build:

- The only usable source images are low resolution (max 1024 px wide; Omnibees serves one size regardless of URL — probed [V]). The layout therefore caps photo display widths near native size and never full-bleeds a 1024 px image on a 1440 px+ screen. Requesting originals from the client is approval item #1.
- No image has confirmed reuse rights. A typed asset manifest carries rights status; a build guard blocks a production build while any displayed asset is unapproved.
- No verified accommodation inventory, rates, policies or facility list exists. The accommodation section is a designed concept layout fed by typed data with `verified: false` fields, never invented specifics.
- The inquiry form prepares a WhatsApp message (and mailto fallback). It never claims availability, price or booking.

## 2. Business and presentation objectives

| Goal | How the prototype shows it |
|---|---|
| Memorable first impression | Aerial Atlas hero, single choreographed load sequence |
| Authentic imagery | Only real property photos, each with source + rights metadata |
| Cohesive proposed identity | Token system, provisional palette/type, text wordmark |
| Clear inquiry path | Header CTA, sticky mobile CTA, form → WhatsApp |
| Polished mobile | Mobile-first CSS, 44 px targets, light motion budget |
| Maintainable foundation | Typed content layer, small components, tested pure logic |
| Honest concept framing | Discreet "Conceito MJ Studios" tag, noindex, source credits |

Audience for the demo: the Golf Ville decision-maker, on a phone or laptop, in a meeting. Primary job of the page: make them say "this could be our site" and ask for a proposal.

## 3. Verified facts, inferred details, unresolved questions

**Verified by me [V]**

- Workspace `C:\Users\NOTEPS\Trabalho\Prototipos\GolfVille` was empty (no repo, no `package.json`, no assets, no git). Node v22.18.0, npm 10.9.3, `agy` installed.
- `https://golfvilleresortsuites.com.br`: `curl -I` over https and http both failed with *Could not resolve host* (DNS failure) at 2026-10-25 ~05:06 UTC, from this machine. The earlier lookup reported an "access error". This is an **observation, not proof** of expiry. Do not say the domain is expired.
- All 8 candidate image URLs returned HTTP 200 `image/jpeg`. Dimensions and content below were measured/viewed by me.
- `pt.hoteis.com` listing: fetch timed out. `booking.com` listing: page content did not come through. Omnibees search page is a JS app and was not inspected. **I did not read these three pages**, so nothing below claims their contents.

**Reported by listings only [L]** (from one web-search summary of aggregator results; not read at source)

- Address: Av. Oceano Índico, 255, Porto das Dunas, Aquiraz, CE.
- Golf course, outdoor pool, two outdoor tennis courts, fitness centre, sauna, steam room, restaurant, snack bar, playground, game room, free Wi-Fi in public areas.
- About 20 units, some with kitchens, some sleeping six. Sources disagree on details (e.g. basketball court).
- Expedia-family listing for this location is titled "Golf Ville **2M** Resort Apartamentos" — suggesting privately managed units under another operator's listing **[I]**.

**Visible in the photographs [V]** — usable as copy because the photo is the evidence: several interconnected pools with palm landscaping and a wooden footbridge; a lake with a gazebo and a kayak; a golf course (fairways, sand bunkers) bordering the buildings; dunes at the horizon; a beach and sea beside the pools; timber boardwalk with pergolas and lounge decks; a monumental golf-ball sculpture at the entrance; low-rise apartment buildings with tile roofs.

**Open questions [?]** — to ask the client

1. Is Golf Ville Resort Suites an operating business with an official site? Who owns the domain and the WhatsApp/email supplied?
2. Official name (Suites vs Apartamentos vs Resort Residence), logo, brand colours.
3. Which facilities are shared and open to all guests (tennis, fitness, sauna, restaurant, kayaks)?
4. Accommodation types, capacities, bed setups, photos, how reservations are actually taken.
5. Written permission and original high-resolution photos.
6. Relationship (if any) to Aquidabã / Costa do Mar / Plaza Praia. **Not used anywhere in the site.**

## 4. Source research and image-source inventory

Sources consulted: A hoteis.com (fetch timed out), B Booking.com (empty fetch), C Omnibees (JS app; image CDN reached directly), D official domain (DNS failure), plus one web search. Candidate images were fetched individually (8 files, no scraping) into the scratchpad for inspection only.

Observations on sources: Omnibees property id `17136` is labelled by the supplier as *Brisa do Golf at Golf Ville Resort Residence* — another operator's inventory page. Its photos mostly show shared grounds, but **no operator name or branding may appear on our site**. Expedia/Hotels.com CDN images are supplied by the listing operator under the platform's terms.

### Asset register

| Asset ID | Source page | Direct image URL | Intended section | Description | Verification status | Usage-rights status | Recommended treatment | Replacement / approval requirement |
|---|---|---|---|---|---|---|---|---|
| `aerial-pools-golf` | Omnibees (hotel 17136) | `https://media.omnibees.com/Images/17136/Property/0x657/1014655.jpeg?sizeCat=Keepratio` | Hero (Aerial Atlas), OG image | Aerial: pools with bridge, palms, lake and golf fairways, dunes, buildings. 1024×576 (16:9) | Shared grounds [V visual]; attribution to Golf Ville [I] from source labelling | Unknown | **Use** as hero in a framed, width-capped container with credit line | Needs originals ≥1920 px and written permission before any public use |
| `entrance-golf-ball` | Omnibees | `https://media.omnibees.com/Images/17136/Property/0x657/1014651.jpg?sizeCat=Keepratio` | Property introduction (inset), gallery | Entrance with golf-ball sculpture, palms, paved road. 500×375 (4:3), soft | Likely entrance [I]; no legible logo [V] | Unknown | **Use small** (≤500 px display) | Replace with client photo; confirm it is the official entrance |
| `pools-beach-aerial` | Omnibees | `https://media.omnibees.com/Images/17136/Property/0x657/1014660.jpeg?sizeCat=Keepratio` | Facilities (pools), gallery | Aerial: pool complex, footbridge, gazebo, landscaped gardens, beach and sea behind. 646×657 (~1:1), good quality | Shared grounds [V visual] | Unknown | **Use** square, ≤646 px display | Same as above |
| `pools-golf-view` | Omnibees | `https://media.omnibees.com/Images/17136/Property/0x657/1113211.jpeg?sizeCat=Keepratio` | Facilities (golf), accommodation concept ("view") | Elevated view over pools, palms, golf fairway and bunkers, buildings; sea on horizon. 664×657 (~1:1) | Shared grounds [V visual]; shot from an upper level, unit unknown [I] | Unknown | **Use**; caption must not say "from the apartment" | Same as above |
| `lake-kayak` | Omnibees | `https://media.omnibees.com/Images/17136/Property/0x657/1014672.jpeg?sizeCat=Keepratio` | Facilities (lake), gallery | Lake with gazebo and bridge, orange kayak foreground. 492×657 (3:4 portrait) | Lake [V visual, also visible in aerial]; kayak rental/offering not established [?] | Unknown | **Use**, portrait, ≤492 px display; caption says "Lago", never "passeio de caiaque" | Confirm whether kayaks are a guest activity |
| `pool-palms-wide` | Omnibees | `https://media.omnibees.com/Images/17136/Property/0x657/1014661.jpeg?sizeCat=Keepratio` | Property introduction, gallery wide | Fisheye view across pool, palm trunks, gazebo, footbridge. 1024×580 (16:9). Fisheye distortion | Shared grounds [V visual] | Unknown | **Use** as wide gallery tile (≤1024) | Same |
| `boardwalk-pergolas` | Hotels.com / Expedia CDN | `https://images.trvl-media.com/lodging/40000000/39670000/39665700/39665619/9dc012bc.jpg?impolicy=resizecrop&ra=fit&rw=598` | Gallery, Location intro | Timber boardwalk, pergola daybeds, tropical planting, warm light. 598×399 (3:2) | Shared grounds [V visual]; listing is "2M" operator [I] | **Restricted/unknown** (platform listing image) | **Use in gallery only, ≤598 px**, flagged | Highest-risk source: replace first |
| `unit-interior-living` | Hotels.com / Expedia CDN | `https://images.trvl-media.com/lodging/40000000/39670000/39665700/39665619/526500c0.jpg?h=800&impolicy=fcrop&quality=medium&w=1200` | Accommodation (optional) | Living room of one apartment: grey sofas, wall TV, curtain. 1200×800 (3:2). Dark, low-quality, amateur | **One specific unit of a third-party operator** [I]; not representative | Restricted/unknown | **EXCLUDE by default** (`included: false`). May be toggled for a clearly labelled "example unit" only | Replace with client's official unit photos |

Rejected on principle: images of other hotels/Beach Park/Fortaleza properties; any image showing another operator's logo.

## 5. Recommended image selections by section

| Section | Image(s) | Display rule |
|---|---|---|
| Hero | `aerial-pools-golf` | Frame max-width 1120 px (≈native ×1.1), `fetchpriority=high`, no upscaling beyond ×1.15 |
| Introduction | `pool-palms-wide` + `entrance-golf-ball` inset | Wide image 100% of text column; inset ≤500 px |
| Facilities | `pools-beach-aerial` (Piscinas), `pools-golf-view` (Campo de golfe), `lake-kayak` (Lago), `boardwalk-pergolas` (Caminhos e jardins) | 4 editorial compositions, mixed ratios, each ≤ native width |
| Accommodation concept | `pools-golf-view` re-cropped differently OR `unit-interior-living` if toggled | Never shown as a verified unit |
| Gallery | all included assets (7) | Masonry-like grid, varied ratios |
| OG / social | `aerial-pools-golf` | 1200×630 crop generated by script; noindex |

## 6. Image permission and approval status

- Confirmed reuse permission: **0 of 8**.
- Presentation mode (default): local copies served from `public/images/pending/`, each with visible small credit ("Foto de referência · fonte: …") in lightbox and gallery captions, concept tag in header/footer, `<meta name="robots" content="noindex, nofollow">`.
- Production mode (`VITE_ASSET_MODE=production`): `scripts/check-asset-rights.ts` exits non-zero if any *included* asset has `rights !== 'approved'`. This makes accidental public deploy of unlicensed imagery fail loudly.
- Resolution path: client supplies originals + written permission → operator drops files in `public/images/approved/`, flips `rights: 'approved'` and `source: 'client'` in the manifest. No component changes.
- AI-generated imagery: **not used.**

## 7. Proposed art direction and rationale

**Contemporary Tropical Resort — Editorial, Refined, Immersive, Conversion-Focused.** All brand choices below are **provisional**; refine once client brand guidelines exist.

**Concept: the Aerial Atlas.** Golf culture has the yardage book and course map: calm, precise, annotated. We borrow only that *annotation language* (fine leader lines, small labels pointing at real features) — no golf clichés, no flags/balls as decoration.

### Tokens

| Token | Value | Role | Notes |
|---|---|---|---|
| `--green-900` | `#173D32` | Primary dark surface, headings on light | Provisional |
| `--sand-200` | `#EDE2CE` | Alternate section surface | Provisional |
| `--paper-50` | `#F8F6F0` | Page background | Provisional |
| `--brass-500` | `#B79A62` | Hairlines, markers, focus accents on dark | **Not for text on light** (≈2.5:1) |
| `--brass-300` | `#D3BE90` | Brass text on `--green-900` | Passes AA large/normal on green; verify by test |
| `--charcoal-800` | `#222923` | Body text on light | Not pure black |
| `--green-700` | `#2A5A4A` | Hover/pressed on green surfaces | Derived |
| `--sand-400` | `#D8C8A8` | Borders on sand | Derived |

A unit test computes WCAG contrast for every text/background pair actually used and fails below 4.5:1 (3:1 for ≥24 px display text).

### Typography

- Display: **Newsreader** (variable, optical size axis), light-to-regular, tight tracking at display sizes, `font-variation-settings: "opsz"` high.
- UI/body: **Hanken Grotesk** (variable).
- Self-hosted via `@fontsource-variable/newsreader` and `@fontsource-variable/hanken-grotesk` (no Google Fonts request, better privacy/LCP). `font-display: swap`; preload only the display and body Latin subsets.
- Scale (fluid, `clamp`): display 3rem→6.5rem; h2 2rem→3.5rem; h3 1.375rem→1.75rem; body 1.0625rem/1.65; small 0.875rem. Body measure ≤ 62ch (sans), serif lede ≤ 58ch.
- Rules from the design brief: **no ALL-CAPS labels, no single-word italic accent in headlines, no numbered eyebrows, no "→" suffix on buttons, no card-grid-of-identical-cards**. Structure devices (leader lines, rules) only where they encode information.

### Layout principles

- Left-aligned text, asymmetrical compositions, deliberate whitespace.
- Radius: 2 px on photography, pill (999px) only on the CTA — two radii, with meaning (images are cut, actions are soft).
- Shadows: none. Depth comes from overlap and tone changes.
- Wordmark: text "Golf Ville" in Newsreader with "Resort Suites" in Hanken, set small. No invented logo. Concept tag: "Conceito MJ Studios" at 12 px in header end/footer.

Hero wireframe (≥1024 px):

```
┌──────────────────────────────────────────────────────────────┐
│ Golf Ville  Resort Suites     Propriedade  Acomodações  Galeria   PT EN ES  (Fazer consulta) │
├──────────────────────────────────────────────────────────────┤
│  Seu próximo momento         ┌───────────────────────────┐   │
│  de tranquilidade            │  AERIAL PHOTO (frame)      │   │
│  começa aqui.                │   ○ Dunas   ○ Campo de golfe│  │
│                              │      ○ Lago                │   │
│  Piscinas, jardins e o       │         ○ Piscinas   ○ Edifícios│
│  campo de golfe, em Porto    └───────────────────────────┘   │
│  das Dunas, Aquiraz (CE).     legend: Dunas · Campo · Lago … │
│  (Fazer consulta)  Ver a propriedade                         │
└──────────────────────────────────────────────────────────────┘
```

Mobile (<768 px): photo first (4:3 crop, `object-position: 30% 50%`), headline below, legend as a plain text list (markers hidden), sticky bottom CTA bar appears after hero.

**Self-review against "generic default" checklist** (done before finalising): cream+terracotta → avoided (green-led, brass only as hairline); dark+acid accent → no; broadsheet columns → no; identical rounded cards → accommodation/facilities are bespoke compositions, not a card grid; tracked uppercase eyebrows → banned; one-word headline accent → banned. Revision made: the original draft had fade-up on every section; replaced with one hero sequence + reveal only on facilities imagery and gallery.

## 8. Information architecture and page section hierarchy

Single page, anchors `#propriedade`, `#estrutura`, `#acomodacoes`, `#galeria`, `#localizacao`, `#consulta`, `#perguntas`. One `<h1>` (hero), one `<h2>` per section, `<h3>` for items.

1. `SiteHeader` (skip link first) — wordmark, nav, `LanguageSwitcher`, CTA.
2. `HeroSection` (Aerial Atlas)
3. `PropertyIntroduction`
4. `FacilitiesShowcase`
5. `AccommodationSection`
6. `PropertyGallery` + `LightboxGallery`
7. `LocationSection`
8. `InquirySection` (`InquiryForm`)
9. `FAQSection`
10. `SiteFooter`
11. `ConceptNotice` (header tag + footer paragraph; no full-width banner)

### Copy (PT-BR default; keep as data, not in JSX)

- Hero h1: "Seu próximo momento de tranquilidade começa aqui." *(proposal, pending approval)*
- Hero lede: "Piscinas, jardins e o campo de golfe, em Porto das Dunas, Aquiraz (CE)." *(wording [V] from photos + [L] location)*
- Hero CTAs: "Fazer consulta" / "Conhecer a propriedade"
- Intro h2: "Um lugar organizado em torno do verde e da água". Body: "Em Porto das Dunas, o Golf Ville se desenha entre piscinas, palmeiras e áreas de jogo. Dos caminhos de madeira ao lago, o espaço é aberto e pensado para andar sem pressa." (Photo-supported; no amenity or service claims.)
- Facilities h2: "Áreas para ficar" — items: *Piscinas* ("Vários espelhos d'água ligados por passarelas e jardins."), *Campo de golfe* ("Os edifícios ficam à beira de um campo de golfe."), *Lago* ("Um lago com decks e área de descanso."), *Caminhos e jardins* ("Decks de madeira, pérgolas e vegetação tropical."). Caption suffix for each: "Foto de referência".
- Accommodation h2: "Acomodações". Lede: "Apartamentos dentro do condomínio. Tipos, capacidades e fotos serão apresentados aqui assim que o hotel confirmar o inventário." Rendered as a composed layout (large photo + a quiet spec table whose rows read "A confirmar") — **short**, not a page of placeholders.
- Inquiry h2: "Conte sobre a sua viagem". Helper: "Este formulário não consulta disponibilidade nem confirma reservas. Ele abre uma conversa no WhatsApp com os dados preenchidos."
- Button: "Abrir conversa no WhatsApp"; toast/status: "Conversa aberta no WhatsApp" (same verb as the button). Fallback link: "Enviar por e-mail".
- Footer: "Protótipo de conceito criado pela MJ Studios. Não é o site oficial do Golf Ville Resort Suites." EN/ES translations of everything above in `i18n/en.ts`, `i18n/es.ts` (shorter, same keys).

## 9. Interaction and animation specification

Timing/easing tokens: `--ease-out: cubic-bezier(.22,.61,.36,1)`; `--ease-in-out: cubic-bezier(.65,0,.35,1)`; durations `--dur-1: 150ms` (press), `--dur-2: 280ms` (hover/nav), `--dur-3: 600ms` (reveals), `--dur-4: 900ms` (hero). Animate only `transform` and `opacity` (and `clip-path` for image wipes).

| # | Motion | Priority | Implementation |
|---|---|---|---|
| 1 | **Hero Atlas sequence**: photo wipes in (`clip-path` inset → 0, 900 ms), headline lines rise 12 px/fade (staggered 80 ms), then hotspots appear one by one with their leader line drawing (`stroke-dashoffset`) | P0 — the one orchestrated moment | CSS keyframes, `.is-ready` class set after image `decode()`; max 1.6 s total |
| 2 | Header: transparent over hero → solid paper background after 48 px scroll; hides nothing, no layout shift | P0 | `useScrollState` (IntersectionObserver sentinel, not scroll listener) |
| 3 | Mobile menu panel: opacity/translate 280 ms, focus trap, Esc | P0 | `<dialog>`-like disclosure with `aria-expanded` |
| 4 | Buttons: hover tone shift, press `scale(.98)` 150 ms, visible focus ring (brass on dark, green on light) | P0 | CSS |
| 5 | Lightbox: native `<dialog>`, fade + scale .98→1, 280 ms; arrow-key/Swipe nav; focus returns to trigger | P0 | `LightboxGallery` |
| 6 | Hotspot hover/focus: marker ring grows, matching legend item highlights (and vice versa) | P0 | shared `activeId` state |
| 7 | Facilities images: clip-path reveal once, on intersect | P1 | `useInView` (once) |
| 8 | Gallery items: staggered fade (≤6 items, 60 ms step) | P1 | CSS `--i` index var |
| 9 | Desktop image hover: `scale(1.03)` over 600 ms inside `overflow:hidden` | P1 | `@media (hover:hover)` |
| 10 | Hero parallax: photo `translateY` up to 24 px via CSS `animation-timeline: view()` | P2 — omit if risky | `@supports` only |
| 11 | Language switch crossfade | P2 — omit | — |

Rules: a global `@media (prefers-reduced-motion: reduce)` neutralises (1)(7)(8)(9)(10): content simply appears; hotspots visible immediately. Content is visible without JS-driven classes (reveals are progressive: elements default visible, hidden only after `useInView` marks the page `.js-motion` and the element is below the fold). No scroll-jacking. Mobile: disable (9) and (10); keep (1) shorter (600 ms).

## 10. React component architecture

Hooks (all in `src/hooks`): `useReducedMotion`, `useInView(once)`, `useScrollState(thresholdSentinel)`, `useFocusTrap` (only if not using `<dialog>`), `useLightbox(items)`, `useActiveHotspot`.

| Component | Responsibility | Props (narrow) |
|---|---|---|
| `App` | Compose sections; providers | — |
| `SiteHeader` | Nav, language switcher, CTA, mobile menu | `navItems`, `onInquiry` |
| `LanguageSwitcher` | Locale buttons (`aria-pressed`) | `locale`, `locales`, `onChange` |
| `HeroSection` | Headline, CTAs, `AerialAtlas` | `content`, `image` |
| `AerialAtlas` | Photo frame, SVG leader lines, hotspots, legend | `image`, `hotspots` |
| `PropertyIntroduction` | Intro text + 2 images | `content`, `images` |
| `FacilitiesShowcase` | Editorial compositions | `facilities` |
| `AccommodationSection` | Concept layout from typed data | `types`, `image` |
| `PropertyGallery` | Grid, opens lightbox | `items`, `onOpen` |
| `LightboxGallery` | `<dialog>`, keyboard + swipe nav | `items`, `index`, `onClose`, `onIndexChange` |
| `LocationSection` | Address text, map link | `address`, `mapUrl` |
| `InquiryForm` | Fields, validation, submit via channel | `channel: InquiryChannel`, `onSent` |
| `FAQSection` | Disclosure list (`<details>`) | `items` |
| `SiteFooter` | Contact, notices | `contact`, `notices` |
| `ResponsiveImage` | `<picture>` AVIF/WebP, srcset, dimensions, alt, placeholder colour, credit | `asset`, `sizes`, `priority?` |
| `Button`, `Container`, `Section` | UI primitives | focused |

**SOLID mapping**

- **S**: `content/` (words), `config/` (contact & flags), `assets/` (image metadata), `services/inquiry/` (delivery), `components/` (presentation), `hooks/` (behaviour).
- **O**: add an accommodation = append to `content/accommodations.ts`; add an image = append to `assets/manifest.ts`; add a channel = new `InquiryChannel`. No component edits.
- **L**: every `InquiryChannel` returns the same `Result` contract; tests run the same contract suite against `whatsappChannel` and `mailtoChannel`.
- **I**: components receive only the data slice they render (e.g. `AerialAtlas` doesn't get the whole content object).
- **D**: `InquiryForm` depends on the `InquiryChannel` interface, injected from `config`; sections depend on `ImageAsset` and a `resolveImage(asset)` function, not on any provider URL.

## 11. Suggested file structure

```
GolfVille/
├─ docs/IMPLEMENTATION_PLAN.md
├─ public/
│  ├─ images/pending/*.webp|avif        (generated, rights unresolved)
│  ├─ images/approved/                  (empty; client assets later)
│  ├─ favicon.svg
│  └─ robots.txt                        (Disallow: /)
├─ scripts/
│  ├─ optimize-images.mjs               (sharp; run by Claude/dev, writes variants + json)
│  └─ check-asset-rights.ts
├─ src/
│  ├─ main.tsx  App.tsx  vite-env.d.ts
│  ├─ styles/ tokens.css  base.css  typography.css  motion.css
│  ├─ config/ site.ts  inquiry.ts
│  ├─ assets/ types.ts  manifest.ts  images.generated.json  resolveImage.ts
│  ├─ content/ types.ts  property.ts  facilities.ts  accommodations.ts  gallery.ts  faq.ts  hotspots.ts
│  ├─ i18n/ types.ts  I18nProvider.tsx  useI18n.ts  pt-BR.ts  en.ts  es.ts
│  ├─ services/inquiry/ types.ts  buildInquiryMessage.ts  whatsappChannel.ts  mailtoChannel.ts  validate.ts
│  ├─ hooks/ useReducedMotion.ts  useInView.ts  useScrollState.ts  useLightbox.ts
│  ├─ components/ui/ Button.tsx  Container.tsx  Section.tsx  ResponsiveImage.tsx  (+ .module.css)
│  ├─ components/layout/ SiteHeader.tsx  LanguageSwitcher.tsx  SiteFooter.tsx
│  ├─ components/sections/ HeroSection.tsx  AerialAtlas.tsx  PropertyIntroduction.tsx  FacilitiesShowcase.tsx  AccommodationSection.tsx  PropertyGallery.tsx  LocationSection.tsx  InquirySection.tsx  InquiryForm.tsx  FAQSection.tsx
│  ├─ components/gallery/ LightboxGallery.tsx
│  └─ test/ setup.ts
├─ index.html  vite.config.ts  tsconfig*.json  .oxlintrc.json  package.json
```

Stack decisions (no stack existed): Vite + React 19 + TS strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), CSS Modules + token CSS (no Tailwind: fewer deps, tighter art direction), `lucide-react` only for ~6 icons, Vitest + Testing Library + jsdom, oxlint (the Vite template linter; jsx-a11y plugin enabled), `sharp` (dev) for image variants. **No** animation library, router, i18n library, state manager, CMS, or backend.

## 12. Typed content and configuration model

```ts
// assets/types.ts
export type RightsStatus = 'approved' | 'unknown' | 'restricted';
export type AssetOrigin = 'client' | 'omnibees-gallery' | 'hotels-cdn';
export interface ImageAsset {
  id: string;                         // 'aerial-pools-golf'
  included: boolean;                  // false => never rendered
  sourcePage: string; sourceUrl: string;
  origin: AssetOrigin;
  rights: RightsStatus;
  subject: 'shared-grounds' | 'specific-unit' | 'entrance';
  width: number; height: number;      // intrinsic
  placeholderColor: string;           // from optimize script
  alt: Record<Locale, string>;        // describes only what is visible
  caption?: Record<Locale, string>;
  credit: string;                     // "Foto de referência · Omnibees"
}

// config/site.ts
export interface ContactConfig {
  whatsappE164: string;               // '5585991085454'
  email: string;                      // 'comercial@golfvilleresortsuites.com.br'
  verified: false;                    // literal: flips only with client confirmation
}
export const siteConfig = { name, locale: 'pt-BR', contact, assetMode, flags: { showFaq: true, showUnitInterior: false } } as const;

// content/accommodations.ts
export interface AccommodationType {
  id: string;
  name: Localized;
  verified: boolean;
  facts: { label: Localized; value: Localized | 'pending' }[];
  imageId?: string;
}

// content/hotspots.ts — percentages of the hero image
export interface Hotspot { id: string; label: Localized; x: number; y: number; labelSide: 'left'|'right'; }
```

Initial hotspots on `aerial-pools-golf` (percent of image, tune after visual check): `dunes` (28,15,right), `golf` (36,29,right), `lake` (22,36,left), `pools` (50,70,right), `buildings` (70,24,left). Labels: Dunas, Campo de golfe, Lago, Piscinas, Edifícios.

`Localized = Record<'pt-BR'|'en'|'es', string>`. Missing EN/ES keys fail type-checking (no silent fallbacks).

## 13. Inquiry and WhatsApp behaviour

```ts
export interface InquiryInput { name: string; checkIn: string; checkOut: string; adults: number; children: number; notes?: string; locale: Locale; }
export type InquiryResult = { ok: true; url: string } | { ok: false; errors: Partial<Record<keyof InquiryInput, string>> };
export interface InquiryChannel { readonly id: string; prepare(input: InquiryInput): InquiryResult; }
```

- `buildInquiryMessage(input)` — pure, localized, e.g. "Olá! Gostaria de informações sobre uma estadia de 12/03/2027 a 15/03/2027 para 2 adultos e 1 criança. Nome: Ana." No price/availability words.
- `whatsappChannel`: `https://wa.me/${e164}?text=${encodeURIComponent(msg)}`. Opens in new tab with `rel="noopener noreferrer"`.
- `mailtoChannel`: `mailto:` with subject/body — shown as secondary link.
- Validation (`validate.ts`): name required; dates required, `checkOut > checkIn`, `checkIn >= today`; adults 1–10; children 0–10; inline errors linked via `aria-describedby`, error summary focuses first invalid field.
- `ContactConfig.verified === false` → small notice under the form: "Número de demonstração. Será confirmado com o hotel." Number is overridable via `VITE_INQUIRY_WHATSAPP` / `VITE_INQUIRY_EMAIL` (no secrets; both are public contact data).
- No data is stored or sent anywhere except the user's own WhatsApp/mail client. No payment/ID fields.

## 14. Responsive design specification

Breakpoints (min-width): 480, 768, 1024, 1280, 1600. Container max 1200 px, gutters 16/24/40 px.

- **Hero:** <768 stacked (photo 4:3 first); 768–1023 stacked with photo wide; ≥1024 two-column grid (5/7), frame max-width 1120 px.
- **Facilities:** <768 single column; ≥768 asymmetric 12-column compositions alternating text/image sides; image widths capped to native.
- **Gallery:** 2 columns <768 (CSS columns), 3 columns ≥1024; items keep intrinsic aspect ratio.
- **Header:** 64 px mobile / 80 px desktop; menu button ≥44×44; sticky CTA bar on mobile appears after hero, respects `env(safe-area-inset-bottom)` and adds `scroll-padding-top` to anchors.
- Form: single column mobile, date fields side-by-side from 480.
- Use `dvh`/`svh`, not `vh`. No horizontal scroll at 320 px. Test widths: 320, 375, 414, 768, 1024, 1440, 1920.

## 15. Performance, accessibility, SEO, security

**Performance:** AVIF + WebP + JPEG fallback via `<picture>`; widths only up to intrinsic size; explicit `width/height`; `placeholderColor` background to avoid flash; hero `fetchpriority="high"` + `<link rel="preload" as="image">`; below-fold `loading="lazy" decoding="async"`; fonts self-hosted, 2 files preloaded; JS budget ≤ 90 kB gz, CSS ≤ 25 kB gz; target Lighthouse mobile ≥ 90 perf, ≥ 95 a11y/SEO/best-practices on throttled 4G. Lightbox code lazy-loaded (`React.lazy`).

**Accessibility:** skip link, landmarks, one `h1`, visible focus ring, `prefers-reduced-motion`, 4.5:1 contrast (tested), 44 px targets, lightbox via native `<dialog>` (Esc, focus return, `aria-label`, arrow keys, counter announced with `aria-live="polite"`), hotspots are `<button>`s with labels and are mirrored by the legend list, form errors announced, `lang` attribute updated on locale change, alt text describes visible content only ("Vista aérea de piscinas ligadas por uma passarela de madeira, com palmeiras e um lago ao fundo").

**SEO/metadata:** `<title>Golf Ville Resort Suites · Conceito de site | MJ Studios</title>`; description in PT-BR; `noindex, nofollow`; Open Graph title/description + `og:image` generated 1200×630 — flagged as a private preview (`og:type=website`). JSON-LD **omitted** (would assert unverified business data).

**Security/privacy:** no keys or tokens; no analytics; no third-party iframes/embeds (map is an outbound link); `rel="noopener noreferrer"`; strict `Content-Security-Policy` meta (default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline' only if needed); contact data only from config; third-party images are copied locally (no hotlinking → no tracking, no breakage).

## 16. Implementation phases in dependency order

| Phase | Owner | Output | Gate |
|---|---|---|---|
| 0 Scaffold | **Claude** (agy cannot run commands) | Vite project, deps, configs, images downloaded + optimized, `images.generated.json` | `npm run build` passes on empty shell |
| 1 Foundation | agy run 1 | tokens/base/typography/motion CSS, config, assets manifest, content model, i18n, hooks, UI primitives | `tsc`, lint |
| 2 Services + tests | agy run 2 | inquiry service, validate, message builder, contrast test, unit tests | `vitest` green |
| 3 Hero + header | agy run 3 | `SiteHeader`, `HeroSection`, `AerialAtlas`, `LanguageSwitcher` | build + visual check at 3 widths |
| 4 Story sections | agy run 4 | Introduction, Facilities, Accommodation | build + visual |
| 5 Gallery + lightbox | agy run 5 | `PropertyGallery`, `LightboxGallery` | interaction tests |
| 6 Conversion + footer | agy run 6 | Location, InquiryForm/Section, FAQ, Footer, metadata | form tests |
| 7 Polish + QA | Claude (+ agy fixes) | screenshots at 320/375/768/1440, a11y pass, perf pass, rights guard check | acceptance criteria |

Cut order if time runs out: motion #10/#11, ES copy, FAQ, lightbox swipe, motion #8.

## 17. File-by-file change plan

Repository was empty → every file below is **new**; no existing file is modified. See §11 for paths. Notable responsibilities:

- `src/styles/tokens.css`: colour/type/space/radius/duration variables from §7/§9.
- `src/styles/motion.css`: keyframes + reduced-motion override.
- `src/assets/manifest.ts`: the 8 assets from the register, `included:false` for `unit-interior-living`.
- `src/assets/resolveImage.ts`: `resolveImage(asset, width) → {avif, webp, jpg, srcSet}` using `images.generated.json`.
- `src/components/ui/ResponsiveImage.tsx`: the only place that renders `<img>`/`<picture>`.
- `src/services/inquiry/*`: pure and framework-free.
- `src/components/sections/AerialAtlas.tsx`: percent-positioned `<button>`s over a relatively positioned frame; SVG leader lines in `viewBox="0 0 100 56.25"`.
- `scripts/check-asset-rights.ts`: imports manifest, exits 1 in production mode on unapproved included assets (wired as `prebuild:production`).
- `index.html`: title, description, robots, OG, CSP, font/hero preloads.

## 18. Testing and verification strategy

- **Unit (Vitest):** `buildInquiryMessage` (3 locales, singular/plural), `validate` (date ordering, bounds), channel contract suite (both channels), `resolveImage`, contrast tokens, `check-asset-rights` logic, manifest invariants (every included asset has alt in 3 locales, credit non-empty).
- **Component (Testing Library):** `InquiryForm` (errors, focus on first invalid, URL produced), `LightboxGallery` (open, arrows, Esc, focus returns; jsdom `HTMLDialogElement.showModal` polyfilled in `test/setup.ts`), `LanguageSwitcher`, `SiteHeader` mobile menu.
- **Static:** `tsc -b`, `oxlint` (jsx-a11y), `vite build`.
- **Browser (Claude):** screenshots at 320/375/768/1440, reduced-motion emulation, keyboard-only walkthrough, Lighthouse mobile, `npm run build:production` must **fail** (proves the guard).

## 19. Preview and presentation checklist

- [ ] Concept tag visible, footer notice present, `noindex` verified in built HTML.
- [ ] Every photo carries credit/rights metadata; none described as "official".
- [ ] Hotspot positions visually matched to the real photo features.
- [ ] No price, availability, review, statistic, or policy text anywhere.
- [ ] No mention of Aquidabã / Costa do Mar / Plaza Praia / Beach Park / Brisa do Golf / "2M".
- [ ] WhatsApp number flagged unverified; test message opens correctly.
- [ ] Phone-in-hand demo rehearsed on the real device.
- [ ] Not deployed publicly; if shared, use an access-protected or unlisted preview link.

## 20. Risks, constraints, fallbacks

| Risk | Impact | Fallback |
|---|---|---|
| Low-res sources look soft on big screens | Weak premium feel | Width caps, framed hero, no full-bleed, soften with consistent tone grade (CSS `filter: saturate(.96)` only) |
| Rights unresolved | Legal exposure | Guard script, local-only preview, credit lines, replace-first list: `boardwalk-pergolas`, `unit-interior-living` |
| Hotspots misalign on crop | Looks broken | Markers only ≥768 px with fixed aspect frame; legend always |
| Third-party listing facts conflict | Wrong claims | Copy limited to photo-evidenced statements |
| `<dialog>` quirks on older Safari | Lightbox failure | Feature-detect → fall back to inline modal with manual focus trap |
| agy cannot run commands | Unverified code | Claude runs every build/test/lint and sends targeted corrections |
| Domain/WhatsApp ownership unknown | Misrouted inquiries | `verified:false` notice + env override |

## 21. Acceptance criteria

1. `npm run build`, `npm run typecheck`, `npm run lint`, `npm test` all pass with zero errors.
2. `npm run build:production` fails with a message listing unapproved assets.
3. Page renders PT-BR by default; EN/ES switch every visible string (no raw keys).
4. Hero shows the aerial photo with five hotspots (≥768 px) and legend (all widths); hotspots are keyboard operable.
5. No horizontal scroll at 320 px; no layout shift after load (CLS < 0.05).
6. Reduced-motion: no animation runs, all content visible.
7. Lightbox: opens from gallery, arrows/Esc work, focus returns to trigger.
8. Form: invalid → inline errors; valid → opens `wa.me` URL with prefilled message; never states availability/price.
9. Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 (noindex excepted from SEO scoring), Best Practices ≥ 95.
10. Contrast tests pass; no AI-default tells listed in §7.
11. Asset manifest complete; `unit-interior-living` not rendered.
12. No dependencies beyond those listed in §11.

---

## 22. Antigravity handoff prompt (copy-ready)

```
You are implementing a private concept website prototype for MJ Studios: "Golf Ville Resort Suites" (Porto das Dunas, Aquiraz, Ceará, Brazil). It is NOT commissioned and NOT the official site.

STEP 0 — INSPECT FIRST
Inspect the repository before changing anything. Read docs/IMPLEMENTATION_PLAN.md fully, and any installed frontend-design / design skills. Follow the established stack and conventions in the repo (Vite + React + TypeScript strict, CSS Modules with design tokens, Vitest). Do not change files unrelated to the task, do not add dependencies that the plan does not list, do not replace the stack.

WHAT TO BUILD
A single-page, mobile-first site, Brazilian Portuguese by default with EN/ES secondary, implemented in the phases of section 16 of the plan, in order. Visual direction "Contemporary Tropical Resort — Editorial, Refined, Immersive, Conversion-Focused" with the Aerial Atlas hero (section 7), tokens from section 7, the motion system from section 9 (CSS-first, prefers-reduced-motion respected, no scroll-jacking), components from section 10, typed content/config from section 12, inquiry behaviour from section 13.

NON-NEGOTIABLE RULES
- Never invent facts, prices, availability, room types, capacities, reviews, statistics, policies, distances or group affiliations. Use only the copy in the plan (section 8) and photo-evidenced statements.
- Use only the real images registered in src/assets/manifest.ts (served locally from public/images/*). Keep source/rights metadata. Never describe an image as official. If a photo is missing, use another verified approved/pending photo or a clearly labelled placeholder — never silently substitute an unrelated hotel image. `unit-interior-living` stays excluded.
- Do not mention or use: Aquidabã, Costa do Mar, Plaza Praia, Beach Park, Brisa do Golf, "2M", or any other operator's name/branding.
- Do not build a booking backend, payment, accounts, CMS, analytics or third-party embeds. The inquiry form only prepares a WhatsApp message (and mailto fallback) from the single config module and must state that it does not check availability.
- Keep identifiers, comments and docs in English; customer copy in PT-BR/EN/ES from the i18n modules.
- Keep components small and modular (SOLID applied pragmatically as in section 10). Content and contact config stay outside presentation components.
- Accessibility: semantic HTML, one h1, skip link, visible focus, labelled form fields with linked errors, accessible lightbox (native <dialog>), 44px touch targets, 4.5:1 contrast.
- Avoid design tells: no ALL-CAPS labels, no single-word italic accents in headlines, no numbered eyebrows, no arrow glyph on buttons, no grid of identical cards, no gradients as decoration.

CHECKS
Run the project's typecheck, lint, tests and build and fix errors your changes caused. If your environment cannot run terminal commands, say so explicitly and list what remains to be run. Test the real page in browser viewports (320, 375, 768, 1440) where tooling permits, including reduced-motion and keyboard-only use.

ACCEPTANCE CRITERIA
The 12 criteria in section 21 of docs/IMPLEMENTATION_PLAN.md. Prioritise a polished, complete, working presentation over speculative features. Use the cut order in section 16 if time runs short.

FINAL REPORT
List: completed work per phase; remaining blockers; image-rights issues (which assets are still unapproved); facts that need client verification; any deviation from the plan and why.
```

---

## Appendix A. Implementation status (2026-10-25)

Built through phases 0–6 (Claude scaffolded/verified, `agy` wrote the source). Verified with real output: `tsc -b` clean, `oxlint` clean, `vitest` 54 tests / 22 files passing, `vite build` OK (JS 86.8 kB gzip, CSS 8.4 kB gzip), `npm run build:production` correctly **fails** listing 7 unapproved assets. Screenshots reviewed at 1440 px and a true 390 px viewport.

Deviations from the plan: oxlint (Vite template linter) instead of ESLint; Vitest configured inside `vite.config.ts`; hero photo is the only `priority` image; location section is typographic (no map, no photo).

Not yet done: Lighthouse run, real-device test, hover/keyboard walkthrough in a live browser, client-approved photos and copy.
