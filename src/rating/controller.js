import Rating from './model'
import RatingDataAccessObject from './data-access-object'
import FoodItemController from '../food-item/controller'

export default {
    /**
     * @param {string} customerID 
     * @param {string} foodItemID 
     * @returns {Promise<Rating?>}
     */
    async queryByCustomerIDAndFoodItemID(customerID, foodItemID) {
        return await RatingDataAccessObject.queryFirst((rating) => rating.customerID == customerID && rating.foodItemID == foodItemID)
    },

    /**
     * @param {string} customerID 
     * @param {string} foodItemID 
     * @param {number} ratingScore 
     * @returns {Promise<number?>}
     */
    async createNewRating(customerID, foodItemID, ratingScore) {
        let foodItem = await FoodItemController.UserService.getFoodByID(foodItemID)
        let isFoodItemExist = foodItem !== null
        if (isFoodItemExist === false)
            return null
        let isRatingYet = (await RatingDataAccessObject.queryFirst((rating) => rating.customerID === customerID && rating.foodItemID === foodItemID)) !== null
        if (isRatingYet === true)
            return null
        let rating = new Rating(0, foodItemID, customerID)
        RatingDataAccessObject.create(rating)
        let newRatingScore = await FoodItemController.UserService.newRating(foodItemID, ratingScore)
        return newRatingScore
    }
}