import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import VendorOwner from './model'

let database = FirebaseAdmin.database().ref(configuration.database["vendor-owner"])

let mutableFields = ['password', 'email']

export default {
    /** 
     * @param {(vendorOwner: VendorOwner) => boolean} filter 
     * @returns {Promise<VendorOwner?>}
     */
    async queryFirst(filter) {
        var result = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let { username, password, firstname, lastname, email, vendorID } = child.val()
            let vendorOwner = new VendorOwner(child.key, username, password, vendorID, firstname, lastname, email)
            if (filter(vendorOwner) === true) {
                result = vendorOwner
                return true
            }
            return false
        })
        return result
    },

    /** 
     * @param {(vendorOwner: VendorOwner) => boolean} filter 
     * @returns {Promise<VendorOwner[]>}
     */
    async query(filter) {
        let result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let { username, password, firstname, lastname, email, vendorID } = child.val()
            let vendorOwner = new VendorOwner(child.key, username, password, vendorID, firstname, lastname, email)
            if (filter(vendorOwner) === true)
                result.push(vendorOwner)
        })
        return result
    },

    /**
     * @param {VendorOwner} vendorOwner 
     * @returns {Promise<String>}
     */
    async create(vendorOwner) {
        let data = { ...vendorOwner }
        if ('id' in data)
            delete data.id
        let ref = database.push()
        ref.set(data) 
        return (await ref).key
    },

    /**
     * @param {VendorOwner} vendorOwner 
     * @returns {void}
     */
    modify(vendorOwner) {
        let data = { ...vendorOwner }
        if ('id' in data)
            delete data.id
        database.child(vendorOwner.id).set(data)
    },

    /**
     * @param {string} id 
     * @param {string} field 
     * @param {any} value 
     * @returns {void}
     */
    modifyByField(id, field, value) {
        if (mutableFields.includes(field))
            database.child(id).set(value)
    },

    /**
     * @param {string} id 
     * @returns {void}
     */
    remove(id) {
        database.child(id).remove()
    }
}