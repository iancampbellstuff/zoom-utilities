# syntax=docker/dockerfile:1

FROM node:20 AS environment
ENV NPM_VERSION=10.5.1
ENV ROOTDIR=/usr/src/app

FROM environment AS version
# @see https://github.com/npm/cli/issues/7563
RUN npm i -g npm@$NPM_VERSION

FROM version AS install
WORKDIR $ROOTDIR
COPY . .
RUN npm ci

FROM install AS start
WORKDIR $ROOTDIR
EXPOSE 4000 8080
CMD npm start
