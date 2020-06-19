import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import CartItem from './cart-item/model'
import Order from './model'

let database = FirebaseAdmin.database().ref(configuration.database.order)

class Controller {
    constructor() {
        this.waitingQueue = {}
        this.cookingQueue = {}
    }

    /**
     * @param {string} vendorID 
     * @param {string} customerID 
     * @param {CartItem[]} items 
     */
    async makeOrder(vendorID, customerID, items) {
        let ref = database.child(vendorID).push()
        ref.set({
            customerID: customerID,
            items: items
        })
        let id = (await ref).key
        let order = new Order(id, customerID, items)
        if ((vendorID in this.waitingQueue) === false)
            this.waitingQueue[vendorID] = []
        this.waitingQueue[vendorID].push(order)
        return id
    }

    pushOrderFromWaitingQueueToCookingQueue(vendorID) {
        if ((vendorID in this.waitingQueue) === false)
            return null
        if (this.waitingQueue[vendorID].legnth === 0)
            return null
        let order = { ...this.waitingQueue[vendorID][0] }
        this.waitingQueue[vendorID].splice(0, 1)
        if ((vendorID in this.cookingQueue) === false)
            this.cookingQueue[vendorID] = []
        this.cookingQueue[vendorID].push(order)
        return order
    }

    popCompleteOrderFromCookingQueue(vendorID, orderID) {
        if ((vendorID in this.cookingQueue) === false)
            return null
        let index = this.cookingQueue[vendorID].findIndex(order => order.id === orderID)
        if (index === -1)
            return null
        let order = { ...this.cookingQueue[vendorID][index] }
        this.cookingQueue[vendorID].splice(index, 1)
        return order
    }
    
}

export default new Controller()