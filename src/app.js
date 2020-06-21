import express from 'express'
import router from './router'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io'

let app = express()
app.use(express.json())
app.use(cors({ origin: true }))
app.use(express.static('static'))
app.use('/api', router)

let server = http.createServer(app)

let io = socketIO.listen(server)

io.sockets.on('connection', (socket) => {
    var socketID = socket.id

    socket.on('message', (data) => {
        io.sockets.connected[socketID].emit('message', {
            message: "Hello"
        })
    })
})

server.listen(process.env.PORT || 80)