import { Router } from 'express'
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
let router = Router()

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)

export default router