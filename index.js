const express  = require("express")
const http = require("http")
const socketIO = require("socket.io")
const cors = require('cors')

//creating the http server and attaching it to the sockit.io
const app = express()
app.use(cors());
const server = http.createServer(app)
const io = socketIO(server);

const port = 3000

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")

})


//creating the socket.io connection

io.on('connection',(socket)=>{
    console.log("A user is connected ")
    console.log("user id" + socket.id)

    socket.on('message', (message) => {
        console.log('Message from client:', message);
    
        // Broadcast the message to all clients
        io.emit('message', message );
      });

      socket.on('file', (data) => {
        // Broadcast the file to all connected clients
        io.emit('file', data);
      });
    
    

    socket.on('disconnect',()=>{
        console.log("user is disconnected")
    })
})


server.listen(3000,()=>{
    console.log(`server is atatred at port ${port}`)
})