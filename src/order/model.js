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
    }
}