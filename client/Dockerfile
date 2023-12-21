# syntax=docker/dockerfile:1

FROM node:18.14.2 AS install-common
WORKDIR /src/common
COPY common .
RUN npm install

FROM install-common AS start-client
# common
WORKDIR /src/common
COPY ../common .
# client
WORKDIR /src/client
COPY client .
RUN npm install
RUN npx --no-install quasar build -m pwa -T all -t mat
# start client
EXPOSE 8080
CMD ["npm", "start"]
