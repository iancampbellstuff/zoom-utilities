# syntax=docker/dockerfile:1

ARG ROOTDIR=/usr/src/app

FROM node:18.14.2 AS install
WORKDIR $ROOTDIR
COPY . .
RUN npm run install-all

FROM install AS start
WORKDIR $ROOTDIR
EXPOSE 4000
EXPOSE 8080
CMD ["npm", "start"]
