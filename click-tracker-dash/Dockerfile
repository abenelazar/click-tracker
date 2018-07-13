FROM node:8

WORKDIR /usr/src/app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

COPY . ./

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "/usr/src/app/run.sh"]
CMD ["start"]