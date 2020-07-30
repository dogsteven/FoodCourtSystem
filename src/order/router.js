import OrderController from './controller'
import CartItem from './cart-item/model'

/**
 * @param {import('express').Router} router 
 */

function UserService(router) {
    router.get('/order/:id', async (req, res) => {
        let orderID = req.params.id
        res.json(await OrderController.queryByID(orderID))
    })

    router.get('/order/taked/customer/:id', async (req, res) => {
        let customerID = req.params.id
        res.json(await OrderController.queryTakedOrderByCustomerID(customerID))
    })

    router.get('/order/customer/:id', async (req, res) => {
        let customerID = req.params.id
        res.json(await OrderController.queryByCustomerID(customerID))
    })

    router.post('/order', async (req, res) => {
        let customerID = req.body.customerID
        let cartItems = req.body.cartItems.map(item => new CartItem(item.foodID, item.quantity))

        res.json(await OrderController.makeOrder(customerID, cartItems))
    })
}

/**
 * @param {import('express').Router} router 
 */
function ManagerService(router) {
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
}

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    UserService(router)
    ManagerService(router)
}

export default run