FROM node:14

WORKDIR /usr/app

COPY package.json . 
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

ENV NODE_ENV=production

EXPOSE 80

CMD [ "yarn", "serve"]