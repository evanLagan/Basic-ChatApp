/*const io = require('socket.io')(3000)

const users = {}

// Listen for incoming connections
io.on('connection', socket => {

  // Listen for 'new-user' event
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  // Listen for 'send-chat-message' event
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  // Listen for 'disconnect' event
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})*/

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the 'cors' package

const app = express();
app.use(cors()); // CORS middleware to allow requests from any origin

const server = http.createServer(app);
const io = socketIo(server);

const users = {};

// Listen for incoming connections
io.on('connection', socket => {

  // Listen for 'new-user' event
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });

  // Listen for 'send-chat-message' event
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });

  // Listen for 'disconnect' event
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});