import Food from '../models/food'
import FoodController from './food-controller'
import FirebaseAdmin from '../configurated-firebase'

export default {
    Firebase: {
        query(req, res) {
            let ref = req.params.ref
            if (ref === undefined)
                res.json({
                    status: 'failed'
                })
            FirebaseAdmin.database().ref('/' + ref).once('value', (snapshot) => {
                res.json(snapshot.val())
            })
        }
    },

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
            res.json({
                key: FoodController.create(newItem)
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