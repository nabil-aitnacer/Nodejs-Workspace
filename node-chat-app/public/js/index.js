var socket = io();

socket.on('connect', function () {
  console.log("browser connected");
    socket.emit('createMessage',{
        from :"Andrew",
        text:"Hello"
    })
});



socket.on('newMessage', function (message) {
  

    console.log('new Message', message);
  });