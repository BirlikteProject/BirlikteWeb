FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build; exit 0
RUN npm run build

EXPOSE 80

ENV NUXT_HOST="0"
ENV NUXT_PORT=80

RUN echo "api.birlikte.org.tr 20.105.232.5" >> /etc/hosts
RUN echo "socket.birlikte.org.tr 20.105.232.5" >> /etc/hosts

CMD [ "npm", "start" ]
