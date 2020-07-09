import FoodItemController from '../../food-item/controller'

export default class CartItem {
    /**
     * 
     * @param {string} foodID 
     * @param {number} quantity
     */
    constructor(foodID, quantity) {
        this.foodID = foodID
        this.quantity = Number(quantity)
    }

    /**
     * @returns {Promise<string?>}
     */
    async vendorID() {
        return (await FoodItemController.UserService.getFoodByID(this.foodID)).vendorID
    }
}