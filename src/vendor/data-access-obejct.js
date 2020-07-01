import Vendor from './model'
import FirebaseAdmin from '../firebase'
import configuration from '../configuration'

let database = FirebaseAdmin.database().ref(configuration.vendor)

let mutableFields = ['name', 'description']

export default {
    /**
     * @param {(vendor: Vendor) => boolean} filter 
     * @returns {Promise<Vendor?>}
     */
    async queryFirst(filter) {
        var result = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let vendor = new Vendor(child.key, info.name, info.description)
            if (filter(vendor) === true) {
                result = vendor
                return true
            }
            return false
        })
        return result
    },

    /**
     * @param {(vendor: Vendor) => boolean} filter 
     * @returns {Promise<Vendor[]>}
     */
    async query(filter) {
        let result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            let vendor = new Vendor(child.key, info.name, info.description)
            if (filter(vendor) === true)
                result.push(vendor)
        })
        return result
    },

    /**
     * @param {Vendor} vendor
     * @returns {Promise<String>}
     */
    async create(vendor) {
        let data = { ...vendor }
        if ('id' in data)
            delete data.id
        let ref = database.push()
        ref.set(data)
        return (await ref).key
    },

    /**
     * @param {Vendor} vendor 
     * @returns {void}
     */
    modify(vendor) {
        let data = { ...vendor }
        if ('id' in data)
            delete data.id
        database.child(vendor.id).set(data)
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