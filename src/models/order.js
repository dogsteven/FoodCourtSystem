export default class Order {
    /**
     * @param {string} queueId
     * @param {string} orderId
     * @param {string} vendorID
     * @param {Cart} cart
     * @param {number} price 
     * @param {Date} orderedTime 
     * @param {boolean} status
     */
    constructor(queueId, orderId, vendorID, cart, price, orderedTime, status) {
        this.queueId = queueId
        this.orderId = orderId
        this.vendorID = vendorID
        this.cart = cart
        this.price = price
        this.orderedTime = orderedTime
        this.status = status
    }
}