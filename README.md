# Revelectrik Website — revelectrik.com

Official website source for [Revelectrik](https://revelectrik.com), hosted on Tilda.

## Structure

- `tilda-export/` — Current site pages exported via Tilda API
- `fleetpulse-page/` — FleetPulse product page content (Tilda HTML blocks)
- `assets/` — Custom assets (SVGs, diagrams, additional images)
- `docs/` — Documentation and marketing materials

## Products

1. **Solar Energy Collection & Charging System** — 2kWh solar-to-HV battery charging for commercial EVs
2. **FleetPulse CAN Bus Telemetry Platform** — Real-time vehicle intelligence from CAN bus to cloud dashboard

## Deployment

Pages are deployed through the Tilda editor. HTML blocks from `fleetpulse-page/` are pasted into Tilda's custom HTML blocks (T123/Zero Block).

See [TILDA-INTEGRATION-GUIDE.md](./TILDA-INTEGRATION-GUIDE.md) for step-by-step Tilda integration instructions.

## FleetPulse Page Sections

| File | Tilda Block | Description |
|------|-------------|-------------|
| `hero-section.html` | T123 | Page hero with headline and CTAs |
| `problem-section.html` | T123 | Three problem statement cards |
| `how-it-works-section.html` | T123 | 4-step pipeline |
| `features-grid.html` | T123 | 3×3 feature grid |
| `architecture-section.html` | T123 | SVG architecture diagram |
| `use-cases-section.html` | T123 | Tabbed use case panels |
| `tech-specs-section.html` | T123 | Specifications table |
| `pricing-section.html` | T123 | Three-tier pricing cards |
| `cta-section.html` | T123 | Final call to action |
| `products-landing-update.html` | T123 | Updated /ourproducts two-card layout |
| `home-hero-update.html` | T123 | Home page "Two Pillars" section |
| `architecture-diagram.svg` | Asset | Standalone SVG for pitch decks |
| `meta-seo.txt` | Page Settings | Tilda SEO metadata to paste |

## Related Repositories

- [telemetry-platform](https://github.com/subhasisrevelectrik/telemetry-platform) — FleetPulse source code (edge agent, backend, frontend, infra)
