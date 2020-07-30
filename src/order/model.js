import OrderItem from './item/model'


export default class {
    /**
     * @param {string} id
     * @param {string} customerID 
     * @param {OrderItem[]} items
     */
    constructor(id, customerID, items, state='unpaid') {
        this.id = id
        this.customerID = customerID
        this.cartItems = items
        this.state = state
    }

    async makeOrderItems() {
        var result = []
        for (let i in this.cartItems) {
            let vendorID = await this.cartItems[i].vendorID()
            let index = result.findIndex((item) => item.vendorID === vendorID)
            if (index === -1)
                result.push(new OrderItem(this.id, vendorID, [this.cartItems[i]]))
            else 
                result[index].cartItems.push(this.cartItems[i])
        }
        return result
    }
}