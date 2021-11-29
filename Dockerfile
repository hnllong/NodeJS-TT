FROM node:14.18.1-alpine3.14
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn
CMD ["npm", "run", "start:prod"]
