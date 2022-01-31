const app = require('express')();
const http = require('http').createServer(app);
const DataBase = require("./model/database");
const db = new DataBase();
var cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.use(cors())

app.get('/', async (_req, res) => {
  data = await db.fetchMessages()
  res.json(data);
});

require('./sockets/chatSocket')(io);

http.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});