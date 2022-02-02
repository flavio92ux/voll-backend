FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo 'MYSQL_HOST=mysqlsrv\nMYSQL_DATABASE=ExampleDB\nMYSQL_USER=flavio\nMYSQL_PASSWORD=password\nMYSQL_TABLE=webchat\nMYSQL_PORT=3306' > .env


CMD ["npm", "start"]
