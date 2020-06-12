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

router.route('/api/notifications')
    .post((req, res) => {
        console.log("Hello")
        res.status(201).json({});
        let data = JSON.stringify({
            title: 'Hello',
            content: 'This is push notifications'
        })
        notifications.sendNotification(req.body, data)
            .catch((error) => {
                console.log(error)
            })
    })

export default router