FROM node:16

ENV NAME=backend
ENV APP_WORKDIR=/usr/src/$NAME/

COPY package.json $APP_WORKDIR
WORKDIR $APP_WORKDIR

RUN npm i

COPY . $APP_WORKDIR

EXPOSE 3000 5432

CMD ["npm", "run", "start:dev"]
