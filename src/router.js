import { Router } from 'express'
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
let router = Router()

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)

router.route('/order')
    .get(APIController.Order.query)
    .post(APIController.Order.create)
    .put(APIController.Order.modify)
router.get('/order/:id', APIController.Food.queryByID)
router.delete('/food/:id', APIController.Food.remove)

export default router