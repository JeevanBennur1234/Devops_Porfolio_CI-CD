# CI/CD Workflow Documentation

This document provides a detailed walkthrough of how every tool in our DevOps pipeline works together, from a developer writing code to the end user seeing the deployed website.

---

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Tool-by-Tool Breakdown](#tool-by-tool-breakdown)
3. [Pipeline Stages Explained](#pipeline-stages-explained)
4. [Docker Workflow](#docker-workflow)
5. [AWS Deployment Workflow](#aws-deployment-workflow)
6. [Ansible Workflow](#ansible-workflow)
7. [Monitoring & Notifications](#monitoring--notifications)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Workflow Overview

The complete CI/CD workflow follows this path:

```
Developer → Git Push → GitHub → Webhook → Jenkins → Build → Test → Docker → Deploy to AWS → Users
```

**Key Principle**: Every step is automated. Once a developer pushes code, no manual intervention is required until the site is live.

---

## Tool-by-Tool Breakdown

### 1. Git & GitHub (Version Control)

**Purpose**: Track code changes, collaborate, and trigger automated pipelines.

**How we use it**:
- All source code is stored in the GitHub repository: `JeevanBennur1234/devops-portfolio-cicd`
- We use a **feature branch workflow**:
  - `main` — Production-ready code
  - `feature/*` — Feature development branches
- A **GitHub Webhook** is configured to notify Jenkins on every `push` event to `main`

**Key Commands**:
```bash
# Create a feature branch
git checkout -b feature/new-section

# Make changes, commit, and push
git add .
git commit -m "feat: add new portfolio section"
git push origin feature/new-section

# Merge to main (via Pull Request or CLI)
git checkout main
git merge feature/new-section
git push origin main  # This triggers the Jenkins pipeline!
```

---

### 2. Jenkins (CI/CD Orchestrator)

**Purpose**: Automate the entire build, test, and deployment process.

**How we use it**:
- Jenkins reads the `Jenkinsfile` from the repository root
- The pipeline is defined using **Declarative Pipeline** syntax
- It runs 8 stages sequentially with proper error handling

**Jenkins Configuration**:
- **Plugins Required**: Git, NodeJS, Pipeline, Docker Pipeline, AWS Credentials
- **Credentials Stored**: AWS Access Key + Secret Key (ID: `aws-portfolio-credentials`)
- **Pipeline Trigger**: GitHub webhook or manual "Build Now"

**Pipeline Flow**:
```
Checkout → npm ci → npm run lint → npm run build → Docker Build → S3 Deploy → CloudFront Invalidate → Notify
```

---

### 3. Docker (Containerization)

**Purpose**: Package the application into a portable, reproducible container.

**How we use it**:
- **Multi-stage Dockerfile**:
  - Stage 1 (`builder`): Uses `node:20-alpine` to install dependencies and build the React app
  - Stage 2 (`production`): Uses `nginx:1.27-alpine` to serve the static files
- This produces a **lightweight ~25MB image** (compared to ~1GB with Node.js)

**Docker Commands**:
```bash
# Build the Docker image
docker build -t devops-portfolio .

# Run the container
docker run -d -p 80:80 --name portfolio devops-portfolio

# Using Docker Compose
docker compose up -d --build

# View running containers
docker ps

# Stop and remove
docker compose down
```

---

### 4. AWS (Cloud Deployment)

**Purpose**: Host the production website with global CDN and HTTPS.

**Services Used**:
| Service | Purpose | Cost |
|---------|---------|------|
| **S3** | Static file hosting | Free Tier: 5GB storage |
| **CloudFront** | CDN + HTTPS | Free Tier: 1TB/month transfer |
| **IAM** | Access management | Always free |

**Deployment Flow**:
```
Jenkins → AWS CLI → S3 Bucket (upload files) → CloudFront (invalidate cache) → Users see new version
```

---

### 5. Ansible (Configuration Management)

**Purpose**: Automate server provisioning and application deployment.

**How we use it**:
- **Inventory file**: Defines target servers (EC2 instances)
- **setup-server.yml**: Installs Docker, Node.js, and Nginx on the server
- **deploy.yml**: Pulls the Docker image and runs the container

**When to use Ansible**:
- When deploying to EC2 instances instead of S3
- When you need to configure multiple servers identically
- When you want infrastructure-as-code for server setup

---

## Pipeline Stages Explained

### Stage 1: Checkout Code
```groovy
stage('1. Checkout Code') {
    steps {
        checkout scm
    }
}
```
- Jenkins clones the latest code from GitHub
- Uses the SCM (Source Code Management) configuration from the Jenkins job

### Stage 2: Install Dependencies
```groovy
stage('2. Install Dependencies') {
    steps {
        sh 'npm ci'
    }
}
```
- `npm ci` is used instead of `npm install` because:
  - It's faster (skips package resolution)
  - It's deterministic (uses exact versions from `package-lock.json`)
  - It fails if `package-lock.json` is out of sync

### Stage 3: Run Tests
```groovy
stage('3. Run Tests') {
    steps {
        sh 'npm run lint'
    }
}
```
- Runs ESLint to check code quality
- If linting fails, the entire pipeline stops (fail fast principle)

### Stage 4: Build React App
```groovy
stage('4. Build React App') {
    steps {
        sh 'npm run build'
    }
}
```
- Vite compiles the React app into optimized static files
- Output goes to the `dist/` directory
- Includes minification, tree-shaking, and code splitting

### Stage 5: Docker Build
```groovy
stage('5. Docker Build') {
    steps {
        sh 'docker build -t devops-portfolio .'
    }
}
```
- Builds the multi-stage Docker image
- Tags it as `devops-portfolio:latest`

### Stage 6: Deploy to AWS S3
```groovy
stage('6. Deploy to AWS S3') {
    steps {
        withCredentials([aws(...)]) {
            sh './scripts/deploy.sh'
        }
    }
}
```
- Uses Jenkins Credentials Binding to securely inject AWS keys
- The `deploy.sh` script syncs files to S3 with proper caching headers

### Stage 7: Invalidate CloudFront
```groovy
stage('7. Invalidate CloudFront Cache') {
    steps {
        withCredentials([aws(...)]) {
            sh './scripts/cloudfront-invalidate.sh'
        }
    }
}
```
- Creates a CloudFront invalidation for all paths (`/*`)
- This ensures users see the latest version immediately

### Stage 8: Notifications (Post-Build)
```groovy
post {
    success { /* Send success email/Slack */ }
    failure { /* Send failure email/Slack */ }
}
```
- Runs after all stages complete
- Sends notifications based on build result

---

## Docker Workflow

### Multi-Stage Build Process

```
┌─────────────────────────────────────────────┐
│  Stage 1: Builder (node:20-alpine)          │
│  ┌───────────────────────────────────────┐  │
│  │  1. Copy package.json + lock file     │  │
│  │  2. Run npm ci                        │  │
│  │  3. Copy source code                  │  │
│  │  4. Run npm run build                 │  │
│  │  5. Output: /app/dist/               │  │
│  └───────────────────────────────────────┘  │
└─────────────────┬───────────────────────────┘
                  │ COPY --from=builder /app/dist
                  ▼
┌─────────────────────────────────────────────┐
│  Stage 2: Production (nginx:1.27-alpine)    │
│  ┌───────────────────────────────────────┐  │
│  │  1. Copy nginx.conf                   │  │
│  │  2. Copy built files to /usr/share/   │  │
│  │     nginx/html                        │  │
│  │  3. Expose port 80                    │  │
│  │  4. Start nginx                       │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

Final Image Size: ~25MB (vs ~1GB with Node.js)
```

### Why Multi-Stage?
- **Security**: No Node.js, npm, or source code in the production image
- **Size**: ~25MB vs ~1GB — faster deployments, less attack surface
- **Performance**: Nginx serves static files 10x faster than Node.js

---

## AWS Deployment Workflow

### Step-by-Step AWS Setup

1. **Create S3 Bucket**: Enable static website hosting
2. **Configure Bucket Policy**: Allow public read access
3. **Create CloudFront Distribution**: Point to S3 origin
4. **Create IAM User**: Generate access keys for Jenkins
5. **Configure Jenkins**: Add AWS credentials

### S3 Deployment Script (`deploy.sh`)
```bash
# Sync all files except index.html (cache for 1 year)
aws s3 sync dist/ s3://$S3_BUCKET_NAME --delete \
  --cache-control "public, max-age=31536000"

# Upload index.html separately (no cache)
aws s3 cp dist/index.html s3://$S3_BUCKET_NAME/index.html \
  --cache-control "no-cache, no-store, must-revalidate"
```

### CloudFront Invalidation Script
```bash
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths "/*"
```

---

## Monitoring & Notifications

### Jenkins Build Notifications
- **Email**: Configured in Jenkins post-build actions
- **Slack**: Using Slack Notification Plugin

### Health Checks
- **Docker**: Built-in `HEALTHCHECK` in Dockerfile (pings localhost every 30s)
- **CloudFront**: AWS monitors origin health automatically

---

## Troubleshooting Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `npm ci` fails | `package-lock.json` out of sync | Run `npm install` locally and commit the lock file |
| Docker build fails | Missing `.dockerignore` | Ensure `.dockerignore` excludes `node_modules` |
| S3 deploy fails | Invalid AWS credentials | Check Jenkins credentials store |
| CloudFront not updating | Cache not invalidated | Run the invalidation script manually |
| Site shows old version | Browser cache | Hard refresh (Ctrl+Shift+R) or wait for cache expiry |
