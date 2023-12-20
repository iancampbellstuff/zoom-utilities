FROM node:18.14.2

# Copy config.json
COPY server/config.json ./

# Install npm dependencies
RUN npm install

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]
