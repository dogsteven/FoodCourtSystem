import { Router } from 'express'
import APIController from './controllers/api-controller'

let router = Router()

router.route('/test/database/:ref')
    .get(APIController.Firebase.query)

router.route('/food')
    .get(APIController.Food.query)
    .post(APIController.Food.create)
    .put(APIController.Food.modify)
    .delete(APIController.Food.remove)

export default router