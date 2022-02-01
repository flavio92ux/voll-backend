const app = require('express')();
const http = require('http').createServer(app);
const DataBase = require("./model/database");
const db = new DataBase();
var cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origins: "*"
  }
});

app.use(cors())

app.get('/', async (_req, res) => {
  data = await db.fetchMessages()
  res.json(data);
});

require('./sockets/chatSocket')(io);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}!`);
});