import FirebaseAdmin from '../firebase'
import configuration from '../configuration.json'
import FoodItem from './model'

let database = FirebaseAdmin.database().ref(configuration.database["food-item"])

export default {
    async query() {
        let foods = {}
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            foods[child.key] = { ...child.val() }
        })
        return foods
    },

    /**
     * @param {string} id 
     * @returns {FoodItem?}
     */
    async queryByID(id) {
        return (await database.child(id).once('value')).val()
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