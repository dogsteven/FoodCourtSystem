import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import FoodItem from './model'

let database = FirebaseAdmin.database().ref(configuration.database["food-item"])

export default {
    async query() {
        let foods = {}
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let food = new FoodItem(child.key, info.vendorID, info.name, info.price, info.quantity, info.categories ?? [], info.description, info.photo, info.rating, info.ratingTimes)
            if (filter(food) === true) {
                result = food
                return true
            }
        })
        return foods
    },

    /**
     * @param {string} id 
     * @returns {FoodItem?}
     */
    async query(filter) {
        var result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let food = new FoodItem(child.key, info.vendorID, info.name, info.price, info.quantity, info.categories ?? [], info.description, info.photo, info.rating, info.ratingTimes)
            if (filter(food) === true)
                result.push(food)
        })
        return result
    },

    /**
     * @param {FoodItem} item 
     */
    create(item) {
        let data = { ...item }
        if ('id' in data)
            delete data.id
        let ref = database.push()
        ref.set(data)
        return ref.key
    },

    /**
     * @param {FoodItem} item 
     */
    async modify(item) {
        let valid = (await database.child(item.id).once('value')).exists()
        if (valid === true) {
            let data = { ...item }
            if ('id' in data)
                delete data.id
            database.child(item.id).set(data)
        }
        return valid
    },

    /**
     * @param {string} id 
     */
    async remove(id) {
        let valid = (await database.child(id).once('value')).exists()
        if (valid === true)
            database.child(id).remove()
        return valid
    }
}