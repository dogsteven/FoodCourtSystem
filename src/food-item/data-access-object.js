import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import FoodItem from './model'

let database = FirebaseAdmin.database().ref(configuration.database["food-item"])

let mutableFields = ['name', 'price', 'quantity', 'categories', 'description', 'photo', 'rating', 'ratingTimes']

export default {
    /**
     * @param {(food: FoodItem) => boolean} filter 
     * @returns {Promise<FoodItem?>}
     */
    async queryFirst(filter) {
        var result = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let food = new FoodItem(child.key, info.vendorID, info.name, info.price, info.quantity, info.categories, info.description, info.photo, info.rating, info.ratingTimes)
            if (filter(food) === true) {
                result = food
                return true
            }
        })
        return result
    },

    /**
     * @param {(food: FoodItem) => boolean} filter 
     * @returns {Promise<FoodItem[]>}
     */
    async query(filter) {
        var result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let food = new FoodItem(child.key, info.vendorID, info.name, info.price, info.quantity, info.categories, info.description, info.photo, info.rating, info.ratingTimes)
            if (filter(food) === true)
                result.push(food)
        })
        return result
    },

    /**
     * @param {FoodItem} foodItem 
     * @returns {Promise<string>}
     */
    async create(foodItem) {
        let ref = database.push()
        let data = { ...foodItem }
        if ('id' in data)
            delete data.id
        ref.set(data)
        return (await ref).key
    },

    /** 
     * @param {FoodItem} foodItem 
     * @returns {void}
     */
    modify(foodItem) {
        let data = { ...foodItem }
        if ('id' in data)
            delete data.id
        database.child(foodItem.id).set(data)
    },

    /**
     * @param {string} id 
     * @param {string} field 
     * @param {any} value 
     */
    modifyByField(id, field, value) {
        if (mutableFields.includes(field))
            database.child(id).child(field).set(value)
    },

    /** 
     * @param {string} id
     * @returns {void} 
     */
    async remove(id) {
        database.child(id).remove()
    }
}