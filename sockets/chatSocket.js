const DataBase = require("../model/database");
const db = new DataBase();

const today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

today.setDate(today.getDate() + 20);

const date = ('0' + today.getDate()).slice(-2) + '-'
             + ('0' + (today.getMonth()+1)).slice(-2) + '-'
             + today.getFullYear();

const messageMoment = `${date} ${time}`;
const userList = [];

const sendMessage = async (chatMessage, nickname, io) => {
  io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
  const data = {
    message: chatMessage,
    moment: messageMoment,
    nick: nickname,
  };
  await db.storeUserMessage(data);
};

const replaceUser = (oldUser, newUser, io) => {
  userList.forEach(({ nickname }, index) => {
    if (nickname === oldUser) userList[index].nickname = newUser;
  });
  io.emit('refreshList', userList);
};

const disconnect = (socket, io) => {
  console.log(`Client ${socket.id} diconnected`);
  userList.forEach((user, i) => {
    if (user.id === socket.id) userList.splice(i, 1);
  });
  io.emit('refreshList', userList);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    const randomNick = id.substr(0, 5);

    console.log(`Client ${socket.id} connected`);

    userList.push({ id: socket.id, nickname: randomNick });

    io.emit('addNewUser', userList[userList.length - 1]);
    io.emit('refreshList', userList);

    socket.on('message', async ({ chatMessage, nickname }) => {
      await sendMessage(chatMessage, nickname, io);      
    });

    socket.on('replaceUser', ({ oldUser, newUser }) => replaceUser(oldUser, newUser, io));

    socket.on('disconnect', () => disconnect(socket, io));
  });
};
