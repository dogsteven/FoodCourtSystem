import express from 'express'
let router = express.Router()

router.get('/', (req, res) => {
    res.end('hello')
})

/* food-item */
import FoodItem from './food-item/model'
import FoodItemDataAccessObject from './food-item/data-access-object'
router.get('/food-item', async (req, res) => {
    res.json(await FoodItemDataAccessObject.query())
})
router.get('/food-item/:id', async (req, res) => {
    res.json(await FoodItemDataAccessObject.queryByID(req.params.id))
})
router.post('/food-item', (req, res) => {
    let vendorID = req.body.vendorID
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let categories = req.body.categories
    let description = req.body.description
    let photo = req.body.photo

    let item = new FoodItem("", vendorID, name, price, quantity, categories, description, photo)
    let id = FoodItemDataAccessObject.create(item)
    res.json({
        key: id
    })
})
router.put('/food-item/:id', async (req, res) => {
    let id = req.params.id
    let vendorID = req.body.vendorID
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let categories = req.body.categories
    let description = req.body.description
    let photo = req.body.photo

    let item = new FoodItem(id, vendorID, name, price, quantity, categories, description, photo)
    let status = await FoodItemDataAccessObject.modify(item)
    res.json({
        status: status
    })
})
router.delete('/food-item/:id', async (req, res) => {
    let id = req.params.id
    let status = await FoodItemDataAccessObject.remove(id)
    res.json({
        status: status
    })
})
/* end food-item */

/* vendor-owner */
import VendorOwner from './vendor-owner/model'
import VendorOwnerDataAccessObject from './vendor-owner/data-access-object'

/* end vendor-owner */

/* customer */
import Customer from './customer/model'
import CustomerDataAccessObject from './customer/data-access-object'
router.get('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    res.json(await CustomerDataAccessObject.queryByUsernamePassword(username, password))
})
router.get('/customer/:id', async (req, res) => {
    let id = req.params.id
    res.json(await CustomerDataAccessObject.queryByID(id))
})
router.post('/customer', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let customer = new Customer("", username, password, firstname, lastname, email)
    res.json({
        id: await CustomerDataAccessObject.create(customer)
    })
})
router.put('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    let newPassword = req.body.password
    let newFirstname = req.body.firstname
    let newLastname = req.body.lastname
    let newEmail = req.body.email
    let info = await CustomerDataAccessObject.queryByUsernamePassword(username, password)
    if (info !== null) {
        let customer = new Customer(info.id, username, newPassword, newFirstname, newLastname, newEmail)
        CustomerDataAccessObject.modify(customer)
        res.json({
            statis: true
        })
    } else {
        res.json({
            status: false
        })
    }
})
/* end customer */
/** start manager */
import FoodItemController from './food-item/controller'
import OrderAccessObject from './order/data-access-object'
import OrderController from './order/controller'
router.get('/manager/food-item/:vendorID', async (req, res) => {
    let vendorID = req.params.vendorID
    res.json(await FoodItemController.ManagerService.getFoodsByVendorID(vendorID))
})

router.get('/manager/unpaidorder/:vendorID', async(req, res) => {
    let vendorID = req.params.vendorID
    res.json(await OrderAccessObject.query((item) => true))
})

router.get('/manager/order/paid/:id', (req, res) => {
    let id = req.params.id
    let status = OrderController.pushOrderFromUnpaidToWaitingQueue(id)
    res.json({
        status: status
    })
})

router.get('/manager/order/cook/:vendorID', (req, res) => {
    let vendorID = req.params.vendorID
    let status = OrderController.popOrderFromWaitingQueueToCookingQueue(vendorID)
    res.json({
        status: status
    })
})

router.get('/manager/order/complete/:vendorID/:id', (req, res) => {
    let vendorID = req.params.vendorID
    let id = req.params.id
    let status = OrderController.popOrderFromCookingQueue(vendorID, id)
    res.json({
        status: status
    })
})


/** end man */
export default router