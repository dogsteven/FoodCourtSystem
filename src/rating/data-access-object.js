import Rating from './model'
import configuration from '../configuration'
import FirebaseAdmin from '../firebase'

let database = FirebaseAdmin.database().ref(configuration.database.rating)

export default {
    /**
     * @param {(rating: Rating) => boolean} filter 
     * @returns {Promise<Rating[]>}
     */
    async query(filter) {
        let snapshot = await database.once('value')
        let result = []
        let index = 0
        snapshot.forEach((child) => {
            let { foodItemID, customerID } = child.val()
            let rating = new Rating(index, foodItemID, customerID)
            if (filter(rating) == true)
                result.push(rating)
            index += 1
        })
        return result
    },

    /**
     * @param {(rating: Rating) => boolean} filter 
     * @returns {Promise<Rating?>}
     */
    async queryFirst(filter) {
        let snapshot = await database.once('value')
        var result = null
        let index = 0
        snapshot.forEach((child) => {
            let { foodItemID, customerID } = child.val()
            let rating = new Rating(index, foodItemID, customerID)
            if (filter(rating) === true) {
                result = rating
                return true
            }
            index += 1
            return false
        })
        return result
    },

    /**
     * @param {Rating} rating 
     * @returns {Promise<Number>}
     */
    async create(rating) {
        let data = { ...rating }
        delete data.index
        let snapshot = await database.once('value')
        let index = (snapshot.val() ?? []).length
        database.child(index).set(data)
        return index
    },

    /**
     * @param {Rating} rating 
     */
    modify(rating) {
        let index = rating.index
        let data = { ...rating }
        delete data.index
        database.child(index).set(data)
    },

    /**
     * @param {string} index 
     */
    remove(index) {
        database.child(index).remove()
    }
}