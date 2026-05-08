#!/bin/bash

# Deployment script for AWS S3
# Ensure AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and S3_BUCKET are set in the environment

if [ -z "$S3_BUCKET" ]; then
  echo "Error: S3_BUCKET environment variable is not set."
  exit 1
fi

echo "Starting deployment to S3 bucket: $S3_BUCKET"

# Sync the dist folder to S3, deleting extra files and setting the correct ACL/Cache-Control if needed
# Note: --delete ensures files removed from the build are removed from S3
aws s3 sync dist/ s3://$S3_BUCKET/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "index.html"

# Upload index.html separately with no caching so updates are seen immediately
aws s3 cp dist/index.html s3://$S3_BUCKET/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

echo "S3 Deployment completed."
