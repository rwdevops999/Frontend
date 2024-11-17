FROM node:alpine

WORKDIR  /app

COPY package*.json  ./

RUN npm install

COPY . .
COPY config_dev.json ./public/config.json

EXPOSE 5173

CMD [ "npm", "run", "dev" ]