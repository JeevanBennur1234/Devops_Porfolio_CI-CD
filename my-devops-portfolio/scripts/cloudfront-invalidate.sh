#!/bin/bash
# scripts/cloudfront-invalidate.sh
# Script to invalidate CloudFront edge caches.

# Exit immediately if a command exits with a non-zero status
set -e

if [ -z "$CLOUDFRONT_DIST_ID" ]; then
  echo "❌ ERROR: CLOUDFRONT_DIST_ID environment variable is not set."
  exit 1
fi

echo "🔄 Invalidating CloudFront distribution: ${CLOUDFRONT_DIST_ID}"

# Create invalidation for all paths (/*)
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DIST_ID}" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

if [ $? -eq 0 ]; then
  echo "✅ Invalidation created successfully. ID: ${INVALIDATION_ID}"
  
  # Optional: Wait for invalidation to complete (can take a few minutes)
  # echo "⏳ Waiting for invalidation to complete..."
  # aws cloudfront wait invalidation-completed \
  #  --distribution-id "${CLOUDFRONT_DIST_ID}" \
  #  --id "${INVALIDATION_ID}"
  # echo "✅ Invalidation finished."
else
  echo "❌ ERROR: Failed to create CloudFront invalidation."
  exit 1
fi
