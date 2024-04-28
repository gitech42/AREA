FROM node:latest

WORKDIR /app
RUN npm install npm@8.19.2
COPY . .
RUN npm i

EXPOSE 8081

RUN npm run build
