# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-05-31

### Added
- Performance monitoring with Lighthouse CI and Web Vitals tracking
- Lazy loading and code splitting for route-based chunks
- Image optimization pipeline with WebP and AVIF support
- Brotli compression support in Nginx configuration
- Service Worker for offline support and asset caching
- Critical CSS inlining for above-the-fold content
- AWS CloudWatch dashboard and metric alarms
- Automated Lighthouse score gates in Jenkins pipeline
- Performance budgets enforced via CI

### Changed
- Docker base image optimized with `nginx:1.27-alpine-slim`
- Vite build configuration with manual chunks and tree-shaking
- Nginx caching headers for optimal CDN performance
- Reduced Docker image size from ~25MB to ~18MB
- Migrated all icons to optimized SVG sprite

### Fixed
- Cumulative Layout Shift (CLS) issues in Hero section
- Render-blocking resources defer strategy
- Font loading optimization to prevent FOIT

### Performance
- Lighthouse Performance score: 98+ (up from 72)
- First Contentful Paint: < 0.8s (down from 1.8s)
- Time to Interactive: < 1.5s (down from 3.2s)
- Total bundle size: 85KB gzipped (down from 210KB)
- Docker image size: 18MB (down from 25MB)

---

## [1.3.0] - 2026-05-20

### Added
- Interactive terminal component with command-line interface
- Theme toggle (light/dark mode) with system preference detection
- `useTheme` custom hook with localStorage persistence
- Terminal commands: `help`, `about`, `skills`, `projects`, `contact`, `whoami`, `uptime`, `clear`, `ls`
- Terminal window with macOS-style traffic light buttons
- Responsive terminal design for mobile and desktop
- Dark mode support across all existing components

### Changed
- Navbar updated with theme toggle button (Sun/Moon icons)
- All components updated for dark mode compatibility
- CSS transitions for smooth theme switching

### Fixed
- Color contrast issues in dark mode
- Mobile menu theme toggle accessibility

---

## [1.2.0] - 2026-05-10

### Added
- Full blog section with markdown rendering
- Article list view with cards (title, excerpt, date, tags, reading time)
- Article detail view with full markdown support
- `react-markdown` integration with GFM and syntax highlighting
- Blog content data layer with 3 starter articles
- SEO component with `react-helmet-async`
- Open Graph meta tags (og:title, og:description, og:image, og:url)
- Twitter Card meta tags for social sharing
- Semantic HTML structure for search engine indexing
- Sitemap structure for SEO
- Reading time estimation for blog posts

### Changed
- `index.html` updated with comprehensive SEO meta tags
- Content data restructured to support blog entries
- Navigation updated with blog section link

### Fixed
- Meta tag duplication between static HTML and dynamic SEO component

---

## [1.1.0] - 2026-04-28

### Added
- Certifications section with AWS SAA, CKA, Terraform Associate
- Resume download button in Hero section
- Resume PDF asset in public folder
- Testimonials section with client reviews and star ratings
- Stats bar with animated count-up (experience, projects, certifications, tools)
- GitHub Stats integration component
- Education section styling improvements

### Changed
- Hero section layout with new CTA buttons layout
- Content data layer extended with certifications and testimonials
- Section order in App.jsx updated

### Fixed
- Resume link placeholder replaced with actual PDF path
- Mobile responsiveness for certification badges

---

## [1.0.0] - 2026-04-15

### Added
- Initial React + Vite project setup
- Tailwind CSS configuration with custom theme tokens
- Hero section with animated intro and gradient text
- About section with personal bio
- Skills section with categorized tech stack (AWS, K8s, Terraform, etc.)
- Projects section with 4 featured projects
- Experience timeline with achievement details
- Education section
- Contact section with EmailJS integration
- Navbar with smooth scroll navigation
- Footer with social links
- Framer Motion animations throughout
- Responsive design (mobile, tablet, desktop)
- Custom Nginx configuration for SPA routing
- Multi-stage Docker build (Node.js → Nginx)
- Docker Compose for local development
- ESLint configuration for code quality
- Git hooks and .gitignore setup

### DevOps
- Jenkins pipeline with 7 stages (checkout, install, build, docker, S3, CloudFront, deploy)
- AWS S3 static hosting deployment
- AWS CloudFront CDN with HTTPS
- IAM least-privilege deployment policy
- Custom deployment scripts (`deploy.sh`, `cloudfront-invalidate.sh`)
- Ansible playbooks for server setup and deployment
- `.dockerignore` and `.env.example` for security

---

[2.0.0]: https://github.com/JeevanBennur1234/devops-portfolio-cicd/releases/tag/v2.0.0
[1.3.0]: https://github.com/JeevanBennur1234/devops-portfolio-cicd/releases/tag/v1.3.0
[1.2.0]: https://github.com/JeevanBennur1234/devops-portfolio-cicd/releases/tag/v1.2.0
[1.1.0]: https://github.com/JeevanBennur1234/devops-portfolio-cicd/releases/tag/v1.1.0
[1.0.0]: https://github.com/JeevanBennur1234/devops-portfolio-cicd/releases/tag/v1.0.0
