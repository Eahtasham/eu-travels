# EU Travels

A premium travel-agency landing page built around a scroll-scrubbed video hero — as you scroll, the page plays through a plane-window sequence: cabin window → clouds → an emergent view of the Taj Mahal above the clouds.

**Live demo:** run locally with the steps below.

## Highlights

- **Scroll-scrubbed video background.** A fixed `<video>` element whose `currentTime` is driven by scroll position, eased and snapped to a 30fps frame grid, with a `prefers-reduced-motion`-safe fallback.
- **Legibility by design, not luck.** Text sits on a shifting photographic sky, so contrast is guaranteed with owned scrims and a soft text-glow halo rather than assumptions about what frame is behind it.
- **Scroll reveals that are visible by default.** Sections animate in on scroll via `IntersectionObserver`, but the unanimated state is always fully visible — no JS, no blank sections for crawlers or users with scripting disabled.
- **Thin glass surfaces.** Cards are a light frosted layer over the video, not an opaque wall, so the background stays part of the experience throughout every section.
- **Fluid, auto-fit responsive grids.** Card grids reflow by available width (`repeat(auto-fit, minmax(...))`) instead of hard breakpoint column counts, so they never strand an orphan card on its own row.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) for icons
- [Geist](https://vercel.com/font) (UI) + [Marcellus](https://fonts.google.com/specimen/Marcellus) (display) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    layout.tsx       Root layout, fonts, metadata
    page.tsx          All sections: hero, about, services, destinations, testimonials
    globals.css        Design tokens, glass/scrim utilities, motion system
  components/
    ScrollVideo.tsx    Scroll-scrubbed video background + loader
    Reveal.tsx          Visible-by-default scroll-reveal wrapper
public/
  plane-window.mp4     Source video for the scroll sequence
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
