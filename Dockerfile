FROM node:14.18.1-alpine3.14

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY . .

RUN npm i

CMD ["npm", "run", "start:prod"]
