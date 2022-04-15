const socket=io("http://localhost:8000");

let messagebox=document.getElementById("messagesendid");
let buttonbox=document.getElementById("buttonsendid");
let messagecontainer=document.getElementById("container");
let buttonsendid=document.getElementById("buttonsendid");
let messagesendid=document.getElementById('messagesendid');

var audio=new Audio('dsx.mp3');
append=(message,position)=>
{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    console.log(message);
    if(position=='message-left')
    {
        audio.play();
    }
    
}


let name=prompt("Enter Your Name to Initiate Chat");

socket.emit("new user Joined",name);

socket.on("user-joined",data=>
{
   append(`${data} joined the chat `,"message-right");

})

socket.on("receive",(data)=>
{
   append(`${data.name}: ${data.message} `,"message-left");
   
console.log(data);

})
socket.on("left",(data)=>
{
   append(`${data} has left the chat`,"message-left");
   
console.log(data);

})

buttonsendid.addEventListener('click',()=>
{
    console.log(messagesendid.value);
    append(`You: ${messagesendid.value}`,"message-right");
    
   socket.emit("send",messagesendid.value);
   messagesendid.value="";

})


 