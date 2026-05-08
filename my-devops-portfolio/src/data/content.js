export const portfolioContent = {
  hero: {
    name: "John Doe",
    title: "DevOps Engineer | Cloud Enthusiast",
    description: "I build robust, scalable, and secure cloud infrastructure. Passionate about automating everything and optimizing delivery pipelines.",
    resumeLink: "#", // Add your resume link here
  },
  about: {
    text: [
      "Hello! I'm a DevOps Engineer with a passion for streamlining software development and IT operations. I specialize in designing and managing scalable cloud architectures.",
      "My journey started as a backend developer, which gave me a deep understanding of application lifecycles. I transitioned to DevOps to focus on the bigger picture: how code gets from a developer's machine to production safely, quickly, and reliably.",
      "When I'm not writing Terraform scripts or debugging Kubernetes clusters, you can find me exploring new open-source tools or contributing to tech communities."
    ]
  },
  skills: [
    { category: "Cloud & Infrastructure", items: ["AWS", "GCP", "Azure", "Linux"] },
    { category: "Containers & Orchestration", items: ["Docker", "Kubernetes", "Helm", "ECS"] },
    { category: "CI/CD & Automation", items: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"] },
    { category: "Infrastructure as Code", items: ["Terraform", "Ansible", "CloudFormation", "Packer"] },
    { category: "Monitoring & Logging", items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"] },
    { category: "Programming & Scripting", items: ["Python", "Bash", "Go", "Node.js"] },
  ],
  projects: [
    {
      title: "Automated CI/CD Pipeline for Microservices",
      description: "Designed and implemented a fully automated CI/CD pipeline using Jenkins, Docker, and Kubernetes for a suite of 10+ microservices.",
      tech: ["Jenkins", "Kubernetes", "Docker", "Helm"],
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Multi-Region AWS Infrastructure Deployment",
      description: "Provisioned highly available, multi-region architecture using Terraform, reducing disaster recovery RTO by 80%.",
      tech: ["Terraform", "AWS EC2", "VPC", "Route53"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Kubernetes Cluster Monitoring Stack",
      description: "Deployed a comprehensive monitoring solution using Prometheus and Grafana to track cluster health, resource usage, and application metrics.",
      tech: ["Kubernetes", "Prometheus", "Grafana", "AlertManager"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Serverless Image Processing Application",
      description: "Built an event-driven application using AWS Lambda and S3 to automatically resize and optimize user-uploaded images.",
      tech: ["AWS Lambda", "S3", "Python", "API Gateway"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=600&auto=format&fit=crop",
      github: "#",
      live: "#"
    }
  ],
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
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2015 - 2019"
    }
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect - Associate", year: "2021" },
    { name: "Certified Kubernetes Administrator (CKA)", year: "2022" },
    { name: "HashiCorp Certified: Terraform Associate", year: "2023" }
  ],
  contact: {
    email: "john.doe@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com"
  }
};
