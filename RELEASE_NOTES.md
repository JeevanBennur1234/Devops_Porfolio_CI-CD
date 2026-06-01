# Release Notes

## [v2.0.0] — Added Complete CI/CD Pipeline

**Release Date:** 2026-05-31

### Highlights
Production-grade CI/CD pipeline integrating GitHub, Jenkins, Docker, AWS S3, and CloudFront. Fully automated from commit to global delivery.

### Features
- GitHub webhook triggers Jenkins pipeline on push
- Declarative Jenkins pipeline with 11 stages
- Multi-stage Docker build (Node.js → Nginx Alpine, ~18MB image)
- AWS S3 static hosting with optimized caching headers
- AWS CloudFront CDN with global edge delivery and HTTPS
- IAM least-privilege deployment user
- Ansible playbooks for EC2 provisioning and deployment
- CloudFront cache invalidation on every deployment
- Semantic version tagging (`v2.0.0`)
- Performance optimization: Lighthouse 98+, bundle size 85KB gzip
- Service Worker for offline support and asset caching
- Brotli compression and Critical CSS inlining
- Version info display in footer (version, build date, commit hash)

---

## [v1.3.0] — Added Terminal Section

**Release Date:** 2026-05-20

### Features
- Interactive terminal component with command-line interface
- 9 terminal commands: `help`, `about`, `skills`, `projects`, `contact`, `whoami`, `uptime`, `clear`, `ls`
- Dark/light theme toggle with system preference detection
- `useTheme` custom hook with localStorage persistence
- Terminal auto-scroll and command history

---

## [v1.2.0] — Added Blog Section

**Release Date:** 2026-05-10

### Features
- Full blog section with markdown rendering via `react-markdown`
- Article cards with title, excerpt, date, tags, and reading time
- Article detail view with syntax highlighting
- 3 starter blog posts on CI/CD, Terraform, and K8s monitoring
- SEO component with Open Graph and Twitter Card meta tags

---

## [v1.1.0] — Added Projects Section

**Release Date:** 2026-04-28

### Features
- Projects showcase with 4 featured projects
- Certifications section (AWS SAA, CKA, Terraform Associate)
- Resume download button linked to `/resume.pdf`
- Testimonials carousel with star ratings
- Animated stats bar (experience, projects, certifications, tools)
- GitHub contributions integration

---

## [v1.0.0] — Initial Portfolio

**Release Date:** 2026-04-15

### Features
- React + Vite project scaffold with Tailwind CSS
- 7 portfolio sections: Hero, About, Skills, Projects, Experience, Education, Contact
- Framer Motion animations and smooth scroll navigation
- EmailJS contact form integration
- Responsive design (mobile-first)
- Custom Nginx configuration for SPA routing
- Multi-stage Docker build
- ESLint configuration for code quality
