FROM jenkins/agent:alpine-jdk11
USER root
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*
RUN apk add --update nodejs npm
USER jenkins