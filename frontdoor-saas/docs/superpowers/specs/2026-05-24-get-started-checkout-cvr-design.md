# Specification: High-Converting Shopify-Style Checkout for Get-Started Page

**Date:** 2026-05-24  
**Author:** Antigravity (Google DeepMind Team)  
**Status:** Under User Review  

---

## 1. Goal & Context
The current `/get-started` page was assessed as visually unoptimized and poorly structured for Conversion Rate Optimization (CRO/CVR). High-friction form inputs competed for attention with decorative widgets, and the page suffered from overlapping text alignment bugs on the main header, which severely damaged payment-page credibility.

The goal is to restructure the `/get-started` page into a premium, world-class SaaS checkout flow that matches the visual conventions of the classic, highly-trusted **Shopify Checkout** layout. This layout separates the transaction details into a structured Left Column (pure white, action-focused) and an Order Summary Right Column (subtly shaded gray, summary-focused), placing value-anchoring environmental HUD maps and blurred hazard documents underneath the checkout forms as persuasive reassurance.

---

## 2. Design System & Style Guide

To maintain consistency and load speeds, we will utilize Vanilla CSS embedded directly in the component's `<style>` block and native inline styles.

### A. Color Tokens
* **Background Left (Form Pane):** `#ffffff` (Pure White)
* **Background Right (Summary Pane):** `#f8fafc` (Subtle Slate/Gray)
* **Divider Line:** `#e2e8f0` (Crisp gray border)
* **Text Primary:** `#0f172a` (Deep Charcoal Slate)
* **Text Secondary:** `#475569` (Slate Gray)
* **Accent Emerald (Trust/Actions):** `#10b981` (Solid Emerald Green)
* **Accent Emerald Hover:** `#059669` (Deep Emerald Green)
* **Accent Amber (Alarms/Registry):** `#f59e0b` (Alert Amber)

### B. Typography & Font Pairing
* We will use native, beautiful sans-serif font fallbacks (`Inter`, system-ui, sans-serif) to ensure instantaneous loading.
* **Main Titles:** `font-weight: 800`, `letter-spacing: -0.02em`, `line-height: 1.2` (fixing the overlapping vertical line-height bug).
* **Section Headers:** `font-weight: 700`, `letter-spacing: -0.01em`, `text-transform: uppercase`, `font-size: 0.85rem`.

---

## 3. UI/UX Component Specifications

The page layout on desktop will utilize a `58%` to `42%` split. On mobile, it will collapse into a single stacked column using media queries.

```
+-----------------------------------------------------------------------+
|  HEADER: Front Door Scan                                               |
+-------------------------------------------------------+---------------+
|                                                       |               |
|  LEFT COLUMN (58% Width)                              | RIGHT COLUMN  |
|  [Background: #FFFFFF]                                | (42% Width)   |
|                                                       | [Bg: #F8FAFC] |
|  1. Breadcrumbs                                       |               |
|     Information > Secure Checkout                     | ORDER SUMMARY |
|                                                       |               |
|  2. Contact Information                               | Item Details: |
|     * Email Field with Checkmark Feedback             | [Cover Image] |
|                                                       | 15-Page Scan  |
|  3. Package Tier Selection                            | for 30 North  |
|     * Shopify-style Shipping Radio Cards              | $49.00        |
|                                                       |               |
|  4. Secure Payment Simulation                         | PROMO CODE    |
|     * Card Number, Expiry, MM/YY, CVV                 | [Input] [Apply]
|                                                       |               |
|  5. Primary CTA                                       | SUB-TOTAL     |
|     * Solid Green "Complete Checkout" Button          | Coupon: -$0.00|
|                                                       | Total: $49.00 |
|  6. Reassurance HUD & Map (Below-the-fold)            |               |
|     * Google Maps Frame                               | SECURITY      |
|     * Registry Matches LED Bar Meter                  | * Stripe, SSL,|
|     * 4 Blurred Hazard Files + Glass Lock Overlay     |   McAfee Seals|
|                                                       |               |
+-------------------------------------------------------+---------------+
```

### 3.1 Left Column Pane (`#ffffff`)

#### A. Header & Navigation Links
* Minimalist header holding the "Front Door Scan" branding on the left and a "🔒 Secure checkout" text lock with a back button on the right.

#### B. Breadcrumb Navigation
* High-trust text path: `Address` ➔ `Select Package` ➔ `Secure Payment` (with `Secure Payment` in active bold charcoal, others in quiet gray).

#### C. Contact Information Form Card
* A clean field containing a text input for Email.
* Features a smooth transition: when the email is valid, a green checkmark fades into the field's right margin, providing micro-feedback.

#### D. Package Selector Cards (Shopify Shipping style)
* Encapsulated within stacked vertical buttons.
* Card A (Single Property Report): Left radio button, center detail ("Single Property Report for 30 North"), right price (`$49`).
* Card B (5-Property Investor Bundle): Best value green label on top right, radio button on left, center description ("5-Property Hunt Bundle + 4 credits"), right price (`$199`).
* Selected cards are dynamically styled with an emerald green border and a soft glow (`box-shadow`), while unselected cards have standard thin boundaries.

#### E. Payment Gateway Simulation Fields
* Professional payment form container titled "Payment Method".
* Holds card details inputs: Card Number (with a subtle credit card SVG icon), MM/YY, CVV, and Cardholder Name.
* *CRO Justification:* Increases checkout completion by simulating standard credit card entry, creating high visual alignment with authentic retail checkout experiences.

#### F. Primary Emerald Action Button
* Large, full-width solid green button containing a secure lock icon: `Generate Report Securely — $49` (or dynamically updated final price).
* Features spring-physics scale hover effects and deep shadows, drawing the user's focus.

#### G. Below-the-Fold Value Reassurance Panel
* Positioned directly below the checkout form. If a user hesitates, scrolls, or wants proof of the value, they meet this panel:
  1. **Google Maps Frame:** Clean map interface showing the selected property address.
  2. **SYS_REGISTRY_MATCHES Panel:** Displays "4 Active Registry Files" with a high-fidelity glowing amber 10-segment LED bar.
  3. **4 Blurred Hazard Files:** Mapped database disclosures styled beautifully like official records but obscured with a modern CSS blur (`filter: blur(5.5px)`) and a glassmorphic overlay containing a lock icon: "Specific Database Registry Files are Locked. Complete Checkout to Unlock."

---

### 3.2 Right Column Summary Pane (`#f8fafc`)

The right sidebar is separated by a solid `#e2e8f0` vertical border and has a subtle background tint.

#### A. PDF Cover Thumbnail Mockup
* Features an elegant digital mockup of a **"15-Page Neighborhood Safety Diagnostic Report Cover"** with a custom address tag ("30 North"), a shadow, and a neat border.
* Displayed side-by-side with a summary description: "Front Door Scan Environmental Report (Neighborhood Safety Diagnostic PDF)".

#### B. Promo Code Field
* Text input side-by-side with a flat, light-gray "Apply" button. Supports our existing `WELCOME10` coupon and displays successful discount messages.

#### C. Price Receipt Grid
* Clean, tabular lines:
  * Subtotal: `$49.00`
  * Applied Coupon Discount: `-$0.00` (or `-$10.00` if applied)
  * **Total Due:** in bold charcoal (`$49.00` / `$39.00`).

#### D. Trust Badges
* Styled inline seals: McAfee Secure (red shield), 256-Bit SSL Secured (emerald padlock), and Stripe Verified (indigo lock), matching Shopify's classic footer reassurance.

---

## 4. Accessibility & Vercel Guidelines Compliance

All UI code will strictly adhere to Vercel and browser standards:
1. **Focus Rings:** Ensure all interactive buttons, inputs, and anchors have visible `:focus-visible` rings with a clear outline-offset.
2. **Keyboard Skip-Link:** A hidden-by-default "Skip to Content" link at the very top of the page.
3. **Semantic Markup:** Standard `<header>`, `<main>`, `<section>`, `<form>`, `<label>` tags with proper explicit `id` and `aria-*` tags.
4. **No Decorative Clutter:** All decorative icons (`lucide-react` SVGs) will carry `aria-hidden="true"`.
5. **No Broken Animation Layouts:** Wrapping animations in `prefers-reduced-motion` media queries to support responsive and user-preferred accessibility settings.

---

## 5. Verification & Testing Plan

### A. Automated Local Build Validation
* Trigger local Next.js building command to verify absolute code and syntax sanity:
  ```bash
  npm run build
  ```

### B. UI/UX Verification
* Run local development server and inspect page appearance.
* Check layout on standard viewports (Desktop 1920x1080, iPad 768x1024, Mobile 375x812) using browser developer tools.
* Verify form field focus states, responsive grids, and coupon error validations.

### C. Visual Appeal Evaluation
* Review layout proportions, font hierarchies, input box alignments, and confirm the title overlapping bug is 100% resolved.
