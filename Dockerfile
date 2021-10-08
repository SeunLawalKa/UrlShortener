FROM node:14

WORKDIR /urlshortener

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]

# CMD npm start