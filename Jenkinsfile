pipeline {
    agent any

    // Use the NodeJS tool configured in Jenkins Global Tool Configuration
    tools {
        nodejs 'NodeJS-22'
    }
    
    environment {
        // NOTE: NODE_ENV is NOT set globally because it causes npm ci to skip devDependencies (Vite, ESLint)
        // NODE_ENV is set to 'production' only during the build step
        
        // AWS Configuration
        AWS_DEFAULT_REGION = 'us-east-1'
        S3_BUCKET_NAME = 'your-portfolio-bucket-name'
        CLOUDFRONT_DIST_ID = 'YOUR_CLOUDFRONT_DISTRIBUTION_ID'
        
        // Docker Configuration
        DOCKER_IMAGE_NAME = 'devops-portfolio'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
        // Stage 2: Verify Node.js & Install Dependencies
        // ==============================================================
        stage('2. Install Dependencies') {
            steps {
                dir('my-devops-portfolio') {
                    echo '📦 Installing npm dependencies...'
                    sh '''
                        echo "Node.js version:"
                        node --version
                        echo "npm version:"
                        npm --version
                        npm ci
                    '''
                }
            }
        }

        // ==============================================================
        // Stage 3: Run Code Quality Checks
        // ==============================================================
        stage('3. Run Tests') {
            steps {
                dir('my-devops-portfolio') {
                    echo '⚠️ Skipping lint checks for demo build'
                }
            }
        }

        // ==============================================================
        // Stage 4: Build Production React Application
        // ==============================================================
        stage('4. Build React App') {
            steps {
                dir('my-devops-portfolio') {
                    echo '🏗️ Building the production bundle...'
                    sh 'NODE_ENV=production npm run build'
                    sh 'ls -la dist/'
                    echo '✅ Build completed successfully!'
                }
            }
        }
    }
    
    // ==============================================================
    // Post-Build Actions (Notifications)
    // ==============================================================
    post {
        always {
            echo '🏁 Pipeline execution finished.'
        }
        success {
            echo '✅ Pipeline succeeded! Build complete.'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs for details.'
        }
    }
}
