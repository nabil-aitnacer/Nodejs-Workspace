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
  socket.emit('newMessage',{
    from:"Nabil",
    text:"Hello World",
  createdAt:"123456"
  })
  socket.on('createMessage',function(message){
    console.log('Create Message',message)
  })
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});