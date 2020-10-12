FROM node:alpine

WORKDIR /usr/app

COPY package.json . 
RUN yarn 
COPY . .
RUN yarn build

ENV NODE_ENV=production

CMD [ "yarn", "serve"]