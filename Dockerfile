FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm

RUN npm i --save-dev @swc/cli @swc/core

RUN npm install


COPY . .

RUN nest start -b swc -w

# Production
FROM node:alpine as production 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
