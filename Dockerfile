# build environment
FROM node:14.18.1-alpine3.14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "./src/index.js" ]
