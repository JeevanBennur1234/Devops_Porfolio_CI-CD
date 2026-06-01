pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    environment {
        S3_BUCKET_NAME = 'portfolio-devops-jeevan'
        CLOUDFRONT_DIST_ID = 'E2MCM8T29VE5E7'

        DOCKER_IMAGE_NAME = 'devops-portfolio'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"

        EC2_HOST = 'YOUR_EC2_PUBLIC_IP'
        EC2_USER = 'ubuntu'
        EC2_SSH_KEY = 'ec2-ssh-key'

        VERSION_FILE = 'version.txt'

        GIT_COMMIT = ''
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        // ============================================================
        // STAGE 1: Checkout Code
        // ============================================================
        stage('1. Checkout Code') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    env.BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                }
            }
        }

        // ============================================================
        // STAGE 2: Install Dependencies
        // ============================================================
        stage('2. Install Dependencies') {
            steps {
                dir('my-devops-portfolio') {
                    sh '''
                    rm -rf node_modules
                    npm install
                    '''
                }
            }
        }

        // ============================================================
        // STAGE 3: Lint & Test
        // ============================================================
        stage('3. Lint & Test') {
            steps {
                dir('my-devops-portfolio') {
                    sh 'npm run lint'
                }
            }
        }

        // ============================================================
        // STAGE 4: Build React Application
        // ============================================================
        stage('4. Build React Application') {
            steps {
                dir('my-devops-portfolio') {
                    script {
                        def semver = readFile('../version.txt').trim()
                        def buildDate = sh(script: "date +%Y-%m-%d", returnStdout: true).trim()
                        writeFile file: 'VERSION', text: "v${semver}\nRelease Date: ${buildDate}\nBuild: ${env.BUILD_NUMBER}\n"
                    }
                    sh """
                    GIT_COMMIT=${env.GIT_COMMIT} \
                    BUILD_NUMBER=${env.BUILD_NUMBER} \
                    NODE_ENV=production npm run build
                    """
                }
            }
        }

        // ============================================================
        // STAGE 5: Docker Build & Push
        // ============================================================
        stage('5. Docker Build') {
            steps {
                script {
                    def semver = readFile(VERSION_FILE).trim()
                    dir('my-devops-portfolio') {
                        sh """
                        docker build \
                            -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \
                            -t ${DOCKER_IMAGE_NAME}:latest \
                            -t ${DOCKER_IMAGE_NAME}:${semver} \
                            .
                        """
                    }
                }
            }
        }

        // ============================================================
        // STAGE 6: Run Ansible Automation
        // ============================================================
        stage('6. Run Ansible Automation') {
            steps {
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }

        // ============================================================
        // STAGE 7: Deploy to AWS S3
        // ============================================================
        stage('7. Deploy to AWS S3') {
            steps {
                withAWS(credentials:'aws-portfolio-credentials') {
                    dir('my-devops-portfolio') {
                        sh """
                        aws s3 sync dist/ s3://portfolio-devops-jeevan/ \
                            --delete \
                            --exclude "index.html" \
                            --cache-control "max-age=31536000, public, immutable"
                        aws s3 cp dist/index.html s3://portfolio-devops-jeevan/index.html \
                            --cache-control "no-cache, no-store, must-revalidate" \
                            --content-type "text/html"
                        """
                    }
                }
            }
        }

        // ============================================================
        // STAGE 8: Deploy to EC2 via Ansible
        // ============================================================
        stage('8. Deploy to EC2') {
            when {
                expression { env.BRANCH_NAME && (env.BRANCH_NAME == 'main' || env.BRANCH_NAME.startsWith('release/')) }
            }
            steps {
                script {
                    sh """
                    docker save ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} | gzip > portfolio-image.tar.gz
                    scp -i ${EC2_SSH_KEY} portfolio-image.tar.gz ${EC2_USER}@${EC2_HOST}:/opt/devops-portfolio/
                    ssh -i ${EC2_SSH_KEY} ${EC2_USER}@${EC2_HOST} << 'EOF'
                        cd /opt/devops-portfolio
                        gunzip -c portfolio-image.tar.gz | docker load
                        docker stop devops-portfolio || true
                        docker rm devops-portfolio || true
                        docker run -d \
                            --name devops-portfolio \
                            -p 80:80 \
                            --restart unless-stopped \
                            ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                        docker image prune -f
                        rm portfolio-image.tar.gz
                        echo 'Deployment to EC2 complete'
                        docker ps --filter name=devops-portfolio
EOF
                    """
                }
            }
        }

        // ============================================================
        // STAGE 9: Verify EC2 Deployment (Health Check)
        // ============================================================
        stage('9. Verify EC2 Deployment') {
            when {
                expression { env.BRANCH_NAME && (env.BRANCH_NAME == 'main' || env.BRANCH_NAME.startsWith('release/')) }
            }
            steps {
                sh """
                sleep 5
                curl -sSf http://${EC2_HOST}/ || exit 1
                echo 'Health check passed'
                """
            }
        }

        // ============================================================
        // STAGE 10: Invalidate CloudFront Cache
        // ============================================================
        stage('10. Invalidate CloudFront Cache') {
            steps {
                withAWS(credentials:'aws-portfolio-credentials') {
                    sh """
                    aws cloudfront create-invalidation \
                        --distribution-id ${CLOUDFRONT_DIST_ID} \
                        --paths "/*"
                    echo 'CloudFront invalidation complete'
                    """
                }
            }
        }

        // ============================================================
        // STAGE 11: Version Tag & Release
        // ============================================================
        stage('11. Version Tag & Release') {
            when {
                expression { env.BRANCH_NAME && env.BRANCH_NAME.startsWith('release/') }
            }
            steps {
                script {
                    def version = readFile(VERSION_FILE).trim()
                    sh """
                    git config user.email "jenkins@devops-portfolio.com"
                    git config user.name "Jenkins CI"
                    git tag -a v${version} -m "Release v${version}"
                    git push origin v${version}
                    echo "Tagged release v${version}"
                    """
                }
            }
        }

        // ============================================================
        // STAGE 12: Performance Check (Lighthouse CI - v2.0+)
        // ============================================================
        stage('12. Performance Check') {
            when {
                expression { env.BRANCH_NAME && env.BRANCH_NAME == 'main' }
            }
            steps {
                sh '''
                echo "Running Lighthouse performance check..."
                npx lighthouse http://localhost:3000 \
                    --quiet \
                    --chrome-flags="--headless --no-sandbox" \
                    --output=json \
                    --output-path=./lighthouse-report.json || true

                echo "Performance check complete. Report saved."
                '''
            }
        }
    }

    post {
        always {
            sh '''
            docker image prune -f 2>/dev/null || true
            docker builder prune -f 2>/dev/null || true
            rm -f portfolio-image.tar.gz lighthouse-report.json
            '''
            cleanWs()
        }

        success {
            echo "Pipeline succeeded for ${env.BRANCH_NAME ?: 'unknown'}"
            script {
                if (env.BRANCH_NAME && (env.BRANCH_NAME == 'main' || env.BRANCH_NAME.startsWith('release/'))) {
                    echo "Deployment live at: https://d1b7vq4z9c.cloudfront.net"
                }
            }
        }

        failure {
            echo "Pipeline failed for ${env.BRANCH_NAME ?: 'unknown'}"
        }

        unstable {
            echo "Pipeline unstable for ${env.BRANCH_NAME ?: 'unknown'}"
        }
    }
}
