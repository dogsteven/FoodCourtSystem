import CartItem from './cart-item/model'
import OrderItem from './order-item/model'
import Order from './model'
import OrderDataAccessObject from './data-access-object'
import OrderItemDataAccessObject from './order-item/data-access-object'

class Controller {
    constructor() {
        this.unpaidQueue = []
        this.waitingQueue = {}
        this.cookingQueue = {}

    }

    /**
     * @param {string} id 
     * @returns {Promise<Order?>}
     */
    async getOrderByID(id) {
        return await OrderDataAccessObject.queryFirst((item) => item.id === id)
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
     * @returns {Promise<string>}
     */
    async makeNewOrder(customerID, cartItems) {
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
    popOrderFromCookingQueue(vendorID, orderID) {
        if ((vendorID in this.cookingQueue) === false)
            return false
        
        let index = this.cookingQueue[vendorID].findIndex((item) => item.id === orderID)
        if (index === -1) 
            return false
        let info = this.cookingQueue[vendorID][index]
        let orderItem = new OrderItem(info.id, info.vendorID, info.cartItems)
        OrderItemDataAccessObject(vendorID).create(orderItem)
        this.cookingQueue[vendorID].splice(index, 1)
        return true
    }
}

export default new Controller()