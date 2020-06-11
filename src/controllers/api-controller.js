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
      let quantity = req.body.quantity
      let categories = req.body.categories
      let description = req.body.description
      let picture = req.body.picture
      let newItem = new Food(vendorID, name, price, quantity, categories, description, picture)
      res.json({
        key: FoodController.create(newItem)
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
      let picture = req.body.picture
      let item = new Food(vendorID, name, price, quantity, categories, description, picture)
      let status = FoodController.modify(id, item)
      res.json({
        status: status === true ? 'ok' : 'failed'
      })
    },

    remove(req, res) {
      let id = req.params.id
      let status = FoodController.remove(id)
      res.json({
        status: status === true ? 'ok' : 'failed'
      })
    }
  },

  VendorOwner: {
    query(req, res) {
      let username = req.params.username
      let password = req.params.password
      FirebaseAdmin.database().ref('/VendorOwner').once('value').then((snapshot) => {
        let isExist = false
        snapshot.forEach((child) => {
          let user = child.val()
          if (user.username === username && user.password === password) {
            isExist = true
            res.json({
              status: 'ok',
              vendorID: user.vendorID
            })
            return true
          }
        })
        if (isExist === false)
          res.json({
            status: 'failed'
          })
      })
    },

    create(req, res) {
      let username = req.body.username
      let password = req.body.password
      let vendorID = req.body.vendorID
      FirebaseAdmin.database().ref('/VendorOwner').once('value').then((snapshot) => {
        let isExist = false
        snapshot.forEach((child) => {
          let user = child.val()
          if (user.username === username && user.password === password) {
            isExist = true
            res.json({
              status: 'failed'
            })
            return true
          }
        })
        if (isExist === false) {
          FirebaseAdmin.database().ref('/VendorOwner').push().set({
            username: username,
            password: password,
            vendorID: vendorID
          })
          res.json({
            status: 'ok'
          })
        }
      })
    },
  }
}