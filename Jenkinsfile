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
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('1. Checkout Code') {
            steps {
                checkout scm
            }
        }

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

        stage('3. Build React Application') {
            steps {
                dir('my-devops-portfolio') {
                    sh 'NODE_ENV=production npm run build'
                }
            }
        }

        stage('4. Docker Build') {
            steps {
                dir('my-devops-portfolio') {
                    sh '''
                    docker build \
                    -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .
                    '''
                }
            }
        }

        stage('5. Deploy to AWS S3') {
            steps {
                withAWS(credentials:'aws-portfolio-credentials') {
                    dir('my-devops-portfolio') {
                        sh '''
                        aws s3 sync dist s3://${S3_BUCKET_NAME} --delete
                        '''
                    }
                }
            }
        }

        stage('6. Invalidate CloudFront Cache') {
            steps {
                withAWS(credentials:'aws-portfolio-credentials') {
                    sh '''
                    aws cloudfront create-invalidation \
                    --distribution-id ${CLOUDFRONT_DIST_ID} \
                    --paths "/*"
                    '''
                }
            }
        }

        stage('7. Deploy Container') {
            steps {
                sh '''
                docker stop portfolio || true
                docker rm portfolio || true

                docker run -d \
                --name portfolio \
                -p 80:80 \
                ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}

                docker image prune -f
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished'
        }

        success {
            echo 'Pipeline succeeded'
        }

        failure {
            echo 'Pipeline failed'
        }
    }
}
