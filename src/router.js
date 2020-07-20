import { Router } from 'express'
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
import VendorOwnerRouter from './vendor-owner/router'
import Categories from './categories'
import ImageItemRouter from './image-item/router'
import VendorRouter from './vendor/router'

let router = Router()

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)
VendorOwnerRouter(router)
ImageItemRouter(router)
VendorRouter(router)

Categories.Router(router)

router.get('/categories', (req, res) => {
    res.json({})
})

export default router