# build environment
FROM node:14 as builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "./src/index.js" ]

# # production environment
# FROM nginx
# COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/src /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]