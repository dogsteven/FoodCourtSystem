import FoodItemDataAccessObject from '../../food-item/data-access-object'

export default class {
    /**
     * @param {string} itemID 
     * @param {number} quantity 
     */
    constructor(itemID, quantity) {
        this.itemID = itemID
        this.quantity = quantity
    }

    /**
     * @returns {number}
     */
    price() {
        let item = FoodItemDataAccessObject.queryByID(id)
        if (item === null)
            return 0
        return item.price * this.quantity
    }
}