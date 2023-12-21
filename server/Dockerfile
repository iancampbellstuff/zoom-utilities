# syntax=docker/dockerfile:1

FROM node:18.14.2 AS install-common
WORKDIR /src/common
COPY common .
RUN npm install

FROM install-common AS start-server
# common
WORKDIR /src/common
COPY ../common .
# server
WORKDIR /src/server
COPY server .
RUN npm install
RUN npm run build
# start server
EXPOSE 3000
CMD ["npm", "start"]
