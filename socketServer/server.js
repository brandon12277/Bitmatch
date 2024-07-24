const express = require('express');
const http = require('http');
const  { Server } = require('socket.io');


const PORT = process.env.PORT || 5000;

const app = express();




const server = http.createServer(app);


const io = new Server(server, {
  cors: true,
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomID) => {
    console.log(`User joined room: ${roomID}`);
    socket.join(roomID); 
  });

  socket.on('recieveMsg',({ room, message,userid }) => {
    console.log("message : ",message)
    socket.broadcast.to(room).emit('sendMsg', { message, userid });
  })

  socket.on('recieveImgMsg',({ room, message,userid })=>{
    console.log(message)
    
    socket.broadcast.to(room).emit('sendImgMsg', {message, userid });
  })

  socket.on('recieveForumMsg',({ roomId, curr_msg , username ,user_img }) => {
    console.log("message : ",curr_msg,roomId)
    socket.broadcast.emit('sendForumMsg', { curr_msg,username,user_img });
  })

  socket.on('joinForum', (roomID) => {
    console.log(`User joined room: ${roomID}`);
    socket.join(roomID); 
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
