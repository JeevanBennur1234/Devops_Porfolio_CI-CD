# Release Notes

## [v2.0.0] — Performance Optimization and Monitoring

**Release Date:** 2026-05-31

### Highlights
Major performance overhaul — Lighthouse score from 72 → 98. Bundle size reduced 60%. Docker image trimmed 28%. Production monitoring with CloudWatch dashboards and automated performance gates in CI.

### Features
- Lighthouse CI integration with automated score thresholds in Jenkins
- Web Vitals tracking (FCP, TTI, LCP, CLS) via `web-vitals` library
- Route-based code splitting and lazy loading
- Image optimization pipeline — auto WebP/AVIF conversion
- Brotli compression at Nginx level
- Service Worker with Workbox for offline caching
- Critical CSS inlining for above-the-fold content
- CloudWatch dashboard with custom metrics and alarms
- Performance budgets enforced in CI pipeline
- Docker image optimized to `nginx:1.27-alpine-slim` (18MB)

### Performance Improvements
| Metric | Before v1.3 | After v2.0 | Improvement |
|--------|-------------|-------------|-------------|
| Lighthouse Performance | 72 | 98 | +26 pts |
| First Contentful Paint | 1.8s | 0.8s | -56% |
| Time to Interactive | 3.2s | 1.5s | -53% |
| Bundle Size (gzip) | 210KB | 85KB | -60% |
| Docker Image Size | 25MB | 18MB | -28% |

### Breaking Changes
- Requires Node.js 20+ for Service Worker build
- Nginx configuration updated with Brotli module
- Vite config updated with new chunk strategy

---

## [v1.3.0] — Interactive Terminal and Theme Toggle

**Release Date:** 2026-05-20

### Highlights
Interactive terminal experience and full dark mode support. Users can now type commands to explore the portfolio. System-preference-aware theme switching.

### Features
- Interactive terminal with 9 commands (`help`, `about`, `skills`, `projects`, `contact`, `whoami`, `uptime`, `clear`, `ls`)
- Terminal UI with macOS-style window chrome
- Dark/light theme toggle with localStorage persistence
- System preference detection (`prefers-color-scheme`)
- `useTheme` React hook
- Terminal auto-scroll and command history
- Smooth theme transition animations

### Upgrade Notes
- Install `lucide-react` for Sun/Moon icons (already present)
- Wrap app in `ThemeProvider` context

---

## [v1.2.0] — Blog and SEO

**Release Date:** 2026-05-10

### Highlights
Full blog engine with markdown rendering and comprehensive SEO. Three starter articles published. Social sharing meta tags for Twitter and Facebook.

### Features
- Blog section with article cards (title, date, excerpt, tags, reading time)
- Markdown rendering via `react-markdown` with GFM and syntax highlighting
- Article detail view with back navigation
- Reading time estimation algorithm
- `SEO` component with `react-helmet-async`
- Open Graph and Twitter Card meta tags
- JSON-LD structured data for search engines
- 3 starter blog posts on CI/CD, Terraform, and K8s monitoring

### New Dependencies
- `react-markdown`, `react-helmet-async`, `remark-gfm`, `rehype-highlight`, `highlight.js`

---

## [v1.1.0] — Certifications and Resume

**Release Date:** 2026-04-28

### Highlights
Added certifications showcase, resume download, client testimonials, and animated stats.

### Features
- Certifications section (AWS SAA, CKA, Terraform Associate)
- Resume download button linked to `/resume.pdf`
- Testimonials carousel with star ratings
- Stats bar with animated count-up effect
- GitHub contributions integration
- Education section enhancement

### Changed
- Content data layer extended with `certifications`, `testimonials`, `stats` fields
- Hero CTAs reorganized with primary/secondary/tertiary buttons

---

## [v1.0.0] — Initial Portfolio

**Release Date:** 2026-04-15

### Highlights
Initial release of the DevOps Portfolio — a complete, production-ready CI/CD pipeline demonstration project.

### Features
- React + Vite project scaffold with Tailwind CSS
- 7-portfolio sections: Hero, About, Skills, Projects, Experience, Education, Contact
- Framer Motion page animations
- Smooth scroll navigation with `react-scroll`
- EmailJS contact form integration
- Responsive design (mobile-first)
- Custom Tailwind theme with branded colors

### DevOps Pipeline
- Jenkins Declarative Pipeline with 7 stages
- Multi-stage Docker build (node:20-alpine → nginx:1.27-alpine)
- AWS S3 static hosting with CloudFront CDN
- IAM least-privilege deployment user
- Ansible playbooks for EC2 provisioning
- Nginx SPA configuration with security headers
- Gzip compression and aggressive asset caching

### Infrastructure
- Docker Compose for local development
- `.env.example` for environment configuration
- ESLint for code quality
- `deploy.sh` and `cloudfront-invalidate.sh` scripts
- Ansible inventory and playbooks
