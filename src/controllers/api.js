import FoodItem from '../models/food-item'
import FoodItemDAO from './food-item-data-access-object'
import FirebaseAdmin from '../configurated-firebase'
import { json } from 'express'

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
    async query(req, res) {
      res.json(await FoodItemDAO.query())
    },

    async queryByID(req, res) {
      let id = req.params.id
      res.json({
        item: await FoodItemDAO.queryByID(id)
      })
    },

    create(req, res) {
      let vendorID = req.body.vendorID
      let name = req.body.name
      let price = req.body.price
      let quantity = req.body.quantity
      let categories = req.body.categories
      let description = req.body.description
      let photo = req.body.photo
      let item = new FoodItem("", vendorID, name, price, quantity, categories, description, photo)
      let id = FoodItemDAO.create(item)
      res.json({
        id: id
      })
    },

    modify(req, res) {
      let id = req.body.id
      let vendorID = req.body.vendorID
      let name = req.body.name
      let price = req.body.price
      let quantity = req.body.quantity
      let categories = req.body.categories
      let description = req.body.description
      let photo = req.body.photo
      let item = new FoodItem(id, vendorID, name, price, quantity, categories, description, photo)
      let status = FoodItemDAO.modify(item)
      res.json({
        status: status
      })
    },

    remove(req, res) {
      let id = req.params.id
      let status = FoodItemDAO.remove(id)
      res.json({
        status: status
      })
    }
  }
}