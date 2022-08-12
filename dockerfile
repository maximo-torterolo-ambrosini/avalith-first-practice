FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=$PORT

EXPOSE $PORT

CMD ["npm", "start"]