import FoodItem from '../models/food-item'
import Order from '../models/order'
import FoodItemDAO from './food-item-data-access-object'
import FirebaseAdmin from '../configurated-firebase'
import { json } from 'express'
import orderController from './orderController'

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

    async create(req, res) {
      let vendorID = req.body.vendorID
      let name = req.body.name
      let price = req.body.price
      let quantity = req.body.quantity
      let categories = req.body.categories
      let description = req.body.description
      let photo = req.body.photo
      let item = new FoodItem("", vendorID, name, price, quantity, categories, description, photo)
      let id = await FoodItemDAO.create(item)
      res.json({
        key: id
      })
    },

    async modify(req, res) {
      let id = req.body.id
      let vendorID = req.body.vendorID
      let name = req.body.name
      let price = req.body.price
      let quantity = req.body.quantity
      let categories = req.body.categories
      let description = req.body.description
      let photo = req.body.photo
      let item = new FoodItem(id, vendorID, name, price, quantity, categories, description, photo)
      let status = await FoodItemDAO.modify(item)
      res.json({
        status: status
      })
    },

    async remove(req, res) {
      let id = req.params.id
      let status = await FoodItemDAO.remove(id)
      res.json({
        status: status
      })
    }
  },
  Order: {
    async query(req, res) {
      res.json(await FoodItemDAO.query())
    },
    async queryByID(req, res) {
      let id = req.params.id
      res.json({
        item: await FoodItemDAO.queryByID(id)
      })
    },
    async create(req, res) {
      let queueId = req.body.queueId
      let orderId = req.body.orderId
      let vendorID = req.body.vendorID
      let cart = req.body.cart
      let price = req.body.price
      let orderedTime = req.body.orderedTime
      let status = req.body.status
      let order = new Order(queueId, orderId, vendorID, cart, price, orderedTime, status)
      let id = await OrderController.create(order)
      res.json({
        key: id
      })
    },
    async modify(req, res) {
      let queueId = req.body.queueId
      let orderId = req.body.orderId
      let vendorID = req.body.vendorID
      let cart = req.body.cart
      let price = req.body.price
      let orderedTime = req.body.orderedTime
      let status = req.body.status
      let order = new Order(queueId, orderId, vendorID, cart, price, orderedTime, status)
      let status = await OrderController.modify(order)
      res.json({
        status: status
      })
    },
    async remove(req, res) {
      let id = req.params.id
      let status = await OrderController.remove(id)
      res.json({
        status: status
      })
    }
  },
  Cook: {

  }
}