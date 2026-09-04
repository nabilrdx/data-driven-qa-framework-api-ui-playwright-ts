pipeline {
    agent any // Tells Jenkins to run this on any available executor node

    parameters {
        // 💡 This creates the interactive dropdown menu inside the Jenkins UI!
        choice(
            name: 'TARGET_ENV', 
            choices: ['qa', 'dev', 'uat'], 
            description: 'Select the target environment server to execute tests against.'
        )
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                // Jenkins automatically pulls the code from your GitHub repository branch
                checkout scm
            }
        }

        stage('Install System Dependencies') {
            steps {
                // Installs the npm packages and downloads the required Playwright browser binaries
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Execute Test Suite') {
            steps {
                // 💡 This captures your dropdown choice (params.TARGET_ENV) 
                // and sets the 'ENV' flag right before running your tests!
                sh "ENV=${params.TARGET_ENV} npx playwright test"
            }
        }
    }

    post {
        always {
            // Generates and stores the native Playwright report within Jenkins for reviewers to click
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}