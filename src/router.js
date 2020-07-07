import { Router } from 'express'
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
import VendorOwnerRouter from './vendor-owner/router'
import CategoriesRouter from './categories'

let router = Router()

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)
VendorOwnerRouter(router)
CategoriesRouter(router)

router.get('/categories', (req, res) => {
    res.json({})
})

export default router