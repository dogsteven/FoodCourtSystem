<<<<<<< HEAD
import CartItem from './cart-item/model'
import OrderItem from './order-item/model'

export default class {
    /**
     * @param {string} id 
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     * @param {string} state
     */
    constructor(id, customerID, cartItems, state = "unpaid") {
        this.id = id
        this.customerID = customerID
        this.cartItems = cartItems
        this.state = state
    }

    /**
     * @returns {OrderItem[]}
     */
    makeOrderItems() {
        let orderItems = []
        this.cartItems.forEach((item) => {
            let index = orderItems.findIndex((orderItem) => orderItem.vendorID === item.vendorID)
            if (index === -1)
                orderItems.push(new OrderItem(this.id, item.vendorID, [item]))
            else
                orderItems[index].cartItems.push(item)
        })
        return orderItems
=======
import OrderItem from './item/model'

export default class {
    /**
     * @param {string} id
     * @param {string} customerID 
     * @param {OrderItem[]} items
     */
    constructor(id, customerID, items) {
        this.id = id
        this.customerID = customerID
        this.items = items
    }

    price() {
        var total = 0
        this.items.forEach((item) => {
            total += item.price()
        })
        return total
>>>>>>> origin/backhoa
    }
}