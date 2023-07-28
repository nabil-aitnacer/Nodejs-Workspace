const express = require('express');
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname,'../','public')))
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('createMessage',function(message){
    
    io.emit('newMessage',{
      from: message.from,
      text : message.text,
      createdAt : new Date().getDate()
    })
  })
  
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});