import FirebaseAdmin from '../firebase'
import configuration from '../configuration.json'
import FoodItem from './model'
import FoodItemDataAccessObject from './data-access-object'

let database = FirebaseAdmin.database().ref(configuration.database["food-item"])

export default {
    /**
     * @param {string} id 
     * @param {number} count 
     */

     
}