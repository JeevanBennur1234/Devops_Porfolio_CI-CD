# DevOps Portfolio — CI/CD Pipeline Project

A complete, production-ready DevOps portfolio website demonstrating a full CI/CD pipeline using modern DevOps tools and best practices.

## 🏗️ Architecture Overview

```
Developer → GitHub → Jenkins → Docker Build → AWS S3 → CloudFront → Users
                                    ↓
                              Ansible (Server Config)
```

> For a detailed architecture diagram, see [ARCHITECTURE.md](ARCHITECTURE.md)

## 🛠️ Tech Stack

### Application
| Technology | Purpose |
|-----------|---------|
| React.js (Vite) | Frontend framework |
| Tailwind CSS | Utility-first CSS styling |
| Framer Motion | Animations and transitions |
| EmailJS | Contact form integration |

### DevOps Tools
| Tool | Purpose |
|------|---------|
| **GitHub** | Source code management, version control |
| **Jenkins** | CI/CD pipeline automation |
| **Docker** | Containerization (multi-stage build) |
| **AWS S3** | Static website hosting |
| **AWS CloudFront** | CDN with HTTPS |
| **AWS IAM** | Secure deployment credentials |
| **Ansible** | Server provisioning & configuration |

## 📁 Project Structure

```
my-devops-portfolio/
├── ansible/                    # Ansible configuration management
│   ├── inventory.ini           # Target server definitions
│   ├── setup-server.yml        # Server provisioning playbook
│   └── deploy.yml              # Application deployment playbook
├── scripts/                    # Deployment automation scripts
│   ├── deploy.sh               # S3 deployment script
│   └── cloudfront-invalidate.sh # CloudFront cache invalidation
├── src/                        # React application source code
│   ├── components/             # React components
│   │   ├── layout/             # Navbar, Footer
│   │   └── sections/           # Hero, About, Skills, Projects, etc.
│   ├── data/                   # Content data layer
│   ├── hooks/                  # Custom React hooks
│   └── index.css               # Global styles
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker Compose configuration
├── nginx.conf                  # Nginx SPA configuration
├── .dockerignore               # Docker build exclusions
├── Jenkinsfile                 # Jenkins CI/CD pipeline definition (v2.0)
├── .env.example                # Environment variables template
├── version.txt                 # Current semantic version
├── CHANGELOG.md                # Version history log
├── RELEASE_NOTES.md            # Detailed release notes
├── DEPLOYMENT-DIAGRAM.md       # Pipeline and network diagrams
├── GIT-COMMANDS.md             # Git command reference
├── ARCHITECTURE.md             # Architecture diagrams & tool integration
├── WORKFLOW.md                 # Detailed CI/CD workflow documentation
├── AWS-DEPLOYMENT.md           # AWS setup guide, security & cost analysis
└── README.md                   # This file
```

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/JeevanBennur1234/devops-portfolio-cicd.git
cd devops-portfolio-cicd

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser: http://localhost:5173
```

### Docker (Containerized)
```bash
# Build and run with Docker Compose
docker compose up -d --build

# Or build manually
docker build -t devops-portfolio .
docker run -d -p 80:80 --name portfolio devops-portfolio

# Open in browser: http://localhost
```

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📋 CI/CD Pipeline Stages

The Jenkins pipeline (`Jenkinsfile`) automates the following stages:

| Stage | Description | Tool |
|-------|-------------|------|
| 1. Checkout Code | Clone latest code from GitHub | Git |
| 2. Install Dependencies | Run `npm ci` for deterministic installs | Node.js |
| 3. Run Tests | Code quality checks with ESLint | ESLint |
| 4. Build React App | Create optimized production bundle | Vite |
| 5. Docker Build | Build multi-stage Docker image | Docker |
| 6. Deploy to S3 | Sync files to AWS S3 bucket | AWS CLI |
| 7. CloudFront Invalidation | Clear CDN cache | AWS CLI |
| 8. Notifications | Email/Slack success/failure alerts | Jenkins |

## 🐳 Docker Setup

### Multi-Stage Build
- **Stage 1** (`node:20-alpine`): Installs dependencies and builds the React app
- **Stage 2** (`nginx:1.27-alpine`): Serves static files with optimized Nginx config
- **Result**: ~25MB production image with security headers and gzip compression

### Docker Commands
```bash
docker compose up -d --build    # Build and start
docker compose down             # Stop
docker compose logs -f          # View logs
docker ps                       # Check running containers
```

## ☁️ AWS Deployment

See [AWS-DEPLOYMENT.md](AWS-DEPLOYMENT.md) for the complete guide including:
- Service selection rationale (S3, CloudFront, IAM)
- Security configuration (IAM policies, bucket policies)
- Cost analysis (~$0/month on Free Tier)
- Step-by-step setup instructions

## 📦 Ansible Configuration

See the `ansible/` directory for server provisioning:
```bash
# Provision a fresh server
ansible-playbook -i ansible/inventory.ini ansible/setup-server.yml

# Deploy the application
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

## 🔀 Git Branching Strategy

```
main        ─── Production-ready, tagged releases
develop     ─── Integration branch for features
feature/*   ─── New features (merge → develop)
release/*   ─── Release preparation (merge → main + develop)
hotfix/*    ─── Urgent production fixes (merge → main + develop)
```

### Releases

| Version | Tag | Date | Description |
|---------|-----|------|-------------|
| v1.0.0  | `v1.0.0` | 2026-04-15 | Initial Portfolio |
| v1.1.0  | `v1.1.0` | 2026-04-28 | Certifications and Resume |
| v1.2.0  | `v1.2.0` | 2026-05-10 | Blog and SEO |
| v1.3.0  | `v1.3.0` | 2026-05-20 | Interactive Terminal and Theme Toggle |
| v2.0.0  | `v2.0.0` | 2026-05-31 | Performance Optimization and Monitoring |

See [CHANGELOG.md](CHANGELOG.md) and [RELEASE_NOTES.md](RELEASE_NOTES.md) for details.

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture diagrams and tool integration |
| [WORKFLOW.md](WORKFLOW.md) | Detailed CI/CD workflow and tool explanations |
| [AWS-DEPLOYMENT.md](AWS-DEPLOYMENT.md) | AWS setup, security, and cost analysis |
| [CHANGELOG.md](CHANGELOG.md) | Version history (Keep a Changelog format) |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Detailed release notes per version |
| [DEPLOYMENT-DIAGRAM.md](DEPLOYMENT-DIAGRAM.md) | Deployment pipeline and network architecture diagrams |
| [GIT-COMMANDS.md](GIT-COMMANDS.md) | Complete git commands for all releases |

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## 👤 Author

**Jeevan Bennur**  
DevOps Engineer | Cloud Enthusiast

- GitHub: [@JeevanBennur1234](https://github.com/JeevanBennur1234)
