const moment = require('moment');

const messageMoment = moment().format('DD-MM-yyyy HH:mm:ss A');
const userList = [];

const sendMessage = (chatMessage, nickname, io) => {
  io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
};

const replaceUser = (oldUser, newUser, io) => {
  userList.forEach((item, index) => {
    if (item === oldUser) userList[index] = newUser;
  });
  io.emit('refreshList', userList);
};

const disconnect = (socket, io) => {
  userList.forEach((user, i) => {
    if (user.id === socket.id) userList.splice(i, 1);
  });
  io.emit('refreshList', userList);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    const randomNick = id.substr(0, 5);

    socket.on('addArray', (user) => {
      if (!userList.includes(user)) {
        userList.push(user);
      }
    });
 
    io.emit('addNewUser', randomNick);
    io.emit('refreshList', userList);

    socket.on('message', ({ chatMessage, nickname }) => {
      sendMessage(chatMessage, nickname, io);      
    });

    socket.on('replaceUser', (oldUser, newUser) => replaceUser(oldUser, newUser, io));

    socket.on('disconnect', () => disconnect(socket, io));
  });
};
