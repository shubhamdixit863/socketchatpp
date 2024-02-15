const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"]
    }
  })
io.on("connection", (socket) => {
  // ...
  socket.on("message",function(data){
    console.log(data);

    socket.broadcast.emit("send",data)
  })

});

httpServer.listen(8080,function(){
    console.log("Server started")
});