FROM node:8

LABEL authors="Ari Ben-Elazar <sup@ariuready.com>"

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist"]

EXPOSE 8080
