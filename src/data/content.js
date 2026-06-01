export const portfolioContent = {

  // ----- HERO SECTION -----
  hero: {
    name: "Alex Rivera",
    title: "DevOps Engineer | Cloud Architect | CI/CD",
    description: "I build robust, scalable, and secure cloud infrastructure. Passionate about automating everything and optimizing CI/CD delivery pipelines.",
    resumeLink: "/resume.pdf",
  },

  // ----- STATS BAR (shown between Hero and About) -----
  // All values support count-up animation. Set to 0 to hide.
  stats: {
    experience: { label: "Years Experience", value: 6 },
    projects: { label: "Projects Completed", value: 20 },
    certifications: { label: "Certifications", value: 3 },
    tools: { label: "Tools & Technologies", value: 30 },
  },

  // ----- ABOUT SECTION -----
  about: {
    text: [
      "Hello! I'm a DevOps Engineer with a passion for streamlining software development and IT operations. I specialize in designing and managing scalable cloud architectures across AWS, GCP, and Azure.",
      "My journey started as a backend developer, which gave me a deep understanding of application lifecycles. I transitioned to DevOps to focus on the bigger picture: how code gets from a developer's machine to production safely, quickly, and reliably.",
      "When I'm not writing Terraform scripts or debugging Kubernetes clusters, you can find me exploring new open-source tools or contributing to tech communities."
    ],
    // Optional: replace with your own image path or keep the Server icon
    image: null,
  },

  // ----- SKILLS SECTION -----
  // Items can be strings (icon-only) or { name, level } for progress bars.
  // Level is 0-100. Icon support: AWS, GCP, Azure, Linux, Docker, Kubernetes,
  // Helm, Jenkins, GitHub Actions, GitLab CI, Terraform, Ansible, Prometheus,
  // Grafana, Python, Bash, Go, Node.js, Git. Add more in Skills.jsx iconMap.
  skills: [
    {
      category: "Cloud & Infrastructure",
      items: [
        { name: "AWS", level: 95 },
        { name: "GCP", level: 80 },
        { name: "Azure", level: 70 },
        { name: "Linux", level: 90 },
      ]
    },
    {
      category: "Containers & Orchestration",
      items: [
        { name: "Docker", level: 95 },
        { name: "Kubernetes", level: 90 },
        { name: "Helm", level: 80 },
        { name: "ECS", level: 75 },
      ]
    },
    {
      category: "CI/CD & Automation",
      items: [
        { name: "Jenkins", level: 90 },
        { name: "GitHub Actions", level: 85 },
        { name: "GitLab CI", level: 80 },
        { name: "ArgoCD", level: 75 },
      ]
    },
    {
      category: "Infrastructure as Code",
      items: [
        { name: "Terraform", level: 95 },
        { name: "Ansible", level: 85 },
        { name: "CloudFormation", level: 75 },
        { name: "Packer", level: 70 },
      ]
    },
    {
      category: "Monitoring & Logging",
      items: [
        { name: "Prometheus", level: 85 },
        { name: "Grafana", level: 85 },
        { name: "ELK Stack", level: 80 },
        { name: "Datadog", level: 70 },
      ]
    },
    {
      category: "Programming & Scripting",
      items: [
        { name: "Python", level: 90 },
        { name: "Bash", level: 90 },
        { name: "Go", level: 70 },
        { name: "Node.js", level: 75 },
      ]
    },
  ],

  // ----- PROJECTS SECTION -----
  // Add details for the project modal or set to null to skip.
  projects: [
    {
      title: "Automated CI/CD Pipeline for Microservices",
      description: "Designed and implemented a fully automated CI/CD pipeline using Jenkins, Docker, and Kubernetes for a suite of 10+ microservices.",
      tech: ["Jenkins", "Kubernetes", "Docker", "Helm"],
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#",
      details: "Built a robust CI/CD pipeline serving 10+ microservices across multiple environments. Integrated automated testing, security scanning, and rollback capabilities. Reduced deployment time from 2 hours to under 15 minutes.",
      screenshots: []
    },
    {
      title: "Multi-Region AWS Infrastructure Deployment",
      description: "Provisioned highly available, multi-region architecture using Terraform, reducing disaster recovery RTO by 80%.",
      tech: ["Terraform", "AWS EC2", "VPC", "Route53"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#",
      details: "Designed and deployed a multi-region AWS architecture supporting active-active failover. Implemented infrastructure-as-code using Terraform modules, achieving consistent, repeatable deployments across us-east-1 and eu-west-1.",
      screenshots: []
    },
    {
      title: "Kubernetes Cluster Monitoring Stack",
      description: "Deployed a comprehensive monitoring solution using Prometheus and Grafana to track cluster health, resource usage, and application metrics.",
      tech: ["Kubernetes", "Prometheus", "Grafana", "AlertManager"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#",
      details: "Set up a full observability stack on a production Kubernetes cluster. Configured custom alerting rules, dashboard templates, and SLO tracking. Achieved 99.9% uptime visibility with automated incident response.",
      screenshots: []
    },
    {
      title: "Serverless Image Processing Application",
      description: "Built an event-driven application using AWS Lambda and S3 to automatically resize and optimize user-uploaded images.",
      tech: ["AWS Lambda", "S3", "Python", "API Gateway"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#",
      details: "Created a serverless image processing pipeline triggered by S3 upload events. Uses Sharp for on-the-fly image optimization, supports WebP conversion, and served through CloudFront CDN for low-latency delivery worldwide.",
      screenshots: []
    }
  ],

  // ----- EXPERIENCE SECTION -----
  experience: [
    {
      role: "Senior DevOps Engineer",
      company: "Tech Innovations Inc.",
      duration: "Jan 2022 - Present",
      achievements: [
        "Led the migration of legacy monolithic applications to Kubernetes, improving scalability and reducing infrastructure costs by 30%.",
        "Implemented GitOps practices using ArgoCD, increasing deployment frequency by 50% without downtime.",
        "Mentored junior engineers and established infrastructure as code best practices across the engineering department."
      ]
    },
    {
      role: "DevOps Engineer",
      company: "Cloud Solutions LLC",
      duration: "Mar 2019 - Dec 2021",
      achievements: [
        "Managed AWS infrastructure using Terraform and configuration management with Ansible.",
        "Built and maintained CI/CD pipelines in GitLab CI, reducing build times by 40%.",
        "Set up centralized logging and monitoring using the ELK stack."
      ]
    }
  ],

  // ----- EDUCATION SECTION -----
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2015 - 2019"
    }
  ],

  // ----- CERTIFICATIONS -----
  certifications: [
    { name: "AWS Certified Solutions Architect - Associate", year: "2021" },
    { name: "Certified Kubernetes Administrator (CKA)", year: "2022" },
    { name: "HashiCorp Certified: Terraform Associate", year: "2023" }
  ],

  // ----- TESTIMONIALS SECTION -----
  // Add as many as you like. Set rating 1-5. Set to [] to hide section.
  testimonials: [
    {
      text: "John is an exceptional DevOps engineer. He transformed our deployment pipeline from a manual, error-prone process into a fully automated, reliable system. Our team's velocity increased dramatically.",
      name: "Sarah Chen",
      role: "Engineering Manager at TechCorp",
      rating: 5,
    },
    {
      text: "Working with John on our Kubernetes migration was a game-changer. His deep knowledge of container orchestration and infrastructure as code made the transition seamless.",
      name: "Mike Rodriguez",
      role: "Senior Software Engineer",
      rating: 5,
    },
    {
      text: "John's approach to monitoring and observability helped us identify and resolve issues before they impacted our users. His Grafana dashboards are works of art.",
      name: "Emily Watson",
      role: "Platform Engineer",
      rating: 4,
    },
  ],

  // ----- BLOG SECTION -----
  // Write blog post content in Markdown. Tags are optional.
  blog: [
    {
      title: "Building a Production-Grade CI/CD Pipeline with Jenkins and Kubernetes",
      date: "2024-12-15",
      excerpt: "A step-by-step guide to setting up a scalable CI/CD pipeline that automatically builds, tests, and deploys containerized applications to Kubernetes.",
      tags: ["Jenkins", "Kubernetes", "CI/CD"],
      content: `## Why a Robust CI/CD Pipeline Matters

In modern software development, a well-designed CI/CD pipeline is the backbone of rapid, reliable delivery. This guide walks through building a production-grade pipeline that I've used across multiple teams.

## Architecture Overview

The pipeline consists of four key stages:

1. **Source** — GitHub webhook triggers the pipeline on push
2. **Build** — Jenkins agent compiles code and runs tests
3. **Package** — Docker image is built and pushed to registry
4. **Deploy** — Helm chart deploys the new image to Kubernetes

## Key Learnings

- **Immutable artifacts**: Build once, promote across environments
- **Fail fast**: Early test stages catch issues before expensive builds
- **Rollback strategy**: Keep the last N successful deployments
`
    },
    {
      title: "Terraform Best Practices for Multi-Environment Deployments",
      date: "2024-11-20",
      excerpt: "Learn how to structure Terraform code for managing dev, staging, and production environments with confidence.",
      tags: ["Terraform", "IaC", "AWS"],
      content: `## The Problem with Terraform at Scale

As infrastructure grows, managing Terraform across multiple environments becomes challenging without proper structure.

## Recommended Structure

\`\`\`hcl
environments/
├── dev/
│   └── main.tf
├── staging/
│   └── main.tf
└── prod/
    └── main.tf
modules/
├── networking/
├── compute/
└── database/
\`\`\`

## State Management

Use remote state backends (S3 + DynamoDB) with proper locking to prevent concurrent modifications.

## Workspaces vs Directories

For most teams, separate directory structures are preferable to workspaces — they provide clearer isolation between environments.
`
    },
    {
      title: "Monitoring Kubernetes Clusters with Prometheus and Grafana",
      date: "2024-10-05",
      excerpt: "Setting up comprehensive monitoring for your Kubernetes clusters using open-source tools.",
      tags: ["Kubernetes", "Monitoring", "Prometheus"],
      content: `## Why Monitor Kubernetes?

Kubernetes clusters are dynamic — pods come and go, nodes scale up and down. Traditional monitoring approaches fall short.

## Stack Components

- **Prometheus** — Metrics collection and alerting
- **Grafana** — Visualization and dashboards
- **AlertManager** — Alert routing and notification

## Setting Up kube-prometheus-stack

The easiest way to get started is with the kube-prometheus-stack Helm chart:

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack
\`\`\`

This deploys Prometheus, Grafana, AlertManager, and all necessary exporters with sensible defaults.
`
    }
  ],

  // ----- CONTACT / SOCIAL LINKS -----
  contact: {
    email: "alex.rivera@example.com",
    linkedin: "https://linkedin.com/in/alexrivera",
    github: "https://github.com/alexrivera",
    twitter: "https://twitter.com/alexrivera"
  }
};

