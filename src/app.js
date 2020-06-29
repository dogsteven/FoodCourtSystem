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

server.listen(process.env.PORT || 80)