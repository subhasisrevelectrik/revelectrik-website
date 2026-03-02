# Tilda Integration Guide — FleetPulse Product Page

Step-by-step instructions for integrating the FleetPulse HTML blocks into Tilda.

---

## Prerequisites

- Access to the Tilda editor for project: **Revelectrik** (ID: 9022251)
- All HTML files from `fleetpulse-page/` ready to copy/paste
- The GitHub repo cloned locally so you can open the files

---

## PART 1: Create the FleetPulse Product Page

### Step 1 — Create a new page in Tilda

1. Go to [tilda.cc](https://tilda.cc) → My Projects → **Revelectrik**
2. Click **+ Add page**
3. Set the page settings:
   - **Title:** FleetPulse
   - **Page URL (alias):** `ourproducts/fleetpulse`
   - **Description:** CAN Bus Telemetry Platform for Commercial EV Fleets
4. Click **Save**

### Step 2 — Set SEO metadata

1. In the page editor, click **SEO settings** (gear icon → SEO)
2. Copy values from `fleetpulse-page/meta-seo.txt`:
   - **Page title:** `FleetPulse: CAN Bus Telemetry for Commercial EV Fleets`
   - **Meta description:** `Real-time CAN bus telemetry from vehicle to cloud dashboard in <1 hour. Monitor battery health, motor performance & diagnostics for your EV fleet.`
   - **OG title:** `FleetPulse — Real-Time CAN Bus Telemetry for Commercial EV Fleets`
   - **OG description:** (from meta-seo.txt)
   - **OG image:** Upload a 1200×630px dashboard screenshot or export the architecture diagram SVG as PNG
3. Click **Save**

---

## PART 2: Add FleetPulse Page Sections (in order)

For **each section below**, do the following:

> **How to add a T123 Custom HTML block:**
> 1. In the page editor, click **+ Add block**
> 2. Search for **"HTML"** or scroll to **Other → T123**
> 3. Click the T123 block to add it
> 4. Click **Edit content** (pencil icon) on the block
> 5. Delete any placeholder text
> 6. Open the corresponding file from `fleetpulse-page/`, select all (Ctrl+A), copy
> 7. Paste into the T123 editor
> 8. Click **Save**

---

### Section 1 — Hero (hero-section.html)

**File:** `fleetpulse-page/hero-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** First block on the page

Content: Full-width dark hero with headline, sub-headline, "Book a Demo" + "View on GitHub" buttons, and 4 stats.

---

### Section 2 — Problem (problem-section.html)

**File:** `fleetpulse-page/problem-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Second block

Content: 3 dark cards — Blind Spots, OBD-II Isn't Enough, Vendor Lock-In. Fade-up animation on scroll.

---

### Section 3 — How It Works (how-it-works-section.html)

**File:** `fleetpulse-page/how-it-works-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Third block

Content: 4-step pipeline (Install → Capture → Stream → Visualize) with animated dashed connectors.

---

### Section 4 — Features Grid (features-grid.html)

**File:** `fleetpulse-page/features-grid.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Fourth block

Content: 3×3 grid of feature cards — 6 live features + 3 "Coming Soon" badges.

---

### Section 5 — Architecture Diagram (architecture-section.html)

**File:** `fleetpulse-page/architecture-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Fifth block

Content: Inline SVG architecture diagram showing full data flow from CAN Bus → Edge Agent → AWS → React Dashboard. Dark background, color-coded layers.

---

### Section 6 — Use Cases (use-cases-section.html)

**File:** `fleetpulse-page/use-cases-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Sixth block

Content: Three tabbed panels — Fleet Operators, Municipal Transit, Rental & Leasing. Vanilla JS tab switching.

**After pasting:** In the `<!-- INSERT: ... -->` placeholder areas, replace the placeholder SVG boxes with real dashboard screenshots once available.

---

### Section 7 — Tech Specs (tech-specs-section.html)

**File:** `fleetpulse-page/tech-specs-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Seventh block

Content: Specifications table with alternating row shading and monospace tech value tags.

---

### Section 8 — Pricing (pricing-section.html)

**File:** `fleetpulse-page/pricing-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Eighth block

Content: Three pricing tiers (Pilot, Growth, Enterprise). All CTAs say "Contact Us".

---

### Section 9 — CTA (cta-section.html)

**File:** `fleetpulse-page/cta-section.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Last block (just above footer)

Content: Final call to action — "Book a Demo" and "View Source on GitHub". Dark with radial glow.

**Note:** The `id="fp-cta"` anchor is used by several "Book a Demo" buttons throughout the page. Ensure this section exists.

---

## PART 3: Update the /ourproducts Page

### Step 1 — Open the ourproducts page in Tilda

1. Go to the Revelectrik project → click **Our Products** page
2. Open the page editor

### Step 2 — Find the existing products section

1. Scroll through the existing blocks to find the current product display section
2. If it shows only the solar product, add a new T123 block **below** the existing content OR replace the product section with the new two-card layout

### Step 3 — Add the two-product card layout

**File:** `fleetpulse-page/products-landing-update.html`
**Tilda block:** T123 (Custom HTML)

This creates a two-card grid showing both:
- Solar Energy Collection & Charging System
- FleetPulse CAN Bus Telemetry Platform

**Tip:** After pasting, replace the placeholder SVG icons with real product images by:
- In the HTML, find `<!-- INSERT: Real product image -->` comments
- Replace the `<svg>` placeholder with `<img src="YOUR_IMAGE_URL" alt="..." style="max-width:100%;height:auto;">`

---

## PART 4: Update the Home Page

### Step 1 — Open the main/home page

1. Go to Revelectrik project → click the **Revelectrik** (home) page
2. Open the page editor

### Step 2 — Add the "Two Pillars" section

**File:** `fleetpulse-page/home-hero-update.html`
**Tilda block:** T123 (Custom HTML)
**Position:** Add after the existing hero section, before the "About Us" section

This adds a two-column block highlighting:
- Solar Energy Collection & Charging (links to /ourproducts#solar)
- FleetPulse CAN Bus Telemetry (links to /ourproducts/fleetpulse)

---

## PART 5: Add FleetPulse to the Navigation Menu

### Step 1 — Open the site-wide navigation settings

1. In the Tilda project editor, click the **header/nav block** on any page
2. Click **Edit** → navigate to the nav block settings

### Step 2 — Add the new nav item

Option A — Simple link:
1. Add a new nav item: **"FleetPulse"** → URL: `/ourproducts/fleetpulse`
2. Place it under/after "OUR PRODUCTS"

Option B — Dropdown under "Our Products":
1. Make "Our Products" a dropdown parent
2. Add children:
   - "Solar Charging" → `/ourproducts#solar`
   - "FleetPulse" → `/ourproducts/fleetpulse`

---

## PART 6: Publish and Test

### Publishing checklist

```
[ ] FleetPulse page has all 9 sections in correct order
[ ] Page URL is: /ourproducts/fleetpulse
[ ] SEO metadata is filled in (title, description, OG)
[ ] /ourproducts page has the two-product card layout
[ ] Home page has the "Two Pillars" section
[ ] Navigation includes FleetPulse link
[ ] All "Book a Demo" buttons link to #fp-cta or /contactus
[ ] "View on GitHub" links to https://github.com/subhasisrevelectrik/telemetry-platform
[ ] Mobile layout tested (Tilda preview → mobile view)
```

### Testing steps

1. **Tilda preview** — Click "Preview" in the editor for each page
2. **Mobile test** — In preview, toggle mobile view (phone icon)
3. **Scroll animations** — Scroll down slowly; cards should fade in
4. **Tab switching** — On Use Cases section, click each tab
5. **CTA links** — Click "Book a Demo" → should scroll to or link to contact form
6. **GitHub link** — Click "View on GitHub" → should open in new tab
7. **Publish** — When satisfied, click "Publish" for each modified page

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Font looks different | TacticSans loads from Tilda CDN — it will render correctly when embedded in Tilda pages. In standalone HTML preview it may fall back to Arial. |
| Scroll animations don't fire | Ensure JavaScript is enabled. IntersectionObserver is supported in all modern browsers. |
| Cards overflow on mobile | Check that the T123 block has "full width" selected in Tilda block settings. |
| Tab content doesn't switch | Each T123 block is isolated — if JS isn't executing, check Tilda's "Allow custom HTML" setting in project settings. |
| Images show as placeholders | Replace SVG placeholder icons with real `<img>` tags pointing to uploaded Tilda images. |

---

## Security Note

The Tilda API keys (`TILDA_PUBLIC_KEY`, `TILDA_SECRET_KEY`) are **not** committed to this repository.
They were used locally to export the site and are stored only in:
- Your local terminal history (run `history -c` to clear)
- Your `.env` file if created (already in `.gitignore`)
