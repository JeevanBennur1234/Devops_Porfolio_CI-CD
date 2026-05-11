#!/bin/bash
# scripts/deploy.sh
# Script to sync the build output to an AWS S3 bucket.

# Exit immediately if a command exits with a non-zero status
set -e

# Validation
if [ -z "$S3_BUCKET_NAME" ]; then
  echo "❌ ERROR: S3_BUCKET_NAME environment variable is not set."
  exit 1
fi

if [ ! -d "dist" ]; then
  echo "❌ ERROR: 'dist' directory not found. Did the build stage fail?"
  exit 1
fi

echo "🚀 Starting deployment to S3 bucket: s3://${S3_BUCKET_NAME}"

# 1. Sync all assets EXCEPT index.html (with aggressive caching)
# --delete removes files from S3 that no longer exist in the local dist/ folder
echo "📦 Syncing static assets (with caching headers)..."
aws s3 sync dist/ s3://${S3_BUCKET_NAME}/ \
  --delete \
  --exclude "index.html" \
  --cache-control "max-age=31536000, public, immutable"

if [ $? -ne 0 ]; then
    echo "❌ ERROR: Failed to sync static assets to S3."
    exit 1
fi

# 2. Upload index.html separately (with NO caching to ensure instant updates)
echo "📄 Uploading index.html (with no-cache headers)..."
aws s3 cp dist/index.html s3://${S3_BUCKET_NAME}/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

if [ $? -ne 0 ]; then
    echo "❌ ERROR: Failed to upload index.html to S3."
    exit 1
fi

echo "✅ S3 Deployment completed successfully."
