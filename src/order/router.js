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
}

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    UserService(router)
    ManagerService(router)
}

export default run