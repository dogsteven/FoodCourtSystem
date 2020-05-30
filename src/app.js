import express from 'express'
import router from './router'

let app = express()

app.use(express.json())
app.use(express.static('static'))

app.use('/api', router)

app.listen(process.env.PORT || 5000)