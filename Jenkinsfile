pipeline {
    agent any
    
    environment {
        // Node Environment
        NODE_ENV = 'production'
        
        // AWS Configuration
        // These are set via Jenkins Credentials Binding (never hardcoded)
        AWS_DEFAULT_REGION = 'us-east-1'
        S3_BUCKET_NAME = 'your-portfolio-bucket-name' // Replace with your bucket name
        CLOUDFRONT_DIST_ID = 'YOUR_CLOUDFRONT_DISTRIBUTION_ID' // Replace with your Distribution ID
        
        // Docker Configuration
        DOCKER_IMAGE_NAME = 'devops-portfolio'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        
        // Notification Configuration
        // SLACK_CHANNEL = '#deployments'
        // NOTIFICATION_EMAIL = 'devops@example.com'
    }

    options {
        // Pipeline safeguards
        timeout(time: 15, unit: 'MINUTES')       // Abort if pipeline takes too long
        disableConcurrentBuilds()                  // Prevent parallel runs on same branch
        timestamps()                               // Add timestamps to console output
        buildDiscarder(logRotator(numToKeepStr: '10')) // Keep last 10 builds
    }

    stages {
        // ==============================================================
        // Stage 1: Checkout Source Code from GitHub
        // ==============================================================
        stage('1. Checkout Code') {
            steps {
                echo '📥 Checking out source code from GitHub...'
                checkout scm
                echo "Branch: ${env.BRANCH_NAME ?: 'main'}"
                echo "Commit: ${env.GIT_COMMIT ?: 'unknown'}"
            }
        }

        // ==============================================================
        // Stage 2: Install Node.js Dependencies
        // ==============================================================
        stage('2. Install Dependencies') {
            steps {
                echo '📦 Installing npm dependencies...'
                // npm ci is preferred over npm install for CI/CD because:
                // - It's faster (skips dependency resolution)
                // - It uses exact versions from package-lock.json
                // - It fails if package-lock.json is out of sync
                sh 'npm ci --silent'
            }
        }

        // ==============================================================
        // Stage 3: Run Code Quality Checks
        // ==============================================================
        stage('3. Run Tests') {
            steps {
                echo '🧪 Running code quality checks...'
                // Run ESLint for code quality
                sh 'npm run lint'
                // If you add unit tests later, add: sh 'npm test'
            }
        }

        // ==============================================================
        // Stage 4: Build Production React Application
        // ==============================================================
        stage('4. Build React App') {
            steps {
                echo '🏗️ Building the production bundle...'
                // Vite builds optimized static files into dist/
                // Includes: minification, tree-shaking, code-splitting
                sh 'npm run build'
                
                // Verify build output exists
                sh 'ls -la dist/'
                echo '✅ Build completed successfully!'
            }
        }

        // ==============================================================
        // Stage 5: Build Docker Image
        // ==============================================================
        stage('5. Docker Build') {
            steps {
                echo '🐳 Building Docker image...'
                // Build multi-stage Docker image
                // Stage 1: Node.js builds the React app
                // Stage 2: Nginx serves the static files
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                sh "docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_IMAGE_NAME}:latest"
                echo "✅ Docker image built: ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
            }
        }

        // ==============================================================
        // Stage 6: Deploy to AWS S3
        // ==============================================================
        stage('6. Deploy to AWS S3') {
            steps {
                echo '☁️ Deploying static files to AWS S3...'
                // Securely inject AWS credentials from Jenkins Credentials Store
                withCredentials([aws(credentialsId: 'aws-portfolio-credentials', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'chmod +x scripts/deploy.sh'
                    sh './scripts/deploy.sh'
                }
                echo '✅ Files deployed to S3 successfully!'
            }
        }

        // ==============================================================
        // Stage 7: Invalidate CloudFront CDN Cache
        // ==============================================================
        stage('7. Invalidate CloudFront Cache') {
            steps {
                echo '🔄 Invalidating CloudFront edge caches...'
                withCredentials([aws(credentialsId: 'aws-portfolio-credentials', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'chmod +x scripts/cloudfront-invalidate.sh'
                    sh './scripts/cloudfront-invalidate.sh'
                }
                echo '✅ CloudFront cache invalidated!'
            }
        }
    }
    
    // ==============================================================
    // Stage 8: Post-Build Actions (Notifications)
    // ==============================================================
    post {
        always {
            echo '🏁 Pipeline execution finished.'
            // Clean up Docker images to save space
            sh "docker rmi ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} || true"
        }
        success {
            echo '✅ Pipeline succeeded! Deployment complete.'
            // Uncomment to enable Email notifications:
            // mail to: "${NOTIFICATION_EMAIL}",
            //      subject: "✅ SUCCESS: ${currentBuild.fullDisplayName}",
            //      body: "Portfolio deployed successfully!\nBuild: ${env.BUILD_URL}"
            
            // Uncomment to enable Slack notifications (requires Slack Plugin):
            // slackSend color: 'good',
            //     message: "🚀 SUCCESS: ${env.JOB_NAME} [#${env.BUILD_NUMBER}] deployed! (${env.BUILD_URL})"
        }
        failure {
            echo '❌ Pipeline failed! Check the logs for details.'
            // Uncomment to enable Email notifications:
            // mail to: "${NOTIFICATION_EMAIL}",
            //      subject: "❌ FAILED: ${currentBuild.fullDisplayName}",
            //      body: "Pipeline failed! Check logs: ${env.BUILD_URL}"
            
            // Uncomment to enable Slack notifications:
            // slackSend color: 'danger',
            //     message: "❌ FAILED: ${env.JOB_NAME} [#${env.BUILD_NUMBER}] (${env.BUILD_URL})"
        }
    }
}
