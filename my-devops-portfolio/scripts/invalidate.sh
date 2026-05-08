#!/bin/bash

# CloudFront invalidation script
# Ensure AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and CLOUDFRONT_DIST_ID are set in the environment

if [ -z "$CLOUDFRONT_DIST_ID" ]; then
  echo "Error: CLOUDFRONT_DIST_ID environment variable is not set."
  exit 1
fi

echo "Invalidating CloudFront distribution: $CLOUDFRONT_DIST_ID"

INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

if [ $? -eq 0 ]; then
  echo "Invalidation created successfully. ID: $INVALIDATION_ID"
else
  echo "Failed to create CloudFront invalidation."
  exit 1
fi
