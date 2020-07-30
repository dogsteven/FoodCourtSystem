import OrderController from './controller'


/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
    router.post('/order', async (req, res) => {
        let customerID = req.body.customerID
        let cartItems = req.body.cartItems
        res.json({
            id: await OrderController.makeNewOrder(customerID, cartItems)
        })
    })

    router.get('/order/:id', async (req, res) => {
        let id = req.params.id
        res.json(await OrderController.getOrderByID(id))
    })

    router.get('/order/customer/:id', async (req, res) => {
        let id = req.params.id
        res.json(await OrderController.getOrderbyCustomerID(id))
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