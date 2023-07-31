FROM jenkins/agent:jdk11
USER root
RUN apt-get update && \
    apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs
RUN npx playwright install-deps
USER jenkins
RUN npx playwright install