# Revelectrik Design System Analysis

Extracted from Tilda API export — Project ID 9022251 (revelectrik.com)

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#009dc9` | Buttons (primary BG), section accents, links |
| Bright Cyan | `#00eaff` | CTA button BG, highlight text, accent borders |
| Pure White | `#ffffff` | Section backgrounds (light), text on dark |
| Off-White | `#ebebeb` | Alternate light section BG, subtle dividers |
| Pure Black | `#000000` / `#000` | Dark section BG, text on light |
| Dark Gray | `#111` | Alternate dark section BG |
| Alert Red | `#e5194a` | Warning badges, alerts |

### FleetPulse Supplemental Colors
- **Teal Green:** `#00d4aa` — FleetPulse primary (complements brand cyan)
- **Deep Navy:** `#0a0f1a` — Dark page/card background
- **Card Dark:** `#111827` — Dark card surface
- **Blue (AWS):** `#3b82f6` — Architecture diagram edge layer
- **Amber (Cloud):** `#f59e0b` — Architecture diagram cloud layer

---

## Typography

### Primary Font
```css
font-family: 'TacticSans', Arial, sans-serif;
```
- **TacticSans** is Revelectrik's primary brand font (custom, loaded by Tilda)
- Fallback: Arial, sans-serif
- All headings and body text use TacticSans
- Headings are typically **UPPERCASE**

### Font Sizes
| Usage | Size |
|-------|------|
| Body / Body small | 15px |
| Body medium | 16px – 18px |
| Sub-heading | 20px – 22px |
| Section heading | 25px – 26px |
| Large heading | 40px |

---

## Button Styles

### Primary Button
```css
color: #009dc9;
background-color: #ffffff;
border-radius: 20px;
border-style: none;
box-shadow: none;
transition: background-color 0.2s, color 0.2s;
```

### Secondary / CTA Button
```css
color: #ffffff;
background-color: #00eaff;
border-radius: 7px;
border-style: none;
box-shadow: none;
transition: background-color 0.2s, color 0.2s;
```

### Ghost/Outline Button (FleetPulse)
```css
color: #00d4aa;
background-color: transparent;
border: 1.5px solid #00d4aa;
border-radius: 7px;
transition: background-color 0.2s, color 0.2s;
```

---

## Border Radius

| Element | Value |
|---------|-------|
| Primary buttons | 20px (pill-style) |
| Secondary buttons / cards | 7px – 10px |
| Feature cards | 10px |
| Small chips/badges | 25px (fully rounded) |
| Some sections | 0px (flush edge-to-edge) |

---

## Spacing & Layout

- Section padding: `80px 0` (top/bottom), `40px 0` on mobile
- Container max-width: 1200px, centered
- Grid gaps: 20px – 30px
- Card inner padding: 30px – 40px

---

## Navigation

```
[LOGO]  ABOUT US  |  OUR PRODUCTS  |  NEWSROOM  |  OUR TEAM  |  ADVISORS  |  [CONTACT US btn]
```
- All nav links UPPERCASE
- Background: dark (#000 / #111)
- Text: #ffffff
- Active/hover: #00eaff or #009dc9
- Contact button: white bg, #009dc9 text, 20px border-radius

---

## Section Patterns

### Dark Section
```css
background-color: #000;  /* or #111 */
color: #ffffff;
```

### Light Section
```css
background-color: #ffffff;  /* or #ebebeb */
color: #000000;
```

### Gradient Dark (used on hero)
```css
background: linear-gradient(135deg, #0a0f1a 0%, #000 60%, #001a22 100%);
```

---

## Card Component

```css
background: #111827;
border-radius: 10px;
padding: 30px 35px;
border: 1px solid rgba(0, 157, 201, 0.15);
transition: border-color 0.2s, transform 0.2s;
/* hover: */
border-color: #00d4aa;
transform: translateY(-4px);
```

---

## Animation Patterns

- Tilda's built-in: `tilda-animation-2.0.min.js` — fade-in on scroll
- Custom: IntersectionObserver for entrance animations
- Transition duration: `0.2s` (buttons), `0.3s` (cards)
- Keyframes: `fadeInUp` (translateY 20px → 0, opacity 0 → 1)

---

## Footer

- Dark background (#000 / #111)
- Logo + social links
- Legal text: #ebebeb, 13px
- Privacy policy link

---

## Tilda-Specific Classes

| Class | Purpose |
|-------|---------|
| `.t-container` | 1200px max-width container |
| `.t-btn` | Button element |
| `.t-btnflex` | Flexible button wrapper |
| `.t228__list` | Navigation list |
| `.t-menu__link-item` | Nav link |
| `data-record-type` | Block type identifier |

---

## Key Observations

1. **Brand personality**: Dark, tech-forward, bold uppercase text — electric/energy aesthetic
2. **Dual-tone palette**: Cyan (#00eaff + #009dc9) dominates; supplemented by white/black contrast
3. **FleetPulse fit**: Dark navy + teal green (#00d4aa) harmonizes with the existing cyan/dark palette
4. **Mobile**: Tilda handles responsive via its grid; custom blocks must implement their own
5. **Font**: TacticSans is not on Google Fonts — use `font-family: 'TacticSans', Arial, sans-serif` and Tilda will supply the font when embedded in its pages
