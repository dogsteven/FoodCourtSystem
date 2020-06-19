import CartItem from './cart-item/model'

export default class {
    /**
     * @param {string} id
     * @param {string} customerID 
     * @param {CartItem[]} items 
     */
    constructor(id, customerID, items) {
        this.id = id
        this.customerID = customerID
        this.items = items
    }
}