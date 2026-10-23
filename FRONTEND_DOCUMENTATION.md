# NT PHYSIOTHERAPY CLINIC — Frontend Technical Documentation

> **Application Overview**: Single Page Application (SPA) for **NT Physiotherapy Clinic** (Dr. Yuvanraj DN, BPT) delivering clinical physical therapy, spine care, home visits, and rehabilitation services in Vadamadurai, Dindigul.

---

## 1. Core Technology Stack

| Layer | Technology | Version | Purpose / Key Benefit |
| :--- | :--- | :--- | :--- |
| **UI Framework** | **React** | `^19.3.1` | Modern declarative component architecture, React hooks (`useState`, `useEffect`, `useRef`), and seamless DOM reconciliation. |
| **DOM Renderer** | **React DOM** | `^19.3.1` | High-performance React 19 concurrent client renderer. |
| **Build & Dev Server**| **Vite** | `^8.3.4` | Next-generation ESM-powered development server with sub-second Hot Module Replacement (HMR) and optimized Rollup production bundler. |
| **React Compiler/Babel**| **@vitejs/plugin-react** | `^6.1.2` | Fast JSX and React transformation plugin for Vite. |
| **Local HTTPS / SSL** | **@vitejs/plugin-basic-ssl** | `^2.3.0` | Enables zero-config local HTTPS server with self-signed SSL certificates for realistic security testing. |
| **Linter / Code Quality**| **Oxlint** | `^1.88.0` | Rust-based high-speed linter for static syntax and code pattern validation. |
| **Iconography** | **Lucide React** | `^1.61.0` | Ultra-clean, scalable, tree-shakeable SVG icon collection. |
| **Styling & Layout** | **Vanilla CSS3** | Custom | Custom CSS token system without framework bloat, ensuring 100% style control and zero CSS-in-JS runtime overhead. |
| **Typography** | **Google Fonts** | Hosted | `Plus Jakarta Sans` (medical heading font) & `Inter` (readable UI body font). |

---

## 2. Architecture & File Structure

```
clinic-website/
├── index.html                   # HTML5 entry with meta SEO, CSP, security framebusting & fonts
├── package.json                 # Pinned dependencies, scripts, and build metadata
├── vite.config.js               # Vite configuration with HTTPS, security headers & SSL plugin
├── public/
│   ├── logo.png                 # Official 3D clinic brand logo emblem
│   └── favicon.ico              # Browser tab icon
└── src/
    ├── main.jsx                 # Client entry point mounting React root
    ├── App.jsx                  # Root shell orchestrating global layout, state & page navigation
    ├── index.css                # Global design system, CSS variables, typography, and utility classes
    ├── App.css                  # Component-level layout styles
    ├── data/
    │   └── clinicData.js        # Single Source of Truth for clinic info, doctor bio, services, FAQs
    ├── utils/
    │   └── security.js          # Enterprise client security, threat scanner, honeypots, and persistence
    ├── components/
    │   ├── Topbar.jsx           # Top contact & location banner (click-to-call & Google Maps link)
    │   ├── Navbar.jsx           # Sticky navigation bar with mobile slide menu & debounced Pages dropdown
    │   ├── HeroSection.jsx      # Doctor showcase hero with credential badges & quick actions
    │   ├── HeroCarousel.jsx     # Visual photography carousel
    │   ├── ServiceCard.jsx      # Interactive treatment card with modal preview trigger
    │   ├── FeatureCard.jsx      # Trust & feature highlights
    │   ├── TeamCard.jsx         # Physician profile presentation
    │   ├── AppointmentForm.jsx  # Multi-step validated appointment scheduler with bot trap
    │   ├── PatientFeedbackSection.jsx # Centered genuine patient feedback submission module
    │   ├── TestimonialCarousel.jsx    # Compatibility bridge pointing to PatientFeedbackSection
    │   ├── BlogCard.jsx         # Clinical educational health guide cards
    │   ├── VideoModal.jsx       # Video walkthrough dialog with YouTube embed
    │   ├── FloatingActions.jsx  # Sticky WhatsApp and emergency call floating triggers
    │   ├── SectionHeading.jsx   # Consistent section title & subtitle block
    │   └── Footer.jsx           # Global footer with hours, linked address, and quick links
    └── pages/
        ├── HomePage.jsx         # Landing page with hero, services, doctor profile, appointment & blog
        ├── AboutPage.jsx        # Clinic story, mission, clinical values & credentials
        ├── ServicesPage.jsx     # Clinical catalog, category filter tabs, 4-step recovery journey & feedback
        ├── AppointmentPage.jsx  # Dedicated appointment scheduling experience
        ├── TeamPage.jsx         # Complete Dr. Yuvanraj DN profile & specialties
        ├── BlogPage.jsx         # Clinical health insights and home exercise guides
        └── ContactPage.jsx      # Hours, direct phone, WhatsApp, directions, and Google Maps iframe
```

---

## 3. Design System & Theming

The application utilizes a strictly curated medical color palette designed to inspire clinical confidence, cleanliness, and comfort.

### CSS Custom Properties (`src/index.css`)
```css
:root {
  /* Medical Trust & Energy Palette */
  --bs-primary: #15B9D9;          /* Cyan / Aqua Clinical Primary */
  --bs-primary-dark: #0B99B7;     /* Deep Cyan */
  --bs-primary-light: #E0F7FA;    /* Soft Tint */
  --bs-emerald: #128C7E;          /* Doctor Care & WhatsApp Emerald */
  --bs-emerald-light: #25D366;    /* Vibrant Action Green */
  
  /* Neutral Slate Hierarchy */
  --bs-dark: #0F172A;             /* Slate 900 (High contrast headings) */
  --bs-text: #334155;             /* Slate 700 (Body typography) */
  --bs-text-muted: #64748B;       /* Slate 500 (Subtitles & captions) */
  --bs-light: #F8FAFC;            /* Slate 50 (Section contrast background) */
  --bs-white: #FFFFFF;            /* Pure White */
  --bs-border: #E2E8F0;           /* Subtle card & input borders */

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Elevation Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 14px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 30px -5px rgba(18, 140, 126, 0.12);
}
```

### Action Button Standards
All major form submissions (Feedback, Appointments, Contact) share the consistent **Emerald Recovery Gradient**:
```css
.btn-form-submit {
  background: linear-gradient(135deg, #128C7E, #25D366) !important;
  color: #FFFFFF !important;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35) !important;
}
```

---

## 4. Client-Side Security Engine (`src/utils/security.js`)

The frontend incorporates enterprise-grade defensive security directly in the client bundle:

1. **HTTPS Enforcement (`enforceHTTPS`)**:
   Automatically redirects insecure HTTP traffic to HTTPS on live production hosts.
2. **Anti-Clickjacking Framebusting**:
   Ensures the application cannot be framed inside unauthorized third-party malicious iframes:
   ```javascript
   if (window.top !== window.self) window.top.location = window.self.location;
   ```
3. **Strict Content Security Policy (CSP)**:
   Pre-configured in `index.html` and `vite.config.js` to whitelist legitimate sources for scripts, styles, Google Fonts, and Google Maps.
4. **XSS Input Sanitization (`sanitizeInput`)**:
   Cleanses incoming strings by stripping control characters and escaping HTML entities (`&`, `<`, `>`, `"`, `'`, `/`), neutralizing script injections and malicious URI schemes (`javascript:`, `vbscript:`, `data:`).
5. **Cyber Threat Detector (`detectThreats`)**:
   Scans input values using regex signatures for:
   - SQL Injection patterns (`union select`, `--`, `1=1`, `exec`)
   - Cross-Site Scripting (`<script>`, `onerror=`, `onload=`, `eval`)
   - Path Traversal & Shell Injection (`../`, `|`, `cat`, `curl`, `powershell`)
6. **Anti-Bot Honeypot & Timing Verification (`isBotSubmission`)**:
   Forms include hidden honeypot fields (`website_trap`) and calculate form interaction duration. Submissions completed in `< 1.2 seconds` or with filled traps are blocked.
7. **Sliding-Window Rate Limiting (`checkRateLimit`)**:
   Prevents automated spam attacks by bounding form submissions to 3 attempts per 60 seconds per action.
8. **Obfuscated Local Persistence (`encryptData` / `decryptData`)**:
   Encrypts stored patient appointments and verified feedback before writing to `localStorage` to guard against browser extension inspection.

---

## 5. Key Modules & Functional Workflows

### A. Navigation & Dropdown UX (`Navbar.jsx`)
- **Sticky Header**: Sticks to the top of viewport with light glass border.
- **Pages Dropdown**:
  - Employs a 200ms debounced hover timer and an invisible CSS bridge (`::before`) to eliminate hover gaps.
  - Features quick links with visual icons for **Doctor Profile**, **Book Appointment**, and **Clinical Blog**.
  - Accessible via mouse hover, keyboard focus, and mobile touch click with outside-click listener.
- **Mobile Menu**: Full-screen slide-down drawer with inline nested dropdown accordion.

### B. Treatment Services Catalog (`ServicesPage.jsx`)
- **Filter Tabs**: Instant client-side filtering by category (*All, Home Care, Physical Therapy, Spine Care, Sports Rehab, Pain Management*).
- **Service Detail Modal**: Interactive popup showing treatment description, session duration, pricing, and a direct "Book This Treatment" button.
- **Patient Journey**: 4-step recovery pathway (*Kinetic Evaluation → Custom Plan → Hands-On Therapy → Sustained Vitality*).
- **Patient Feedback Module**: Allows patients to select which clinical service they received and rate their rehabilitation experience.

### C. Appointment Booking Engine (`AppointmentForm.jsx`)
- **Interactive Slots**: In-Clinic vs. Home Visit selection, department dropdown, doctor pre-assignment, date picker, time slot selector.
- **Validation**: Regex verification for Indian phone numbers (10–15 digits), valid emails, and required patient fields.
- **WhatsApp Instant Sync**: Allows patients to seamlessly duplicate their confirmed appointment details directly to Dr. Yuvanraj DN on WhatsApp.

### D. Verified Patient Feedback (`PatientFeedbackSection.jsx`)
- 100% authentic, centered feedback interface.
- Zero fake or hardcoded testimonials.
- 5-Star dynamic rating selector with human-friendly descriptions.
- Instant submission feedback card display with verified treatment badge.

### E. Google Maps Integration (`ContactPage.jsx` & `clinicData.js`)
- Canonical Map URL: [`https://maps.app.goo.gl/DSeQmiCiZ3vSg5kx8`](https://maps.app.goo.gl/DSeQmiCiZ3vSg5kx8).
- Embedded iframe with pinpoint coordinates for **NT Physiotherapy Clinic** (`10.4457564, 78.1010029`) in Vadamadurai, Dindigul.
- Direct links on Topbar, Footer, and Contact Address Card.

---

## 6. Build & Deployment Commands

```bash
# 1. Install locked dependencies
npm ci

# 2. Run local development server with HTTPS (Port 5173)
npm run dev

# 3. Compile optimized production build into dist/
npm run build

# 4. Run static linter
npm run lint

# 5. Preview production build locally
npm run preview
```

### Production Build Metrics
- **JavaScript Bundle**: ~352 kB (99 kB gzip)
- **CSS Bundle**: ~22 kB (5 kB gzip)
- **Build Time**: ~500 ms via Vite Rollup compiler
