import FirebaseAdmin from 'firebase-admin'
import configuration from '../configuration'
import Customer from './model'

let database = FirebaseAdmin.database().ref(configuration.database.customer)

export default {

    /**
     * 
     * @param {string} username 
     * @param {string} password 
     */
    async queryByUsernamePassword(username, password) {
        var customer = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            if (info.username === username && info.password === password) {
                customer = { id: child.key , ...info }
                if (('registrationTokens' in customer) === false)
                    customer.registrationTokens = []
                return true
            }
            return false
        })
        return customer
    },

    /**
     * 
     * @param {string} id 
     */
    async queryByID(id) {
        let customer = (await database.child(id).once('value')).val()
        if (customer !== null && ('registrationTokens' in customer) === false)
            customer.registrationTokens = []
        return customer
    },

    /**
     * 
     * @param {Customer} customer 
     */
    async create(customer) {
        var id = null
        (await database.once('value')).forEach((child) => {
            if (child.val().username === customer.username) {
                id = child.key
                return true
            }
            return false
        })
        return id
    },

    /**
     * 
     * @param {Customer} customer 
     */
    async modify(username, password, customer) {
        let info = await this.queryByUsernamePassword(username, password)
        if (info === null)
            return false
        info.password = customer.password
        info.firstname = customer.firstname
        info.lastname = customer.lastname
        info.email = customer.last
        let data = { ...info }
        delete data.id
        database.child(info.id).set(data)
        return true
    },

    /**
     * 
     * @param {string} id 
     * @param {string} token 
     */
    async setToken(id, token) {
        let ref = database.child(id)
        if ((await ref.once('value')).exists() === false)
            return false
        let registrationTokensRef = ref.child('registrationTokens')
        var registrationTokens = (await registrationTokensRef.once('value')).val()
        registrationTokens.push(token)
        registrationTokensRef.set(registrationTokens)
        return true
    },

    /**
     * 
     * @param {string} id 
     */
    async remove(id) {
        let ref = database.child(id)
        if ((await ref.once('value')).exists() === true) {
            ref.remove()
            return true
        }
        return false
    }

}