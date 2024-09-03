FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install && yarn run build

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]