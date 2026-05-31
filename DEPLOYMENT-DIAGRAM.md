# Deployment Architecture Diagrams

## End-to-End CI/CD Pipeline

```mermaid
graph TB
    subgraph DEV["Developer Workstation"]
        A[VS Code + React] --> B["git commit & push"]
    end

    subgraph GH["GitHub"]
        C[Source Code Repository] --> D[Webhook Trigger]
    end

    subgraph JENKINS["Jenkins CI/CD Server"]
        direction TB
        E[Checkout] --> F[Install Deps]
        F --> G[Lint & Test]
        G --> H[Build React App]
        H --> I[Docker Build]
        I --> J[Push to Registry]
        J --> K[Deploy to EC2]
        K --> L[CloudFront Invalidation]
        L --> M[Version Tag & Release]
    end

    subgraph ECR["Docker Registry"]
        N[Container Image<br/>devops-portfolio:latest<br/>devops-portfolio:v2.0.0]
    end

    subgraph EC2["AWS EC2 Instance"]
        direction TB
        O[Pull Image from Registry]
        P[Run Container<br/>port 80:80]
        Q[Nginx Reverse Proxy<br/>SPA Routing + SSL]
        O --> P --> Q
    end

    subgraph CDN["AWS CloudFront CDN"]
        R[Edge Locations<br/>Global Cache]
        S["Cache Invalidation<br/>on Deployment"]
    end

    subgraph USER["End Users"]
        T[Browser HTTPS Request]
    end

    B --> C
    D -->|HTTP POST| E
    I --> N
    J --> N
    K -->|SSH/Ansible| O
    L -->|"/* invalidation"| S
    Q -->|Origin Pull| R
    R --> T

    style DEV fill:#1e293b,stroke:#38bdf8,color:#f8fafc
    style GH fill:#1e293b,stroke:#f472b6,color:#f8fafc
    style JENKINS fill:#1e293b,stroke:#facc15,color:#f8fafc
    style ECR fill:#1e293b,stroke:#34d399,color:#f8fafc
    style EC2 fill:#1e293b,stroke:#fb923c,color:#f8fafc
    style CDN fill:#1e293b,stroke:#a78bfa,color:#f8fafc
    style USER fill:#0ea5e9,stroke:#0284c7,color:#fff
```

---

## CI/CD Stages Flow

```mermaid
flowchart LR
    subgraph SOURCE["Source"]
        GIT[Git Push]
    end

    subgraph BUILD["Build"]
        INSTALL[npm ci]
        LINT[ESLint]
        COMPILE[Vite Build]
    end

    subgraph CONTAINER["Containerize"]
        DOCKER[Docker Multi-Stage]
        IMAGE[18MB Image]
    end

    subgraph DEPLOY["Deploy"]
        EC2_DEPLOY[Docker Run on EC2]
        CF_INVAL[CloudFront Invalidation]
        TAG[Git Tag Release]
    end

    subgraph MONITOR["Monitor"]
        CLOUDWATCH[CloudWatch Dashboard]
        LIGHTHOUSE[Lighthouse CI]
    end

    GIT --> INSTALL --> LINT --> COMPILE --> DOCKER --> IMAGE
    IMAGE --> EC2_DEPLOY --> CF_INVAL --> TAG
    CF_INVAL --> CLOUDWATCH
    COMPILE --> LIGHTHOUSE
```

---

## Network Architecture

```mermaid
flowchart LR
    USER["User Browser"] -->|HTTPS :443| CF["CloudFront CDN<br/>Global Edge"]

    CF -->|HTTP :80| NGINX["Nginx on EC2<br/>Reverse Proxy"]

    NGINX -->|serve static| APP["React SPA<br/>Docker Container"]

    subgraph CI["CI/CD Pipeline"]
        GH["GitHub"] -->|Webhook| J["Jenkins Server"]
        J -->|Docker Build| REG["Docker Registry"]
        J -->|Ansible| NGINX
    end

    subgraph MON["Monitoring"]
        CW["CloudWatch<br/>Dashboard"]
        LH["Lighthouse CI<br/>Score Gate"]
    end

    APP --> CW
    J --> LH

    style USER fill:#0ea5e9,stroke:#0284c7,color:#fff
    style CF fill:#f97316,stroke:#ea580c,color:#fff
    style NGINX fill:#22c55e,stroke:#16a34a,color:#fff
    style APP fill:#3b82f6,stroke:#2563eb,color:#fff
    style CI fill:#eab308,stroke:#ca8a04,color:#fff
    style MON fill:#8b5cf6,stroke:#7c3aed,color:#fff
```

---

## Git Branching Strategy

```mermaid
gitGraph
    commit id: "Initial scaffold" tag: "v1.0.0"
    branch develop
    commit id: "dev base"

    branch feature/certifications
    commit id: "certifications section"
    commit id: "resume download"
    checkout develop
    merge feature/certifications

    branch release/v1.1
    commit id: "bump version 1.1.0"
    checkout main
    merge release/v1.1 tag: "v1.1.0"
    checkout develop
    merge release/v1.1

    branch feature/blog-seo
    commit id: "blog component"
    commit id: "SEO meta tags"
    checkout develop
    merge feature/blog-seo

    branch release/v1.2
    commit id: "bump version 1.2.0"
    checkout main
    merge release/v1.2 tag: "v1.2.0"
    checkout develop
    merge release/v1.2

    branch feature/terminal-theme
    commit id: "interactive terminal"
    commit id: "theme toggle"
    checkout develop
    merge feature/terminal-theme

    branch release/v1.3
    commit id: "bump version 1.3.0"
    checkout main
    merge release/v1.3 tag: "v1.3.0"
    checkout develop
    merge release/v1.3

    branch feature/performance
    commit id: "code splitting"
    commit id: "image optimization"
    commit id: "service worker"
    checkout develop
    merge feature/performance

    branch hotfix/cls-fix
    commit id: "fix layout shift"
    checkout main
    merge hotfix/cls-fix

    branch release/v2.0
    commit id: "monitoring setup"
    commit id: "bump version 2.0.0"
    checkout main
    merge release/v2.0 tag: "v2.0.0"
    checkout develop
    merge release/v2.0
```

---

## Branch Naming Convention

| Branch Pattern | Purpose | Merges Into |
|----------------|---------|-------------|
| `main` | Production-ready code | — |
| `develop` | Integration branch | `main` (via release) |
| `feature/*` | New features | `develop` |
| `release/*` | Release preparation | `main`, `develop` |
| `hotfix/*` | Urgent production fixes | `main`, `develop` |

---

## Deployment Flow (Text)

```
Git Push (feature/*)
      │
      ▼
Pull Request → develop
      │
      ▼
Git Flow Release Branch (release/x.x)
      │
      ▼
Jenkins Pipeline Triggered
      │
      ├── 1. Checkout Code
      ├── 2. npm ci (install dependencies)
      ├── 3. npm run lint (code quality)
      ├── 4. npm run build (Vite production build)
      ├── 5. docker build (multi-stage)
      ├── 6. Deploy to EC2 (Ansible/Docker)
      ├── 7. Invalidate CloudFront Cache
      └── 8. Tag release (vX.X.X)
      │
      ▼
Git Tag pushed → Release created on GitHub
      │
      ▼
Production Live on CloudFront + EC2
```
