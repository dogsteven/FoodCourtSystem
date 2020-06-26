import CartItem from '../cart-item/model'
import OrderItem from './model'
import configuration from '../../configuration'
import FirebaseAdmin from '../../firebase'

let DB = FirebaseAdmin.database().ref(configuration.database["order-item"])
let mutableFields = []

/** 
 * @param {string} vendorID 
 */
function task(vendorID) {
    let database = DB.child(vendorID)
    return {
        /**
         * @param {(orderItem: OrderItem) => boolean} filter 
         * @returns {Promise<OrderItem?>}
         */
        async queryFirst(filter) {
            let snapshot = await database.once('value')
            var result = null
            snapshot.forEach((child) => {
                let info = child.val()
                let orderItem = new OrderItem(child.key, info.vendorID, info.cartItems)
                if (filter(orderItem) === true) {
                    result = orderItem
                    return true
                }
                return false
            })
            return result
        },

        /**
         * @param {(orderItem: OrderItem) => boolean} filter 
         * @returns {Promise<OrderItem[]>}
         */
        async query(filter) {
            let snapshot = await database.once('value')
            let result = []
            snapshot.forEach((child) => {
                let info = child.val()
                let orderItem = new OrderItem(child.key, info.vendorID, info.cartItems)
                if (filter(orderItem) === true)
                    result.push(orderItem)
            })
            return result
        },

        /**
         * @param {OrderItem} orderItem 
         * @returns {Promsie<string>}
         */
        async create(orderItem) {
            let data = {
                id: orderItem.id,
                cartItems: orderItem.cartItems.map(item => ({
                    foodItemID: item.foodItemID,
                    quantity: item.quantity
                }))
            }
            let ref = database.push()
            ref.set(data)
            return (await ref).key
        },

        /**
         * @param {OrderItem} orderItem 
         * @returns {void}
         */
        modify(orderItem) {
            let data = {
                id: orderItem.id,
                cartItems: orderItem.cartItems.map(item => ({
                    foodItemID: item.foodItemID,
                    quantity: item.quantity
                }))
            }
            database.child(orderItem.id).set(data)
        },

        /**
         * @param {string} id 
         * @param {string} field 
         * @param {any} value 
         * @returns {void}
         */
        modifyByField(id, field, value) {
            if (mutableFields.includes(field) === true)
                database.child(id).child(field).set(value)
        },

        /**
         * @param {string} id 
         * @returns {void}
         */
        remove(id) {
            database.child(id).remove()
        }
    }
}

export default task