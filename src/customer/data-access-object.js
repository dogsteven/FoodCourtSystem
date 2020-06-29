import FirebaseAdmin from 'firebase-admin'
import configuration from '../configuration'
import Customer from './model'

let database = FirebaseAdmin.database().ref(configuration.database.customer)

let mutableFiels = ['password', 'email', 'firstname', 'lastname', 'registrationTokens']

export default {

    /**
     * @param {(customer: Customer) => boolean} filter
     * @returns {Promise<Customer?>}
     */
    async queryFirst(filter) {
        if (typeof filter !== 'function')
            return null
        var result = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let customer = new Customer(child.key, info.username, info.password, info.firstname, info.lastname, info.email, info.registrationTokens ?? [])
            if (filter(customer) === true) {
                result = customer
                return true
            }
            return false
        })
        return result
    },

    /**
     * @param {(customer: Customer) => boolean} filter
     * @returns {Promise<Customer[]>}
     */
    async query(filter) {
        if (typeof filter !== 'function')
            return null
        var result = []
        snapshot.forEach((child) => {
            let info = child.val()
            let customer = new Customer(child.key, info.username, info.password, info.firstname, info.lastname, info.email, info.registrationTokens ?? [])
            if (filter(customer) === true)
                result.push(customer)
        })
        return result
    },

    /**
     * @param {Customer} customer 
     * @returns {Promise<string?>}
     */
    async create(customer) {
        let ref = database.push()
        let data = { ...customer }
        if ('id' in data)
            delete data.id
        ref.set(data)
        return (await ref).key
    },

    /**
     * @param {Customer} customer 
     * @returns {void}
     */
    modify(customer) {
        let data = { ...customer }
        if ('id' in data)
            delete data.id
        database.child(customer.id).set(data)
    },

    /**
     * @param {string} id 
     * @param {string} field 
     * @param {any} value 
     */
    modifyByField(id, field, value) {
        if (mutableFiels.includes(field))
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