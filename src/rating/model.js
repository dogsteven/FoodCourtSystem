export default class {
    /**
     * @param {number} index
     * @param {string} foodItemID 
     * @param {string} customerID 
     */
    constructor(index, foodItemID, customerID) {
        this.index = Number(index)
        this.foodItemID = foodItemID
        this.customerID = customerID
    }
}