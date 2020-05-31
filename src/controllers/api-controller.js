import Food from '../models/food'
import FoodController from './food-controller'

export default {
    Food: {
        query(req, res) {
            res.json(FoodController.query())
        },

        create(req, res) {
            let vendorID = req.body.vendorID
            let name = req.body.name
            let price = req.body.price
            let description = req.body.description
            let picture = req.body.picture
            let newItem = new Food(vendorID, name, price, description, picture)
            FoodController.create(newItem)
            res.json({
                status: 'ok'
            })
        },

        modify(req, res) {
            let id = req.body.id
            let vendorID = req.body.vendorID
            let name = req.body.name
            let price = req.body.price
            let description = req.body.description
            let picture = req.body.picture
            let item = new Food(vendorID, name, price, description, picture)
            let status = FoodController.modify(id, item)
            res.json({
                status: status === true ? 'ok' : 'failed'
            })
        },

        remove(req, res) {
            let id = req.body.id
            let status = FoodController.remove(id)
            res.json({
                status: status === true ? 'ok' : 'failed'
            })
        }
    }
}