import CartItem from './cart-item/model'
import OrderItem from './order-item/model'
import Order from './model'
import OrderItemDataAccessObject from './order-item/data-access-object'
import OrderDataAccessObject from './data-access-object'
import FoodItemController from '../food-item/controller'
import CustomerController from '../customer/controller'

class Controller {
    constructor() {
        this.unpaidOrders = []
        this.waitingQueue = {}
        this.cookingQueue = {}
        this.completedList = {}
    }

    /**
     * @param {string} orderID 
     * @returns {{ error: string, info: { orderItem: OrderItem, state: string }[] } 
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
    paidOrder(orderID) {
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