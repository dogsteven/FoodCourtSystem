import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import OrderItem from './order-item/model'
import CartItem from './cart-item/model'
import Order from './model'

let database = FirebaseAdmin.database().ref(configuration.database.order)

class Controller {
    constructor() {
        this.waitingQueue = {}
        this.cookingQueue = {}
    }

    /**
     * 
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     */
    async makeOrder(customerID, cartItems) {
        let ref = await database.push()
        let id = ref.key
        ref.set({
            customerID: customerID,
            cartItems: cartItems
        })
        return new Order(id, customerID, cartItems)
    }

    /**
     * 
     * @param {Order} order 
     */
    pushOrderToWaitingQueue(order) {
        let orderItems = order.makeOrderItems()
        orderItems.forEach((orderItem) => {
            let vendorID = orderItem.vendorID
            if ((vendorID in this.waitingQueue) === false)
                this.waitingQueue[vendorID] = []
            this.waitingQueue[vendorID].push(orderItem)
        })
    }

    
}

export default new Controller()