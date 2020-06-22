import OrderItem from './order-item/model'
import CartItem from './cart-item/model'

export default class {
    /**
     * 
     * @param {string} id 
     * @param {string} customerID 
     * @param {CartItem[]} cartItems 
     */
    constructor(id, customerID, cartItems) {
        this.id = id
        this.customerID = customerID
        this.cartItems = cartItems
    }

    makeOrderItems() {
        var orderItems = []
        this.cartItems.forEach((item) => {
            let index = orderItems.findIndex(orderItem => orderItem.vendorID === item.vendorID)
            if (index === -1) {
                let orderItem = new OrderItem(this.id, item.vendorID, [item])
                orderItems.push(orderItem)
            } else
                orderItems[index].cartItems.push(item)
        })
        return orderItems
    }
}