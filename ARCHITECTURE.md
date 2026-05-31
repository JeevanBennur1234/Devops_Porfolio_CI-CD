# Architecture Overview

This document explains the complete CI/CD architecture and how all DevOps tools are integrated in this project.

## System Architecture Diagram

```mermaid
flowchart TB
    subgraph DEV["👨‍💻 Developer Workstation"]
        A["Local Development<br/>(VS Code + Node.js)"] --> B["Git Commit & Push"]
    end

    subgraph GH["🐙 GitHub Repository"]
        B --> C["Source Code<br/>(main branch)"]
        C --> D["Webhook Trigger<br/>(on push event)"]
    end

    subgraph JENKINS["🔧 Jenkins CI/CD Server"]
        D --> E["Stage 1: Checkout Code"]
        E --> F["Stage 2: Install Dependencies<br/>(npm ci)"]
        F --> G["Stage 3: Run Tests<br/>(npm run lint)"]
        G --> H["Stage 4: Build React App<br/>(npm run build)"]
        H --> I["Stage 5: Docker Build<br/>(docker build -t portfolio .)"]
        I --> J["Stage 6: Deploy to AWS S3<br/>(aws s3 sync)"]
        J --> K["Stage 7: Invalidate CloudFront<br/>(aws cloudfront create-invalidation)"]
        K --> L["Stage 8: Notifications<br/>(Email / Slack)"]
    end

    subgraph DOCKER["🐳 Docker"]
        I --> M["Multi-Stage Build"]
        M --> N["Stage 1: Node.js 20 Alpine<br/>(Build React App)"]
        N --> O["Stage 2: Nginx Alpine<br/>(Serve Static Files)"]
        O --> P["Docker Image<br/>(~25MB)"]
    end

    subgraph AWS["☁️ AWS Cloud (Free Tier)"]
        J --> Q["Amazon S3<br/>(Static Website Hosting)"]
        Q --> R["Amazon CloudFront<br/>(CDN + HTTPS)"]
        R --> S["End Users<br/>(Global Access)"]
        T["IAM User<br/>(Deployment Permissions)"]
    end

    subgraph ANSIBLE["📦 Ansible (Configuration Management)"]
        U["Inventory File"] --> V["Playbook: setup-server.yml<br/>(Install Node.js, Nginx, Docker)"]
        V --> W["Playbook: deploy.yml<br/>(Pull image, Run container)"]
    end

    style DEV fill:#1e293b,stroke:#38bdf8,color:#f8fafc
    style GH fill:#1e293b,stroke:#f472b6,color:#f8fafc
    style JENKINS fill:#1e293b,stroke:#facc15,color:#f8fafc
    style DOCKER fill:#1e293b,stroke:#34d399,color:#f8fafc
    style AWS fill:#1e293b,stroke:#fb923c,color:#f8fafc
    style ANSIBLE fill:#1e293b,stroke:#a78bfa,color:#f8fafc
```

## Tool Integration Matrix

| Tool | Role | How It Fits |
|------|------|-------------|
| **GitHub** | Source Code Management | Hosts the repository, triggers Jenkins via webhook on push |
| **Jenkins** | CI/CD Orchestrator | Automates build, test, containerize, and deploy pipeline |
| **Docker** | Containerization | Packages the app into a portable, reproducible container image |
| **AWS S3** | Static Hosting | Stores the production build files for serving |
| **AWS CloudFront** | CDN & HTTPS | Distributes content globally with SSL/TLS encryption |
| **AWS IAM** | Security | Provides least-privilege access for Jenkins to deploy |
| **Ansible** | Configuration Management | Automates server provisioning and app deployment |

## CI/CD Pipeline Flow (Step-by-Step)

### 1. Developer Pushes Code → GitHub
- Developer writes code locally, runs `git commit` and `git push`
- Code is pushed to the `main` branch on GitHub
- GitHub webhook notifies Jenkins of the new commit

### 2. Jenkins Pipeline Triggers Automatically
- Jenkins receives the webhook and starts the pipeline defined in `Jenkinsfile`
- The pipeline runs through 8 stages sequentially

### 3. Build & Test Phase
- **Checkout**: Jenkins clones the latest code from GitHub
- **Install**: Runs `npm ci` for deterministic dependency installation
- **Test**: Runs `npm run lint` to check code quality
- **Build**: Runs `npm run build` to create optimized production files in `dist/`

### 4. Containerization Phase
- **Docker Build**: Creates a multi-stage Docker image
  - Stage 1 (Builder): Uses Node.js to build the React app
  - Stage 2 (Production): Uses Nginx to serve the static files
- Result: A lightweight (~25MB) production-ready container

### 5. Deployment Phase
- **S3 Deploy**: Uses AWS CLI to sync `dist/` files to the S3 bucket
- **CloudFront Invalidation**: Clears the CDN cache so users see the latest version
- **Notifications**: Sends success/failure alerts via Email or Slack

### 6. Ansible (Server Configuration)
- Used when deploying to EC2 instances instead of S3
- Automates: Installing Docker, pulling the image, running the container
- Ensures consistent server configuration across environments

## Branching Strategy

```mermaid
gitGraph
    commit id: "Initial scaffold" tag: "v1.0.0"
    branch develop
    commit id: "dev base"
    branch feature/certifications
    commit id: "certifications"
    commit id: "resume download"
    checkout develop
    merge feature/certifications
    branch release/v1.1
    commit id: "bump 1.1.0"
    checkout main
    merge release/v1.1 tag: "v1.1.0"
    checkout develop
    merge release/v1.1
    branch feature/blog
    commit id: "blog + seo"
    checkout develop
    merge feature/blog
    branch release/v1.2
    commit id: "bump 1.2.0"
    checkout main
    merge release/v1.2 tag: "v1.2.0"
    checkout develop
    merge release/v1.2
    branch feature/terminal
    commit id: "terminal + theme"
    checkout develop
    merge feature/terminal
    branch release/v1.3
    commit id: "bump 1.3.0"
    checkout main
    merge release/v1.3 tag: "v1.3.0"
    checkout develop
    merge release/v1.3
    branch feature/perf
    commit id: "code splitting"
    commit id: "monitoring"
    checkout develop
    merge feature/perf
    branch hotfix/cls
    commit id: "fix layout shift"
    checkout main
    merge hotfix/cls
    branch release/v2.0
    commit id: "bump 2.0.0"
    checkout main
    merge release/v2.0 tag: "v2.0.0"
    checkout develop
    merge release/v2.0
```

| Branch | Purpose | Base | Merges Into |
|--------|---------|------|-------------|
| `main` | Production-ready, tagged releases | — | — |
| `develop` | Integration branch | `main` | `main` (via release) |
| `feature/*` | New feature development | `develop` | `develop` |
| `release/*` | Release prep (version bump, tag) | `develop` | `main` + `develop` |
| `hotfix/*` | Urgent production fixes | `main` | `main` + `develop` |

## Network Architecture

```mermaid
flowchart LR
    A["User Browser"] -->|"HTTPS (443)"| B["CloudFront CDN"]
    B -->|"HTTP (80)"| C["S3 Bucket<br/>(Origin)"]
    
    D["Developer"] -->|"Push (443)"| E["GitHub"]
    E -->|"Webhook (8080)"| F["Jenkins"]
    F -->|"AWS CLI"| C
    F -->|"Docker Build"| G["Docker Image"]

    style A fill:#0ea5e9,stroke:#0284c7,color:#fff
    style B fill:#f97316,stroke:#ea580c,color:#fff
    style C fill:#f97316,stroke:#ea580c,color:#fff
    style D fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style E fill:#ec4899,stroke:#db2777,color:#fff
    style F fill:#eab308,stroke:#ca8a04,color:#fff
    style G fill:#22c55e,stroke:#16a34a,color:#fff
```
