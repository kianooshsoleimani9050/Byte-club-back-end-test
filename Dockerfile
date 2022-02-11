FROM node:alpine
COPY . /app
WORKDIR /app
CMD nodmon app.js
