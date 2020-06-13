import { Router } from 'express'
import APIController from './controllers/api'
import notifications from './notifications'

let router = Router()

router.route('/test/database/:ref')
    .get(APIController.Firebase.query)

router.route('/food')
    .get(APIController.Food.query)
    .post(APIController.Food.create)
    .put(APIController.Food.modify)
router.get('/food/:id', APIController.Food.queryByID)
router.delete('/food/:id', APIController.Food.remove)

export default router