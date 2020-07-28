import express from 'express'
import router from './router'
import cors from 'cors'
import http from 'http'

let app = express()
app.use(express.json())
app.use(cors({ origin: true }))
app.use(express.static('static'))
app.use('/api', router)

let server = http.createServer(app)

<<<<<<< HEAD
server.listen(process.env.PORT || 8000)
=======
server.listen(process.env.PORT || 80)
>>>>>>> 05e4c4fa4ee53e508e71d40509b855ff6ed62a28
