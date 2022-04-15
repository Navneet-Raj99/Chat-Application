const io=require("socket.io")(8000, {
    cors: {
      origin: '*',
    }
  })
 
const members={};
  //Socket Instance  
  //Server Side
io.on("connection",socket=> 
{
    // Calling Different Functionality in Instance 
    //Client Side
    socket.on("new user Joined",name=>
    {
        console.log(name);
        members[socket.id]=name;
        socket.broadcast.emit("user-joined",name);  // Sending message about Added user
    })
    
    socket.on("send",message=>
    {
        console.log(message);
        socket.broadcast.emit("receive",{message:message,name:members[socket.id]}); // Sending message send by one to all
    })
    socket.on('disconnect',()=>
    {
      socket.broadcast.emit("left",members[socket.id]);
      delete members[socket.id];
    })
})
