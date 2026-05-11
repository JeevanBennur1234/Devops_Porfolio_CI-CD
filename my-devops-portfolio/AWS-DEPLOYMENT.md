# AWS Deployment Guide

This document provides a comprehensive guide to the AWS deployment strategy, service selection rationale, security configuration, and cost analysis for the DevOps Portfolio project.

---

## Table of Contents

1. [Deployment Strategy](#deployment-strategy)
2. [AWS Services Used](#aws-services-used)
3. [Service Selection Rationale](#service-selection-rationale)
4. [Architecture Diagram](#architecture-diagram)
5. [Security Configuration](#security-configuration)
6. [Cost Analysis (Free Tier)](#cost-analysis-free-tier)
7. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
8. [Deployment Scripts](#deployment-scripts)
9. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Deployment Strategy

We use a **Static Website Hosting** strategy with a **CDN-first approach**:

```
S3 (Origin) → CloudFront (CDN + HTTPS) → End Users
```

### Why This Strategy?

| Approach | Pros | Cons |
|----------|------|------|
| **S3 + CloudFront (Chosen)** | Serverless, auto-scaling, HTTPS, global CDN, low cost | No server-side rendering |
| EC2 Instance | Full server control, SSR support | Requires server management, patching, scaling |
| Elastic Beanstalk | Easy deployment, managed infrastructure | Overkill for a static site |
| AWS Amplify | Git-based deployment, built-in CI/CD | Less control over pipeline |

**Decision**: Since our React portfolio is a **static Single Page Application (SPA)**, S3 + CloudFront is the most cost-effective, performant, and scalable solution.

---

## AWS Services Used

### Primary Services

| Service | Role | Why We Chose It |
|---------|------|-----------------|
| **Amazon S3** | Static file storage & hosting | Purpose-built for static websites, 99.999999999% durability |
| **Amazon CloudFront** | Content Delivery Network (CDN) | Global edge locations, HTTPS support, DDoS protection |
| **AWS IAM** | Identity & Access Management | Secure, least-privilege access for Jenkins deployments |

### Supporting Services

| Service | Role |
|---------|------|
| **AWS CLI** | Command-line tool used by Jenkins to deploy |
| **AWS Certificate Manager (ACM)** | Free SSL/TLS certificate for HTTPS (if using custom domain) |
| **Route 53** | DNS management (optional, if using custom domain) |

---

## Service Selection Rationale

### Amazon S3 — Why?
1. **99.999999999% (11 9's) durability** — Your files are virtually never lost
2. **Static Website Hosting** — Built-in feature for serving HTML/CSS/JS
3. **Free Tier** — 5GB storage, 20,000 GET requests/month
4. **No Server Management** — Zero maintenance, zero patching
5. **Pay-as-you-go** — Only pay for what you use (after Free Tier)

### Amazon CloudFront — Why?
1. **500+ Edge Locations** — Content served from the nearest location to the user
2. **HTTPS by Default** — Free SSL with AWS Certificate Manager
3. **DDoS Protection** — Built-in AWS Shield Standard
4. **Caching** — Reduces S3 requests and improves load times
5. **Free Tier** — 1TB data transfer out, 10M HTTP requests/month

### AWS IAM — Why?
1. **Least Privilege Principle** — Jenkins only gets the permissions it needs
2. **No Root Account Usage** — Separate IAM user for deployments
3. **Access Keys** — Programmatic access for Jenkins CI/CD
4. **Audit Trail** — AWS CloudTrail logs all IAM actions

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS Cloud                                 │
│                                                                   │
│  ┌─────────┐    ┌──────────────┐    ┌──────────────────────┐    │
│  │   IAM   │    │  CloudFront  │    │    S3 Bucket          │    │
│  │  User   │    │   (CDN)      │    │  (Static Hosting)     │    │
│  │         │    │              │    │                        │    │
│  │ Jenkins │    │  HTTPS ──────┼───▶│  index.html           │    │
│  │ Deploy  │    │  Global CDN  │    │  assets/js/css        │    │
│  │ Access  │    │  DDoS Shield │    │  images               │    │
│  └────┬────┘    └──────┬───────┘    └──────────┬─────────────┘    │
│       │                │                        │                 │
│       │         ┌──────┴───────┐                │                 │
│       │         │   Users      │                │                 │
│       │         │  (Globally)  │                │                 │
│       │         └──────────────┘                │                 │
│       │                                         │                 │
│       └────── aws s3 sync ─────────────────────┘                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security Configuration

### IAM Policy (Least Privilege for Jenkins)

The Jenkins IAM user should have ONLY these permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3DeployAccess",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-portfolio-bucket-name",
                "arn:aws:s3:::your-portfolio-bucket-name/*"
            ]
        },
        {
            "Sid": "CloudFrontInvalidation",
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation",
                "cloudfront:ListInvalidations"
            ],
            "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
        }
    ]
}
```

### S3 Bucket Policy (Public Read for Website)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-portfolio-bucket-name/*"
        }
    ]
}
```

### Security Best Practices
- ✅ **Never use root account** for deployments
- ✅ **Rotate access keys** every 90 days
- ✅ **Use Jenkins Credentials Store** — never hardcode keys
- ✅ **Enable S3 bucket versioning** — rollback capability
- ✅ **Enable CloudTrail** — audit all AWS API calls
- ✅ **Block public access** on S3 (let CloudFront serve content via OAI)

---

## Cost Analysis (Free Tier)

### Free Tier Eligibility (First 12 Months)

| Service | Free Tier Limit | Our Estimated Usage | Cost |
|---------|----------------|---------------------|------|
| **S3 Storage** | 5 GB | ~50 MB | **$0.00** |
| **S3 Requests** | 20,000 GET/month | ~5,000/month | **$0.00** |
| **CloudFront Transfer** | 1 TB/month | ~5 GB/month | **$0.00** |
| **CloudFront Requests** | 10M HTTP/month | ~50,000/month | **$0.00** |
| **Route 53** | Not included | 1 hosted zone | **$0.50/month** |
| | | **Total Estimated** | **$0.00 - $0.50/month** |

### After Free Tier Expires

| Service | Pricing | Estimated Monthly Cost |
|---------|---------|----------------------|
| S3 | $0.023/GB | ~$0.01 |
| CloudFront | $0.085/GB | ~$0.43 |
| **Total** | | **~$0.50/month** |

> **Bottom Line**: This deployment costs effectively **$0/month** on Free Tier and less than **$1/month** after.

---

## Step-by-Step Setup Guide

### 1. Create S3 Bucket
```bash
# Create the bucket
aws s3 mb s3://your-portfolio-bucket-name --region us-east-1

# Enable static website hosting
aws s3 website s3://your-portfolio-bucket-name \
  --index-document index.html \
  --error-document index.html
```

### 2. Configure Bucket Policy
- Go to S3 Console → Your Bucket → Permissions → Bucket Policy
- Paste the bucket policy JSON from the Security section above

### 3. Create CloudFront Distribution
- Go to CloudFront Console → Create Distribution
- Origin Domain: `your-portfolio-bucket-name.s3.amazonaws.com`
- Default Root Object: `index.html`
- Viewer Protocol Policy: **Redirect HTTP to HTTPS**
- Note down the Distribution ID

### 4. Create IAM User for Jenkins
```bash
# Create the user
aws iam create-user --user-name jenkins-deployer

# Attach the custom policy
aws iam put-user-policy --user-name jenkins-deployer \
  --policy-name portfolio-deploy-policy \
  --policy-document file://iam-policy.json

# Create access keys
aws iam create-access-key --user-name jenkins-deployer
```

### 5. Configure Jenkins Credentials
- Go to Jenkins → Manage Jenkins → Credentials → Global → Add Credentials
- Kind: **AWS Credentials**
- ID: `aws-portfolio-credentials`
- Access Key ID: (from step 4)
- Secret Access Key: (from step 4)

---

## Deployment Scripts

### `scripts/deploy.sh`
Syncs the built files to S3 with intelligent caching:
- Static assets (JS, CSS, images): Cached for 1 year (Vite hashes filenames)
- `index.html`: No cache (always serves the latest version)

### `scripts/cloudfront-invalidate.sh`
Creates a CloudFront invalidation for all paths (`/*`) to clear edge caches immediately.

---

## Monitoring & Maintenance

### Health Monitoring
- **CloudFront**: Monitor via AWS Console → CloudFront → Distribution → Monitoring tab
- **S3**: Enable S3 access logging for traffic analysis
- **Jenkins**: Check build history for deployment success/failure

### Rollback Strategy
1. **S3 Versioning**: Enable versioning on the bucket for automatic rollback
2. **Jenkins**: Re-run a previous successful build
3. **Git**: Revert the commit and push → triggers a new deployment

### Maintenance Checklist
- [ ] Rotate IAM access keys every 90 days
- [ ] Review CloudFront cache behavior quarterly
- [ ] Monitor AWS billing dashboard for unexpected charges
- [ ] Update SSL certificate before expiry (ACM auto-renews)
