# syntax=docker/dockerfile:1

ARG ROOTDIR=/usr/src/app

FROM node:20.17.0 AS install
WORKDIR $ROOTDIR
COPY . .
CMD npm ci

FROM install AS start
WORKDIR $ROOTDIR
EXPOSE 4000 8080
CMD ["npm", "start"]
