import express from 'express'
let router = express.Router()

import FirebaseAdmin from './firebase'


/* database */
router.get('/test/database/:ref', async (req, res) => {
    res.json((await FirebaseAdmin.database().ref('/' + req.params.ref).once('value')).val())
})
/* end database */

/* food-item */
import FoodItem from './food-item/model'
import FoodItemDataAccessObject from './food-item/data-access-object'
/**
 * get: /api/food-item
 * data trả về ở dạng: 
 * {
 *   {
 *     id
 *     vendorID,
 *     name,
 *     price,
 *     quantity
 *     categories,
 *     description,
 *     photo
 *   }[]
 * }
 */
router.get('/food-item', async (req, res) => {
    res.json(await FoodItemDataAccessObject.query())
})
/**
 * get: /api/food-item/:id
 * :id là id của food item muốn lấy thông tin
 * Nếu id là trùng khớp thì trả về
 * {
 *   vendorID,
 *   name,
 *   price,
 *   quantity
 *   categories,
 *   description,
 *   photo
 * }
 */
router.get('/food-item/:id', async (req, res) => {
    res.json(await FoodItemDataAccessObject.queryByID(req.params.id))
})
/* end food-item */

/* vendor-owner */

/* end vendor-owner */

/* customer */
import Customer from './customer/model'
import CustomerDataAccessObject from './customer/data-access-object'
router.get('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    res.json(await CustomerDataAccessObject.queryByUsernamePassword(username, password))
})

router.post('/customer', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let customer = new Customer("", username, password, firstname, lastname, email)
    res.json(await CustomerDataAccessObject.create(customer))
})

router.put('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    let newPassword = req.body.password
    let newFirstname = req.body.firstname
    let newLastname = req.body.lastname
    let newEmail = req.body.email
    let customer = new Customer(username, newPassword, newFirstname, newLastname, newEmail)
    res.json({
        status: await CustomerDataAccessObject.modify(username, password, email)
    })
})
/* end customer */

/* order for customers */
import OrderController from './order/controller'
router.post('/order-customer', async (req, res) => {
    let customerID = req.body.customerID
    let vendorID = req.body.vendorID
    let items = req.body.items
    let customer = await CustomerDataAccessObject.queryByID(customerID)
    if (customer === null) {
        res.json({
            error: "Wrong customerID!"
        })
    } else {
        let id = await OrderController.makeOrder(vendorID, customerID, items)
        res.json({
            error: null,
            id: id
        })
    }
})
/* end order for customers */

/* order for cooks */

/* end order for cooks */

/* categories */

router.get('/categories', async (req, res) => {
    res.json((await FirebaseAdmin.database().ref('/FoodCourt/Categories').once('value')).val())
})

/* end categories */


export default router