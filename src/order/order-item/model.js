import CartItem from '../cart-item/model'

export default class {
    /**
     * @param {string} id
     * @param {string} vendorID 
     * @param {CartItem[]} cartItems 
     */
    constructor(id, vendorID, cartItems) {
        this.id = id
        this.vendorID = vendorID
        this.cartItems = cartItems
    }
}