pipeline {
  agent { 
    node { 
      label 'playwright-agent'
    } 
  }
  stages {
    stage('Install Playwright') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }
    stage('Help') {
      steps {
        sh 'npx playwright test --help'
      }
    }
    stage('Test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test
        '''
      }
    }
    stage('Allure report') {
      steps {
        sh 'npm run generate_allure'
      }
    }
  }
  post {
    always {
      archiveArtifacts 'allure-report/*'
    }
  }
}