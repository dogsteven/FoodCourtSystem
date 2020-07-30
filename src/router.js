import express from 'express'
let router = express.Router()
import FoodItemRouter from './food-item/router'
import CustomerRouter from './customer/router'
import OrderRouter from './order/router'
import VendorOwnerRouter from './vendor-owner/router'
import Categories from './categories'
import ImageItemRouter from './image-item/router'
import VendorRouter from './vendor/router'
import RatingRouter from './rating/router'

router.get('/', (req, res) => {
    res.end('hello')
})

FoodItemRouter(router)
CustomerRouter(router)
OrderRouter(router)
VendorOwnerRouter(router)
ImageItemRouter(router)
VendorRouter(router)
RatingRouter(router)

Categories.Router(router)

router.get('/categories', (req, res) => {
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
    let orderID = req.params.id
    let status = OrderController.pushToWaitingQueue(orderID)
    res.json({
        status: status
    })
})

router.get('/manager/order/cook/:vendorID', (req, res) => {
    let vendorID = req.params.vendorID
    let status = OrderController.popFirstOrderFromWaitingQueueToCookingQueue(vendorID)
    res.json({
        status: status
    })
})

router.get('/manager/order/complete/:vendorID/:id', async (req, res) => {
    let vendorID = req.params.vendorID
    let orderID = req.params.id
    let status = OrderController.completeCooking(vendorID, orderID)
    res.json({
        status: status
    })
})

router.get('/manager/order/take/:vendorID/:id', async (req, res) => {
    let vendorID = req.params.vendorID
    let orderID = req.params.id
    let status = OrderController.popOrderFromCompletedList(vendorID, orderID)
    res.json({
        status: status
    })
}) 

/** end man */
export default router