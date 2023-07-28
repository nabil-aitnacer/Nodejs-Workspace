var socket = io();
const list= document.getElementById("messages");
const createLiElement = document.createElement('li')

socket.on('connect', function () {
  console.log("browser connected");
   
});



socket.on('newMessage', function (message) {
  

    console.log('new Message', message);
    const node = document.createTextNode(message.text)
    createLiElement.appendChild(node)
    list.appendChild(createLiElement)
  });