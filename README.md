# Mohamed Abdelhamid — Portfolio

Personal portfolio for **Mohamed Mahmoud Abdelhamid**, Full-Stack AI Engineer (Cairo, Egypt).

Hand-written HTML, CSS and vanilla JavaScript. **No framework, no build step, no `node_modules`** — the
files you see are the files that ship.

## Run it locally

Any static server works. Pick one:

```bash
npx serve .                 # Node
python -m http.server 5173  # Python
```

Then open <http://localhost:3000> (serve) or <http://localhost:5173> (Python).

## Deploy to Vercel

```bash
npx vercel          # preview URL
npx vercel --prod   # production
```

`vercel.json` already sets clean URLs, long-lived caching for `/assets/*` and basic security headers.
No framework preset or build command is needed — choose **Other** if Vercel asks.

## Editing the content

Everything visible on the page is rendered from **[`assets/js/data.js`](assets/js/data.js)**.
Change the data, reload the page — no templates to touch:

| Export           | Controls                                              |
| ---------------- | ----------------------------------------------------- |
| `PROFILE`        | Name, title, rotating roles, contact links, hero stats |
| `PROJECTS`       | Every project card (`featured: true` = large card)     |
| `CATEGORIES`     | Filter chips and each card's accent hue                |
| `EXPERIENCE`     | The experience timeline                                |
| `SKILLS`         | Toolkit grid and the scrolling marquee                 |
| `PUBLICATIONS`   | Research section                                       |
| `EDUCATION`      | Education card in the About sidebar                    |
| `CERTIFICATIONS` | Certification list                                     |

### Adding a project

Append an object to `PROJECTS`:

```js
{
  id: "my-project",
  title: "Project title",
  category: "cv",          // cv | nlp | dsp | ds | eng
  year: 2026,
  featured: true,          // omit for a compact card
  badge: "93% mAP",        // optional ribbon
  blurb: "One or two sentences.",
  highlights: ["..."],     // featured cards only
  metrics: [{ value: "93%", label: "mAP" }],
  stack: ["PyTorch", "OpenCV"],
  links: [{ label: "Code", url: "https://github.com/...", kind: "code" }],
}
```

`kind` accepts `code`, `live` or `paper` — it picks the icon and styling.

## Structure

```
index.html              single page, all sections
assets/css/style.css    design tokens + every component
assets/js/data.js       all content
assets/js/main.js       rendering + interactions
assets/cv/              résumé PDF served by the download buttons
assets/img/             portrait, favicon
_legacy/                the previous HTML5UP template, kept for reference
```

## What's in it

- Dark/light theme, remembered in `localStorage`, defaults to the OS preference
- Animated neural-network canvas, drifting aurora gradients, scroll progress bar
- Scroll-reveal animations, typed role cycler, animated stat counters
- Filterable project grid with generated cover art (no per-project image files)
- 3D tilt portrait, pointer-tracking card glow
- Fully responsive with a mobile nav drawer
- SEO: Open Graph, Twitter cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`
- Accessibility: skip link, visible focus rings, ARIA on tabs and the menu, full
  `prefers-reduced-motion` fallback
- Installable as a PWA-style app via `site.webmanifest`, plus a print stylesheet

## Contact form

The form validates in the browser and then opens the visitor's mail client via `mailto:`, so there's
no backend and nothing to pay for. For real inbox delivery, replace the handler in `initForm()`
([`assets/js/main.js`](assets/js/main.js)) with a POST to Formspree, Resend or a Vercel function.

---

© Mohamed Mahmoud Abdelhamid
