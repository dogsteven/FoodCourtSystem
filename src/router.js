import { Router } from 'express'
import APIController from './controllers/api'

let router = Router()

router.route('/test/database/:ref')
    .get(APIController.Firebase.query)

router.route('/food')
    .get(APIController.Food.query)
    .post(APIController.Food.create)
    .put(APIController.Food.modify)
router.get('/food/:id', APIController.Food.queryByID)
router.delete('/food/:id', APIController.Food.remove)

router.route('/order')
    .get(APIController.Order.query)
    .post(APIController.Order.create)
    .put(APIController.Order.modify)
router.get('/order/:id', APIController.Food.queryByID)
router.delete('/food/:id', APIController.Food.remove)

export default router