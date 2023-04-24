const socketIo = require('socket.io');
const analyticsController = require('../controllers/analyticsController');

const setupSocket = (server) => {
  const io = socketIo(server);

  // Transfers real-time viewer count
  // More scalable than api, as every user would have to make an api request everytime
  // someone joined to updated viewer count
  io.on('connection', (socket) => {
    socket.on('getViewerCount', (data) => {
      analyticsController.getViewers(data).then((viewers) => {
        io.emit('setViewerCount', viewers);
      });
    });
  });
};

module.exports = setupSocket;
