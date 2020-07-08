import CartItem from './cart-item/model'
import OrderItem from './order-item/model'
import Order from './model'
import OrderDataAccessObject from './data-access-object'
import OrderItemDataAccessObject from './order-item/data-access-object'
import FoodItemController from '../food-item/controller'

class Controller {
    constructor() {
        this.unpaidQueue = []
        this.waitingQueue = {}
        this.cookingQueue = {}
        this.completedList = {}
    }

    /**
     * @param {string} id 
     * @returns {Promise<OrderItem[]>}
     */
    async getOrderByID(id) {
        let order = await OrderDataAccessObject.queryFirst((item) => item.id === id)
        if (order === null)
            return []
        let orderItems = order.makeOrderItems()
        for (let i in orderItems) {
            if (order.state === 'unpaid') {
                orderItems[i].state = 'unpaid'
                continue
            }
            let vendorID = orderItems[i].vendorID
            if ((vendorID in this.waitingQueue) === true) {
                if (this.waitingQueue[vendorID] === null)
                    continue
                var index = this.waitingQueue[vendorID].findIndex((item) => item.id === id)
                if (index !== -1) {
                    orderItems[i].state = 'waiting'
                    continue
                }
            }
            if ((vendorID in this.cookingQueue) === true) {
                if (this.cookingQueue[vendorID] === null)
                    continue
                var index = this.cookingQueue[vendorID].findIndex((item) => item.id === id)
                if (index !== -1) {
                    orderItems[i].state = 'cooking'
                    continue
                }
            }
            if ((vendorID in this.completedList) == true) {
                if (this.completedList[vendorID] === null)
                    continue
                var index = this.completedList[vendorID].findIndex((item) => item.id === id)
                if (index !== -1) {
                    orderItems[i].state = 'completed'
                    continue
                }
            }
            orderItems[i].state = 'taked'
        }
        return orderItems
    }

    /**
     * @param {string} id 
     * @returns {Promise<Order[]>}
     */
    async getOrderbyCustomerID(id) {
        return await OrderDataAccessObject.query((item) => item.customerID === id)
    }

    /**
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     * @returns {Promise<string?>}
     */
    async makeNewOrder(customerID, cartItems) {
        var valid = true
        for (let i in cartItems) {
            valid = cartItems[i].quantity <= (await FoodItemController.UserService.getFoodByID(cartItems[i].foodItemID)).quantity
            if (valid == false)
            return null
        }
        for (let i in cartItems) {
            FoodItemController.ManagerService.decreaseQuantity(cartItems[i].vendorID, cartItems[i].foodItemID, cartItems[i].quantity)
        }
        let order = new Order("", customerID, cartItems)
        let id = await OrderDataAccessObject.create(order)
        order.id = id
        this.unpaidQueue.push(order)
        return id
    }

    /**
     * @param {string} id 
     * @returns {boolean}
     */
    pushOrderFromUnpaidToWaitingQueue(id) {
        let index = this.unpaidQueue.findIndex((order) => order.id === id)
        if (index === -1) 
            return false
        let info = this.unpaidQueue[index]
        OrderDataAccessObject.modifyByField(info.id, 'state', 'paid')
        let order = new Order(info.id, info.customerID, info.cartItems, 'waiting')
        this.unpaidQueue.splice(index, 1)
        order.makeOrderItems().forEach((item) => {
            let vendorID = item.vendorID
            if ((vendorID in this.waitingQueue) === false)
                this.waitingQueue[vendorID] = []
            this.waitingQueue[vendorID].push(item)   
        })
        return true
    }

    /**
     * @param {string} vendorID
     * @returns {boolean}
     */
    popOrderFromWaitingQueueToCookingQueue(vendorID) {
        if ((vendorID in this.waitingQueue) === false)
            return false
        if (this.waitingQueue[vendorID].length === 0)
            return false
        let info = this.waitingQueue[vendorID][0]
        let orderItem = new OrderItem(info.id, info.vendorID, info.cartItems)
        if ((vendorID in this.cookingQueue) === false)
            this.cookingQueue[vendorID] = []
        this.cookingQueue[vendorID].push(orderItem)
        this.waitingQueue[vendorID].splice(0, 1)
        return true
    }

    /**
     * @param {string} vendorID 
     * @param {string} orderID 
     * @returns {boolean}
     */
    popOrderFromCookingQueueToCompletedList(vendorID, orderID) {
        if ((vendorID in this.cookingQueue) === false)
            return false
        let index = this.cookingQueue[vendorID].findIndex((item) => item.id === orderID)
        if (index === -1)
            return false
        let info = this.cookingQueue[vendorID][index]
        let orderItem = new OrderItem(info.id, info.vendorID, info.cartItems)
        OrderItemDataAccessObject(vendorID).create(orderItem)
        if ((vendorID in this.completedList) === false)
            this.completedList[vendorID] = []
        this.completedList[vendorID].push(orderItem)
        this.cookingQueue[vendorID].splice(index, 1)
        return true
    }

    popOrderFromCompletedList(vendorID, orderID) {
        if ((vendorID in this.completedList) === false)
            return false
        let index = this.completedList[vendorID].findIndex((item) => item.id === orderID)
        if (index === -1)
            return false
        this.completedList[vendorID].splice(index, 1)
        return true
    }
}

export default new Controller()