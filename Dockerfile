FROM node:11

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build:prod

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]