var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
const jsonToObjectMiddleware = require('./core/middlewares/json_to_object')

//nome do evento //socket = client
io.on('connection', (socket) => {
  // console.log(socket)
  // console.log(socket.id)

  //middleware para converter automaticamente os jsons em objetos
  jsonToObjectMiddleware(socket)

  socket.on('disconnect', () => {
    console.log('X disconnected ' + socket.id)
  })

  socket.on('message', (data) => {
    console.log(data)
    // socket.emit('show-message', data)
    //socket.broadcast.emi(..) enviaria pra todos, menos pro cliente que enviou
    //usando io (servidor) para mostrar message a todos que estão conectados no socket
    io.emit('show-message', data)
  })
})

app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
  res.render('index')
})

http.listen(3000, () => {
  console.log('APP RUNNING PORT:3000')
})
