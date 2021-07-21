FROM node:14-alpine AS test
WORKDIR package
COPY . .
RUN npm i
RUN npm run lint 
CMD npm run test

FROM node:14-alpine AS package
RUN ["apk", "add", "--no-cache", "zip"]

WORKDIR /home/node
COPY --chown=node:node . .

RUN ["npm", "i"]
RUN ["mkdir", "-p", "foss-photography-client"]

ENTRYPOINT npm run build && \
           cp -r build/* /tmp/packages/foss-photography-client

FROM node:14-buster-slim
USER node
WORKDIR package
COPY --chown=node:node --from=test /package .
RUN npm i --only=prod
CMD npm run start
