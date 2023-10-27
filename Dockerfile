FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3001

EXPOSE $PORT

VOLUME ["/app/data"] 

CMD ["node", "dist/main.js"]