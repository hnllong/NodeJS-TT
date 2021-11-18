# build environment
FROM node:14.18.1-alpine3.14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g pm2

COPY . .

RUN chown -R node:node /app
USER node

CMD ["pm2-runtime", "ecosystem.config.js"]
