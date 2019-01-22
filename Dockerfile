FROM node:11

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 4200
CMD [ "npm", "start" ]