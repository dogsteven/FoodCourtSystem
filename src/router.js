import { Router } from 'express'
import APIController from './controllers/api-controller'

let router = Router()

router.get('/food', APIController.Food.query)

export default router