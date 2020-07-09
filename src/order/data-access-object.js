import Order from './model'
import CartItem from './cart-item/model'
import configuration from '../configuration'
import FirebaseAdmin from '../firebase'

let database = FirebaseAdmin.database().ref(configuration.database.order)

let mutableFields = ['state']

export default {
    /**
     * @param {(order: Order) => boolean} filter 
     * @returns {Promise<Order?>}
     */
    async queryFirst(filter) {
        let snapshot = await database.once('value')
        var result = null
        snapshot.forEach((child) => {
            let { customerID, cartItems, state } = child.val()
            cartItems = cartItems.map((item) => new CartItem(item.foodID, item.quantity))
            let order = new Order(child.key, customerID, cartItems, state)
            if (filter(order) === true) {
                result = order
                return true
            }
            return false
        })
        return result
    },

    /**
     * @param {(order: Order) => boolean} filter 
     * @returns {Promise<Order[]>}
     */
    async query(filter) {
        let snapshot = await database.once('value')
        let result = []
        snapshot.forEach((child) => {
            let { customerID, cartItems, state } = child.val()
            cartItems = cartItems.map((item) => new CartItem(item.foodID, item.quantity))
            let order = new Order(child.key, customerID, cartItems, state)
            if (filter(order) === true)
                result.push(order)
        })
        return result
    },

    /**
     * @param {Order} order 
     * @returns {Promise<string>}
     */
    async create(order) {
        let data = { ...order }
        if ('id' in data)
            delete data.id
        let ref = database.push()
        ref.set(data)
        return (await ref).key
    },

    /**
     * @param {Order} order 
     * @returns {void}
     */
    modify(order) {
        let data = { ...order }
        if ('id' in data)
            delete data.id
        database.child(order.id).set(data)
    },

    /**
     * @param {string} id 
     * @param {string} field 
     * @param {any} value 
     * @returns {void}
     */
    modifyByField(id, field, value) {
        if (mutableFields.includes(field))
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