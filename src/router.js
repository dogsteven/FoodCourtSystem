import { Router } from 'express'
import APIController from './controllers/api-controller'

let router = Router()

router.route('/test/database/:ref')
    .get(APIController.Firebase.query)

router.route('/food')
    .get(APIController.Food.query)
    .post(APIController.Food.create)
    .put(APIController.Food.modify)
router.delete('/food/:id', APIController.Food.remove)

router.route('/vendor-owner/:username/:password')
    .get(APIController.VendorOwner.query)
router.route('/vendor-owner')
    .post(APIController.VendorOwner.create)

export default router