# build environment
FROM node:14.18.1-alpine3.14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 5000

CMD [ "node", "./src/index.js" ]

# # production environment
# FROM nginx
# COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/src /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]