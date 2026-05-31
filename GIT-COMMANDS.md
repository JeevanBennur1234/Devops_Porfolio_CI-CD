# Git Commands — Multi-Release Simulation

This document contains all Git commands required to simulate the multi-release lifecycle.

---

## Prerequisites

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## Release v1.0.0 — Initial Portfolio

### Setup main branch
```bash
git init
git add .
git commit -m "chore: initial project scaffold with React + Vite + Tailwind"
echo "1.0.0" > version.txt
git add version.txt
git commit -m "chore: set initial version to 1.0.0"
git tag -a v1.0.0 -m "Release v1.0.0 — Initial Portfolio"
```

### Create feature branches for v1.0
```bash
git checkout -b feature/hero-section
git add src/components/sections/Hero.jsx src/data/content.js
git commit -m "feat: add hero section with animated intro"
git checkout main && git merge feature/hero-section

git checkout -b feature/skills-projects
git add src/components/sections/Skills.jsx src/components/sections/Projects.jsx
git commit -m "feat: add skills and projects sections"
git checkout main && git merge feature/skills-projects

git checkout -b feature/experience-education
git add src/components/sections/Experience.jsx src/components/sections/Education.jsx
git commit -m "feat: add experience timeline and education"
git checkout main && git merge feature/experience-education

git checkout -b feature/contact-footer
git add src/components/sections/Contact.jsx src/components/layout/Footer.jsx
git commit -m "feat: add contact form and footer"
git checkout main && git merge feature/contact-footer

git checkout -b feature/ci-cd-pipeline
git add Jenkinsfile Dockerfile nginx.conf scripts/ ansible/
git commit -m "feat: add Jenkins pipeline, Docker, Nginx, and Ansible config"
git checkout main && git merge feature/ci-cd-pipeline
```

### Tag v1.0.0
```bash
git tag -a v1.0.0 -m "Release v1.0.0 — Initial Portfolio with CI/CD Pipeline"
git push origin main --tags
```

---

## Create develop Branch
```bash
git checkout -b develop main
git push origin develop
```

---

## Release v1.1.0 — Certifications and Resume

### Feature branches
```bash
git checkout develop
git checkout -b feature/certifications
# Add certifications section
git add src/components/sections/Certifications.jsx
git commit -m "feat: add certifications section with AWS, CKA, Terraform"
# Add resume download
git add public/resume.pdf src/components/sections/Hero.jsx
git commit -m "feat: add resume download button to hero"
# Add testimonials
git add src/components/sections/Testimonials.jsx
git commit -m "feat: add testimonials carousel with star ratings"
# Stats bar
git add src/components/StatsBar.jsx
git commit -m "feat: add animated stats bar"
# GitHub stats
git add src/components/sections/GitHubStats.jsx
git commit -m "feat: add GitHub contributions integration"
# Update content
git add src/data/content.js
git commit -m "feat: extend content data layer with certifications and testimonials"
git checkout develop && git merge feature/certifications
```

### Release branch
```bash
git checkout -b release/v1.1 develop
# Bump version
echo "1.1.0" > version.txt
git add version.txt
git commit -m "chore: bump version to 1.1.0"
# Release
git checkout main && git merge release/v1.1 --no-ff
git tag -a v1.1.0 -m "Release v1.1.0 — Certifications and Resume"
git checkout develop && git merge release/v1.1 --no-ff
git branch -d release/v1.1
git push origin main develop --tags
```

---

## Release v1.2.0 — Blog and SEO

### Feature branches
```bash
git checkout develop
git checkout -b feature/blog-engine
# Blog component
git add src/components/sections/Blog.jsx
git commit -m "feat: add blog section with markdown rendering"
# Blog data
git add src/data/content.js
git commit -m "feat: add blog content with 3 starter articles"
git checkout develop && git merge feature/blog-engine

git checkout -b feature/seo
# SEO component
git add src/components/SEO.jsx
git commit -m "feat: add SEO component with react-helmet-async"
# Update index.html
git add index.html
git commit -m "feat: add Open Graph and Twitter Card meta tags"
# Dependencies
git add package.json package-lock.json
git commit -m "chore: add react-markdown, react-helmet-async, rehype-highlight"
git checkout develop && git merge feature/seo
```

### Release branch
```bash
git checkout -b release/v1.2 develop
echo "1.2.0" > version.txt
git add version.txt
git commit -m "chore: bump version to 1.2.0"
git checkout main && git merge release/v1.2 --no-ff
git tag -a v1.2.0 -m "Release v1.2.0 — Blog and SEO"
git checkout develop && git merge release/v1.2 --no-ff
git branch -d release/v1.2
git push origin main develop --tags
```

---

## Release v1.3.0 — Interactive Terminal and Theme Toggle

### Feature branches
```bash
git checkout develop
git checkout -b feature/interactive-terminal
# Terminal component
git add src/components/sections/Terminal.jsx
git commit -m "feat: add interactive terminal with command interface"
# Terminal responses
git commit -m "feat: implement terminal commands (help, skills, about, etc.)"
git checkout develop && git merge feature/interactive-terminal

git checkout -b feature/theme-toggle
# Theme hook
git add src/hooks/useTheme.jsx
git commit -m "feat: add useTheme hook with localStorage persistence"
# Update Navbar
git add src/components/layout/Navbar.jsx
git commit -m "feat: add theme toggle to navbar with Sun/Moon icons"
# Dark mode styles
git add src/index.css src/App.css
git commit -m "feat: add dark mode CSS variables and transitions"
# Update App
git add src/App.jsx
git commit -m "feat: integrate theme context across app"
git checkout develop && git merge feature/theme-toggle
```

### Release branch
```bash
git checkout -b release/v1.3 develop
echo "1.3.0" > version.txt
git add version.txt
git commit -m "chore: bump version to 1.3.0"
git checkout main && git merge release/v1.3 --no-ff
git tag -a v1.3.0 -m "Release v1.3.0 — Interactive Terminal and Theme Toggle"
git checkout develop && git merge release/v1.3 --no-ff
git branch -d release/v1.3
git push origin main develop --tags
```

---

## Release v2.0.0 — Performance Optimization and Monitoring

### Feature branches
```bash
git checkout develop
git checkout -b feature/performance-optimization
# Code splitting
git add vite.config.js
git commit -m "perf: add route-based code splitting and manual chunks"
# Image optimization
git commit -m "perf: add image optimization pipeline with WebP"
# Service worker
git add src/sw.js
git commit -m "feat: add service worker for offline caching"
# Lazy loading
git add src/App.jsx
git commit -m "perf: implement lazy loading for route components"
# Nginx Brotli
git add nginx.conf
git commit -m "perf: add Brotli compression support in nginx"
# Critical CSS
git commit -m "perf: inline critical CSS for above-the-fold content"
# Reduce Docker image
git add Dockerfile
git commit -m "perf: optimize Docker image with nginx-alpine-slim"
git checkout develop && git merge feature/performance-optimization

git checkout -b feature/monitoring
# CloudWatch setup
git add ansible/
git commit -m "feat: add CloudWatch dashboard and metric alarms"
# Lighthouse CI
git add Jenkinsfile
git commit -m "feat: add Lighthouse CI performance gate to pipeline"
# Web Vitals
git add src/
git commit -m "feat: add Web Vitals tracking library"
git checkout develop && git merge feature/monitoring
```

### Hotfix branch (critical CLS fix)
```bash
git checkout main
git checkout -b hotfix/cls-fix
git commit -m "fix: resolve cumulative layout shift in hero section"
git checkout main && git merge hotfix/cls-fix --no-ff
git checkout develop && git merge hotfix/cls-fix --no-ff
git branch -d hotfix/cls-fix
```

### Release branch
```bash
git checkout develop
git checkout -b release/v2.0 develop
echo "2.0.0" > version.txt
git add version.txt
git commit -m "chore: bump version to 2.0.0"
git checkout main && git merge release/v2.0 --no-ff
git tag -a v2.0.0 -m "Release v2.0.0 — Performance Optimization and Monitoring"
git checkout develop && git merge release/v2.0 --no-ff
git branch -d release/v2.0
git push origin main develop --tags
```

---

## Complete Tag History

```bash
git tag -n
v1.0.0    Release v1.0.0 — Initial Portfolio
v1.1.0    Release v1.1.0 — Certifications and Resume
v1.2.0    Release v1.2.0 — Blog and SEO
v1.3.0    Release v1.3.0 — Interactive Terminal and Theme Toggle
v2.0.0    Release v2.0.0 — Performance Optimization and Monitoring
```

---

## Branch Structure After All Releases

```text
main
├── v1.0.0
├── v1.1.0
├── v1.2.0
├── v1.3.0
└── v2.0.0

develop
├── feature/certifications
├── feature/blog-engine
├── feature/seo
├── feature/interactive-terminal
├── feature/theme-toggle
├── feature/performance-optimization
├── feature/monitoring
├── release/v1.1
├── release/v1.2
├── release/v1.3
├── release/v2.0
└── hotfix/cls-fix
```

---

## Quick Simulation Script

```bash
#!/bin/bash
# Run this script to simulate all releases

set -e

echo "=== Simulating DevOps Portfolio Multi-Release Lifecycle ==="

# --- v1.0.0 ---
echo "--- Release v1.0.0 ---"
git add . && git commit -m "chore: initial scaffold"
echo "1.0.0" > version.txt && git add version.txt && git commit -m "chore: set version"
git tag -a v1.0.0 -m "Release v1.0.0 — Initial Portfolio"
git checkout -b develop

# --- v1.1.0 ---
echo "--- Release v1.1.0 ---"
git checkout -b feature/certifications && touch Certifications.jsx
git add . && git commit -m "feat: add certifications section"
git checkout develop && git merge feature/certifications
git checkout -b release/v1.1
echo "1.1.0" > version.txt && git add version.txt && git commit -m "chore: bump version"
git checkout main && git merge release/v1.1 --no-ff
git tag -a v1.1.0 -m "Release v1.1.0 — Certifications and Resume"
git checkout develop && git merge release/v1.1 --no-ff
git branch -d feature/certifications release/v1.1

# --- v1.2.0 ---
echo "--- Release v1.2.0 ---"
git checkout -b feature/blog && touch Blog.jsx
git add . && git commit -m "feat: add blog component"
git checkout develop && git merge feature/blog
git checkout -b release/v1.2
echo "1.2.0" > version.txt && git add version.txt && git commit -m "chore: bump version"
git checkout main && git merge release/v1.2 --no-ff
git tag -a v1.2.0 -m "Release v1.2.0 — Blog and SEO"
git checkout develop && git merge release/v1.2 --no-ff
git branch -d feature/blog release/v1.2

# --- v1.3.0 ---
echo "--- Release v1.3.0 ---"
git checkout -b feature/terminal && touch Terminal.jsx
git add . && git commit -m "feat: add interactive terminal"
git checkout develop && git merge feature/terminal
git checkout -b feature/theme && touch useTheme.jsx
git add . && git commit -m "feat: add theme toggle"
git checkout develop && git merge feature/theme
git checkout -b release/v1.3
echo "1.3.0" > version.txt && git add version.txt && git commit -m "chore: bump version"
git checkout main && git merge release/v1.3 --no-ff
git tag -a v1.3.0 -m "Release v1.3.0 — Interactive Terminal and Theme Toggle"
git checkout develop && git merge release/v1.3 --no-ff
git branch -d feature/terminal feature/theme release/v1.3

# --- v2.0.0 ---
echo "--- Release v2.0.0 ---"
git checkout -b feature/perf && touch perf-optimizations
git add . && git commit -m "perf: code splitting and image optimization"
git checkout develop && git merge feature/perf
git checkout -b hotfix/cls-fix
git commit -m "fix: resolve layout shift"
git checkout main && git merge hotfix/cls-fix --no-ff
git checkout develop && git merge hotfix/cls-fix --no-ff
git branch -d hotfix/cls-fix
git checkout -b release/v2.0
echo "2.0.0" > version.txt && git add version.txt && git commit -m "chore: bump version to 2.0.0"
git checkout main && git merge release/v2.0 --no-ff
git tag -a v2.0.0 -m "Release v2.0.0 — Performance Optimization and Monitoring"
git checkout develop && git merge release/v2.0 --no-ff
git branch -d feature/perf release/v2.0

echo "=== All releases simulated ==="
git log --oneline --decorate --graph --all | head -40
```
