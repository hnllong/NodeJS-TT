# build environment 
FROM node:14.18.1-alpine3.14 

WORKDIR /app 

RUN npm install -g pm2 

COPY ["package.json", "package-lock.json*", "./"] 

RUN npm install 

COPY . . 

RUN chown -R node:node /app 

USER node 

CMD [ "pm2", "start", "./ecosystem.config.js" ]