# Terapie ECHILIBRU - Landing Page

A modern, high-performance landing page for **Terapie ECHILIBRU**, a Romanian equine-assisted therapy center offering personal development, hippotherapy, and team building programs.

## 🌐 Live Demo

The site is built as a static single-page application (SPA) and can be deployed to any static hosting provider.

---

## 🏗 Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | [Astro](https://astro.build) | 5.x |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | 3.4.x |
| **Integration** | [@astrojs/tailwind](https://github.com/astrojs/tailwind) | 5.x |
| **Language** | TypeScript / Astro Components | - |
| **Fonts** | Google Fonts (Inter, Playfair Display) | - |
| **Icons** | Inline SVG (Lucide-style) | - |

---

## 📁 Project Structure

```
echilibru_web/
├── public/                 # Static assets (served as-is)
│   └── favicon.svg         # (add your favicon here)
├── src/
│   ├── components/         # Reusable Astro components (future)
│   ├── layouts/            # Layout components (future)
│   ├── pages/
│   │   └── index.astro     # Main landing page (single-page)
│   └── styles/
│       └── global.css      # Global styles + custom utilities
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind custom theme
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## 🎨 Design System

### Color Palette

| Role | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Primary** | `#1e3f20` | `forest-950` | Headlines, primary CTAs, navigation |
| **Secondary** | `#c97a53` | `sand-900` | Accent buttons, highlights, labels |
| **Background** | `#faf6f0` | `cream-50` | Page background, alternating sections |
| **Surface** | `#ffffff` | `white` | Cards, forms, modals |
| **Text Primary** | `#333333` | `gray-700` | Body copy |
| **Text Muted** | `#6b7280` | `gray-500` | Secondary info |

### Typography

| Element | Font | Weight | Usage |
|---------|------|--------|-------|
| **Headings** | Playfair Display | 400–700 | `h1`–`h3`, hero, section titles |
| **Body** | Inter | 300–600 | Paragraphs, UI labels, forms |
| **UI/Buttons** | Inter | 500–600 | Buttons, navigation, captions |

### Spacing & Layout

- **Container**: `max-w-7xl` (1280px) with `px-6` padding
- **Section padding**: `py-24` (96px) desktop, `py-16` mobile
- **Card radius**: `rounded-2xl` (16px)
- **Shadow**: `shadow-md` default, `hover-lift` on interactive cards
- **Transitions**: `duration-300 ease-out` for all interactive states

### Custom Utilities (Tailwind + global.css)

```css
/* Glassmorphism nav */
.glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); }

/* Hover lift effect */
.hover-lift { transition: transform .3s ease, box-shadow .3s ease; }
.hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 25px -5px rgba(0,0,0,.1); }

/* Animations */
.animate-fade-in { animation: fadeIn .6s ease-out; }
.animate-slide-up { animation: slideUp .6s ease-out; }
```

---

## ⚡ Features Implemented

| Section | Description |
|---------|-------------|
| **Navigation** | Fixed glassmorphism header, mobile hamburger menu, smooth scroll anchors |
| **Hero** | Split layout (copy + image), dual CTAs, gradient overlay |
| **About** | Mission statement + image, 3 value badges |
| **Philosophy** | 3-column grid with SVG icons (Non-judgmental Mirroring, Emotional Grounding, Physical Recovery) |
| **Services** | 3 service cards with hover lift, images, descriptions |
| **Team** | 3 profile cards (therapists + therapy horses with traits) |
| **Contact** | Split layout: form (name, email, service select, message) + contact info + map placeholder |
| **Footer** | Minimal: logo, quick links, copyright, tagline |

### Interactions (Vanilla JS, no framework overhead)

- Mobile menu toggle
- Smooth scroll anchor navigation
- Auto-close mobile menu on link click
- IntersectionObserver scroll animations (fade-in + slide-up)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### Install

```bash
npm install
```

### Development

```bash
npm run dev
# Starts at http://localhost:4321
```

### Build for Production

```bash
npm run build
# Output in ./dist/
```

### Preview Production Build

```bash
npm run preview
```

### Lint & Format

```bash
npm run lint
npm run format
```

---

## 📦 Deployment

The site builds to static files in `./dist/`. Deploy anywhere:

| Platform | Command |
|----------|---------|
| **Netlify** | `npm run build && netlify deploy --prod --dir=dist` |
| **Vercel** | `vercel --prod` (auto-detects Astro) |
| **Cloudflare Pages** | Connect repo, build: `npm run build`, output: `dist` |
| **GitHub Pages** | Use `actions/upload-pages-artifact` with `dist/` |
| **Any static host** | Upload `dist/` contents |

**Environment variables**: None required (fully static).

---

## 🔧 Configuration Details

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://echilibru.ro', // for sitemap/canonical
  output: 'static',
});
```

### `tailwind.config.js` — Custom Theme

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 950: '#1e3f20' },
        sand:   { 900: '#c97a53' },
        cream:  { 50:  '#faf6f0' },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out',
        'slide-up': 'slideUp .6s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
      },
    },
  },
};
```

---

## ♿ Accessibility

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- Focus-visible outlines on all interactive elements
- `aria-label` on icon-only buttons
- Sufficient color contrast (WCAG AA)
- `prefers-reduced-motion` respected via `@media` in global CSS
- Form labels properly associated with inputs

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Button rows, form fields |
| `md` | 768px | Navigation, 2-col grids |
| `lg` | 1024px | 3-col grids, hero split |
| `xl` | 1280px | Container max-width |

---

## 🧩 Extending the Project

### Add a New Section

1. Create component in `src/components/SectionName.astro`
2. Import and place in `src/pages/index.astro`
3. Add anchor link in navigation

### Add a Blog/News Section

- Use Astro Content Collections (`src/content/blog/`)
- Generate routes with `getStaticPaths()`

### Add i18n (RO / EN)

- Use `@astrojs/i18n` or separate `src/pages/[lang]/index.astro`
- Duplicate content files per locale

---

## 📄 License

MIT © 2026 Terapie ECHILIBRU

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

- **Email**: terapie.echilibru@gmail.com
- **Phone**: +40 723 164 124
- **Address**: Strada Principala 118, Lacu Turcului, Romania, 107043
- **Facebook**: [facebook.com/terapie.cai.echilibru](https://www.facebook.com/terapie.cai.echilibru)
- **Instagram**: [instagram.com/terapie_echilibru](https://www.instagram.com/terapie_echilibru)

---

*Built with Astro + Tailwind CSS for performance, accessibility, and maintainability.*