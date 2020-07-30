import FirebaseAdmin from '../firebase'
import Order from './model'

class OrderRoutine {
    constructor() {
        this.waitingQueue = {}
        this.cookingOrders = {}
    }

    /**
     * @param {string} vendorID
     * @param {Order} order 
     */
    pushNewOrderToWaitingQueue(vendorID, order) {
        if ((vendorID in this.waitingQueue) === false)
            this.waitingQueue[vendorID] = []
        this.waitingQueue[vendorID].push(order)
    }

    popOrderFromWaitingQueueToCookingOrdersAndCooksIt(vendorID) {
        if ((vendorID in this.cookingOrders) === false)
            this.cookingOrders[vendorID] = {}
        if (this.waitingQueue[vendorID].length === 0)
            return
        let order = { ...this.waitingQueue[vendorID][0] }
        let id = order.id
        delete order.id
        this.waitingQueue[vendorID].splice(0, 1)
        this.cookingOrders[vendorID][id] = order
    }
}

export default new OrderRoutine()