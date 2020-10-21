FROM node:14.10.1-alpine3.10

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

ENV PORT=7070
ENV NODE_ENV=ci
ENV TOKEN_SECRET=kneopwenklnnsvnwnvsknv213412ncnv

VOLUME /app/log

EXPOSE 7070

CMD ["npm", "start"]