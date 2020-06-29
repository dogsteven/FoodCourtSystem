import { Router } from 'express'
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
import VendorOwnerRouter from './vendor-owner/router'

let router = Router()

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)
VendorOwnerRouter(router)

export default router