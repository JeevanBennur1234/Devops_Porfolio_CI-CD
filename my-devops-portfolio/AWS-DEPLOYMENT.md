# AWS Deployment Guide

This project is configured to be deployed automatically to AWS using Jenkins.

## Architecture
- **Amazon S3**: Hosts the static production build of the React application.
- **Amazon CloudFront**: Acts as a CDN to cache content globally and enforce HTTPS.

## Deployment Process
The Jenkins pipeline automatically performs the following:
1. Installs npm dependencies.
2. Builds the React app using Vite.
3. Syncs the `dist/` directory to the configured S3 bucket using the `scripts/deploy.sh` script.
4. Invalidates the CloudFront cache using the `scripts/cloudfront-invalidate.sh` script to ensure new changes are served immediately.
