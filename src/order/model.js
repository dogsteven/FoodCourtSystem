import OrderItem from './order-item/model'
import CartItem from './cart-item/model'

export default class {
    constructor(id, customerID, cartItems, orderedTime, status) {
        this.id = id
        this.customerID = customerID
        this.orderedTime = orderedTime
        this.status = status
        this.orderItems = []
        for (let cartItem of cartItems) {
            let index = this.orderItems.findIndex(item => item.vendorID === cartItems.vendorID)
            if (index === -1) {
                let orderItem = new OrderItem(id, cartItem.vendorID, [cartItem])
                this.orderItems.push(orderItem)
            } else
                this.orderItems[index].cartItems.push(cartItem)
        }
    }
}