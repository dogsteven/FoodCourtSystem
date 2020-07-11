import FoodItem from './model'
import FoodItemDataAccessObject from './data-access-object'

export default {
    UserService: {
        /**
         * @returns { Promise<FoodItem[]> }
         */
        async getAllFoods() {
            return await FoodItemDataAccessObject.query((item) => true)
        },

        /**
         * @param {string} id 
         * @returns {Promise<FoodItem?>}
         */
        async getFoodByID(id) {
            return await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
        },

        /**
         * @param {string} id 
         * @param {number} point 
         * @returns {Promise<boolean>}
         */
        async rating(id, point) {
            if (typeof point !== 'number')
                return false
            if (0 > point || 5 < point)
                return false
            let foodItem = await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
            if (foodItem !== null) {
                let ratingTimes = foodItem.ratingTimes
                let oldRating = foodItem.rating
                let newRating = (oldRating * ratingTimes + point)/(ratingTimes + 1)
                foodItem.rating = newRating
                foodItem.ratingTimes += 1
                FoodItemDataAccessObject.modify(foodItem)
                return true
            }
            return false
        }
    },

    ManagerService: {
        /**
         * @param {string} vendorID 
         * @returns {Promise<FoodItem[]>}
         */
        async getFoodsByVendorID(vendorID) {
            return await FoodItemDataAccessObject.query((item) => item.vendorID === vendorID)
        },

        /**
         * @param {string} vendorID 
         * @param {string} name 
         * @param {number} price 
         * @param {number} quantity 
         * @param {string[]} categories 
         * @param {string} description 
         * @param {string} photo 
         * @returns {Promise<string>}
         */
        async addNewFood(vendorID, name, price, quantity, categories, description, photo) {
            let foodItem = new FoodItem("", vendorID, name, price, quantity, categories, description, photo)
            return await FoodItemDataAccessObject.create(foodItem)
        },

        /**
         * @param {string} vendorID
         * @param {string} id 
         * @param {string} newName 
         * @param {number} newPrice 
         * @param {string[]} newCategories 
         * @param {string} newDescription 
         * @param {string} newPhoto 
         * @returns {Promise<boolean>}
         */
        async changeFoodItemInformation(vendorID, id, newName, newPrice, newCategories, newDescription, newPhoto) {
            let foodItem = await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
            if (foodItem !== null) {
                if (foodItem.vendorID === vendorID) {
                    foodItem.name = newName
                    foodItem.price = newPrice
                    foodItem.categories = newCategories
                    foodItem.description = newDescription
                    foodItem.photo = newPhoto
                    FoodItemDataAccessObject.modify(foodItem)
                    return true
                }
                return false
            }
            return false
        },
        
        /**
         * @param {string} vendorID
         * @param {string} id
         * @returns {Promise<boolean>} 
         */
        async removeFood(vendorID, id) {
            let foodItem = await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
            if (foodItem !== null) {
                if (foodItem.vendorID === vendorID) {
                    FoodItemDataAccessObject.remove(id) 
                    return true
                }
                return false
            }
            return false
        },

        /**
         * @param {string} vendorID
         * @param {string} id 
         * @param {number} amount 
         * @returns {Promise<boolean?>}
         */
        async increaseQuantity(vendorID, id, amount) {
            if (typeof amount !== 'number')
                return false
            if (amount <= 0)
                return false
            let foodItem = await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
            if (foodItem !== null) {
                if (foodItem.vendorID !== vendorID)
                    return false
                FoodItemDataAccessObject.modifyByField(id, 'quantity', foodItem.quantity + amount)
                return true
            }
            return false
        },

        /**
         * @param {string} id 
         * @param {number} amount 
         * @returns {Promise<boolean?>}
         */
        async decreaseQuantity(id, amount) {
            if (typeof amount !== 'number')
                return false
            if (amount <= 0)
                return false
            let foodItem = await FoodItemDataAccessObject.queryFirst((item) => item.id === id)
            if (foodItem !== null) {
                if (foodItem.quantity < amount)
                    return false
                FoodItemDataAccessObject.modifyByField(id, 'quantity', foodItem.quantity - amount)
                return true
            }
            return false
        }
    }
}