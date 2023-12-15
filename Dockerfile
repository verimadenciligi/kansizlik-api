FROM node:18-alpine3.15

# create project directory
WORKDIR /usr/src/kansizlik-api

COPY . .

RUN NODE_ENV=development npm install

EXPOSE $app_port
CMD ["npm", "run", "start"]
