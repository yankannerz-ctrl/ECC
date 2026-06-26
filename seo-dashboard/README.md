# Website & SEO Dashboard

A dark-themed website analytics & SEO dashboard, built as a single-page React app.
Inspired by a Figma "Website & SEO Dashboard" reference design. All data is mock
data for demonstration — the UI is ready to be wired to real sources (GA4, Google
Search Console, Semrush, Ahrefs, Screaming Frog, PageSpeed Insights).

## Stack

- **React 18** + **Vite** — fast dev server & build
- **Tailwind CSS** — styling
- **Recharts** — line / bar / area / donut / composed charts
- **lucide-react** — icons

## Pages

| Section | Page | Highlights |
|---------|------|-----------|
| Website | **Overview** | Total visitors, leads, conversion, revenue, site speed, AI search visibility, device traffic, GSC summary |
| Website | **Page Speed** | Core Web Vitals trend, underperforming pages |
| SEO | **SEO Overview** | On-page score gauge, organic traffic, keyword buckets, backlinks, crawl status, issues |
| SEO | **SEO Audit** | Category cards + filterable all-issues table |
| SEO | **Search Console** | Clicks/impressions/CTR/position, dual-axis trend, top pages, top queries |
| SEO | **Backlinks** | Referring domains table with DA, link type & status |

## Getting started

```bash
cd seo-dashboard
npm install
npm run dev      # start dev server at http://localhost:5173
```

Build for production:

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Project structure

```
seo-dashboard/
├── index.html
├── src/
│   ├── main.jsx        # entry
│   ├── App.jsx         # layout: sidebar + topbar + routing
│   ├── ui.jsx          # shared components (Card, Delta, Badge, Metric…)
│   ├── data.js         # all mock data
│   └── pages/          # one file per dashboard page
└── tailwind.config.js
```

## Connecting real data

Replace the values in `src/data.js` with API responses. Each page reads from a
single exported object, so swapping mock data for live data is isolated to that
one module — no component changes required.
