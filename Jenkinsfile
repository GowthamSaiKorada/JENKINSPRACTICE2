    pipeline {
        agent any

        stages {

            // ===== FRONTEND BUILD =====
            stage('Build Frontend') {
                steps {
                    dir('ApartmentFrontend') {
                        bat 'npm install'
                        bat 'npm run build'
                    }
                }
            }

            // ===== FRONTEND DEPLOY =====
            stage('Deploy Frontend to Tomcat') {
                steps {
                    bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapartmentapi" (
                        rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapartmentapi"
                    )
                    mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapartmentapi"
                    xcopy /E /I /Y ApartmentFrontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapartmentapi"
                    '''
                }
            }

            // ===== BACKEND BUILD =====
            stage('Build Backend') {
                steps {
                    dir('AparatmentsSpringboot') {
                        bat 'mvn clean package'
                    }
                }
            }

            // ===== BACKEND DEPLOY =====
            stage('Deploy Backend to Tomcat') {
                steps {
                    bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\AparatmentsSpringboot.war" (
                        del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\AparatmentsSpringboot.war"
                    )
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\AparatmentsSpringboot" (
                        rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\AparatmentsSpringboot"
                    )
                    copy "AparatmentsSpringboot\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                    '''
                }
            }

        }


        post {
            success {
                echo 'Deployment Successful!'
            }
            failure {
                echo 'Pipeline Failed.'
            }
        }
    }