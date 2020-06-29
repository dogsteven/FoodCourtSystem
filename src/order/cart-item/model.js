export default class {
    /**
     * @param {string} vendorID
     * @param {string} foodItemID 
     * @param {number} quantity 
     */
    constructor(vendorID, foodItemID, quantity) {
        this.vendorID = vendorID
        this.foodItemID = foodItemID
        this.quantity = quantity
    }
}