import CartItem from './cart-item/model'
import OrderItem from './order-item/model'
import Order from './model'
import OrderItemDataAccessObject from './order-item/data-access-object'
import OrderDataAccessObject from './data-access-object'
import FoodItemController from '../food-item/controller'
import CustomerController from '../customer/controller'
import CustomerDataAccessObject from '../customer/data-access-object'
import FirebaseAdmin from '../firebase'

class Controller {
    constructor() {
        this.unpaidOrders = []
        this.waitingQueue = {}
        this.cookingQueue = {}
        this.completedList = {}
        OrderDataAccessObject.query((o) => o.state === 'unpaid')
            .then((orders) => {
                for (let i in orders)
                    this.unpaidOrders.push(orders[i])
            })
    }

    /**
     * @param {string} vendorID 
     * @returns {Order[]}
     */
    getWaitingQueue(vendorID) {
        if ((vendorID in this.waitingQueue) === false)
            this.waitingQueue[vendorID] = []
        return this.waitingQueue[vendorID]
    }

    /**
     * @param {string} vendorID 
     * @returns {Order[]}
     */
    getCookingQueue(vendorID) {
        if ((vendorID in this.cookingQueue) === false)
            this.cookingQueue[vendorID] = []
        return this.cookingQueue[vendorID]
    }

    /**
     * @param {string} vendorID 
     * @returns {Order[]}
     */
    getCompletedList(vendorID) {
        if ((vendorID in this.completedList) === false)
            this.completedList[vendorID] = []
        return this.completedList[vendorID]
    }

    /**
     * @param {string} orderID 
     * @returns {Promise<{ error: string, info: { orderItem: OrderItem, state: string }[]>} 
     */
    async queryByID(orderID) {
        let order = await OrderDataAccessObject.queryFirst(item => item.id === orderID)
        if (order === null)
            return {
                error: 'Order with id ' + orderID + ' is not exist!',
                info: null
            }
        let orderItems = (await order.makeOrderItems())
        if (order.state === 'unpaid')
            return {
                error: null,
                info: orderItems.map((orderItem) => ({
                    orderItem: orderItem,
                    state: 'unpaid'
                }))
            }
        let info = []
        for (let i in orderItems) {
            let vendorID = orderItems[i].vendorID
            if (vendorID in this.waitingQueue) {
                let index = this.waitingQueue[vendorID].findIndex((item) => item.id === orderItems[i].id)
                if (index !== -1) {
                    info.push({
                        orderItem: orderItems[i],
                        state: 'waiting'
                    })
                    continue
                }
            }
            if (vendorID in this.cookingQueue) {
                let index = this.cookingQueue[vendorID].findIndex((item) => item.id === orderItems[i].id)
                if (index !== -1) {
                    info.push({
                        orderItem: orderItems[i],
                        state: 'cooking'
                    })
                    continue
                }
            }
            if (vendorID in this.completedList) {
                let index = this.completedList[vendorID].findIndex((item) => item.id === orderItems[i].id)
                if (index !== -1) {
                    info.push({
                        orderItem: orderItems[i],
                        state: 'completed'
                    })
                    continue
                }
            }
            info.push({
                orderItem: orderItems[i],
                state: 'taked'
            })
        }
        return {
            error: null,
            info: info
        }
    }

    /**
     * @param {string} customerID 
     * @returns {Promise<{ error: string?, body: { id: string, info: { orderItem: OrderItem, state: string }[] }[] }>}
     */
    async queryByCustomerID(customerID) {
        let order = await OrderDataAccessObject.query((o) => o.customerID === customerID)
        if (order === null)
            return {
                error: 'Customer with id ' + customerID + ' is not exist!',
                body: []
            }
        let orderIDs = order.map(o => o.id)
        var result = []
        for (let i in orderIDs) {
            let { info } = await this.queryByID(orderIDs[i])
            if (info.findIndex((orderItem) => orderItem.state === 'taked') === -1)
                result.push({
                    id: orderIDs[i],
                    info: info
                })
        }
        return {
            error: null,
            body: result
        }
    }

    /**
     * @param {string} customerID 
     * @returns {Promise<{ error: string?, body: { id: string, info: { orderItem: OrderItem, state: string }[] }[] }>}
     */
    async queryTakedOrderByCustomerID(customerID) {
        let order = await OrderDataAccessObject.query((o) => o.customerID === customerID)
        if (order === null)
            return {
                error: 'Customer with id ' + customerID + ' is not exist!',
                body: []
            }
        let orderIDs = order.map(o => o.id)
        var result = []
        for (let i in orderIDs) {
            let { info } = await this.queryByID(orderIDs[i])
            if (info.findIndex((orderItem) => orderItem.state === 'taked') >= 0)
                result.push({
                    id: orderIDs[i],
                    info: info
                })
        }
        return {
            error: null,
            body: result
        }
    }

    /**
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     * @returns {Promise<{ id: string?, error: string?, errorItems: string[] }>}
     */
    async makeOrder(customerID, cartItems) {
        if (cartItems.length === 0)
            return {
                id: null,
                error: "Empty cart list!",
                errorItems: []
            }
        let isExist = (await CustomerController.ManagerService.queryByID(customerID)) !== null
        if (isExist === false)
            return { 
                id: null, 
                error: 'Customer with id ' + customerID + ' is not exist!',
                errorItems: []
            }
        let errorItems = []
        for (let i in cartItems) {
            let foodItem = await FoodItemController.UserService.getFoodByID(cartItems[i].foodID)
            if (foodItem === null)
                return {
                    id: null,
                    error: 'Unvalid food item\'s ID',
                    errorItems: []
                }
            let isEnough = foodItem.quantity >= cartItems[i].quantity
            if (isEnough === false)
                errorItems.push(cartItems[i].foodID)
        }
        if (errorItems.length > 0)
            return {
                id: null,
                error: 'Out of stock!',
                errorItems: errorItems
            }
        
        let order = new Order("", customerID, cartItems)
        for (let i in cartItems)
            FoodItemController.ManagerService.decreaseQuantity(cartItems[i].foodID, cartItems[i].quantity)

        let id = await OrderDataAccessObject.create(order)
        order.id = id
        this.unpaidOrders.push(order)
        return {
            id: id,
            error: null,
            errorItems: []
        }
    }

    /**
     * @param {string} id
     * @returns {boolean} 
     */
    pushToWaitingQueue(orderID) {
        let index = this.unpaidOrders.findIndex((order) => order.id === orderID)
        if (index === -1)
            return false
        OrderDataAccessObject.modifyByField(orderID, 'state', 'paid')
        let order = this.unpaidOrders.splice(index, 1)[0]
        order.makeOrderItems().then((orderItems) => {
            for (let i in orderItems) {
                let vendorID = orderItems[i].vendorID
                if ((vendorID in this.waitingQueue) === false)
                    this.waitingQueue[vendorID] = []
                this.waitingQueue[vendorID].push(orderItems[i])
            }
        })
        return true
    }

    /**
     * @param {string} vendorID 
     * @returns {boolean}
     */
    popFirstOrderFromWaitingQueueToCookingQueue(vendorID) {
        if ((vendorID in this.waitingQueue) === false)
            return false
        if (this.waitingQueue[vendorID].length === 0)
            return false
        if ((vendorID in this.cookingQueue) === false)
            this.cookingQueue[vendorID] = []
        let orderItem = this.waitingQueue[vendorID].splice(0, 1)[0]
        this.cookingQueue[vendorID].push(orderItem)
        return true
    }

    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */
    completeCooking(vendorID, orderID) {
        if ((vendorID in this.cookingQueue) === false)
            return false
        let index = this.cookingQueue[vendorID].findIndex((orderItem) => orderItem.id === orderID)
        if (index === -1)
            return false
        if ((vendorID in this.completedList) === false)
            this.completedList[vendorID] = []
        let orderItem = this.cookingQueue[vendorID].splice(index, 1)[0]
        this.completedList[vendorID].push(orderItem)
        OrderDataAccessObject.queryFirst((item) => item.id === orderID)
            .then((order) => order.customerID)
            .then((customerID)=> {
                CustomerDataAccessObject.queryFirst((customer)=> customer.id == customerID)
                .then(customer => customer.registrationTokens)
                .then((registrationTokens) => {
                    registrationTokens.forEach((regToken) => {
                        var message = {
                            notification: {
                                title : 'Vui lòng đến quầy để lấy thức ăn',
                                body: 'Nhớ mang theo hóa đơn nhé!',
                                imageUrl : 'https://product.hstatic.net/1000335596/product/img_0163_8dd37ca37c8b447080b3591e540dd99c_2a902d303dac43c0aef9d212828c0b8d.jpg'
                            },
                            token: regToken,
                        }
                        FirebaseAdmin.messaging().send(message).then((response) => {
                                console.log('Successfully sent message:', response);
                            })
                            .catch((error) => {
                                console.log('Error sending message:', error);
                        });
                    })

                })
            })
        
        res.json({'alo' : 'wtf'}) 
        return true
    }

    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */
    popOrderFromCompletedList(vendorID, orderID) {
        if ((vendorID in this.completedList) === false)
            return false
        let index = this.completedList[vendorID].findIndex((orderItem) => orderItem.id === orderID)
        if (index === -1)
            return false
        let orderItem = this.completedList[vendorID].splice(index, 1)[0]
        OrderItemDataAccessObject(vendorID).create(orderItem)
        return true
    }


}

export default new Controller()