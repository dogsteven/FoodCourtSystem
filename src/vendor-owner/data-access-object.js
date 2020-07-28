import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import VendorOwner from './model'

let database = FirebaseAdmin.database().ref(configuration.database["vendor-owner"])

export default {
    /**
     * @param {string} username 
     * @param {string} password 
     */
    async query(username, password) {
        var vendorID = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let info = child.val()
            if (info.username === username && info.password == password) {
                vendorID = info.vendorID
                return true
            }
            return false
        })
<<<<<<< HEAD
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
=======
        return vendorID
    },
    
    /**
     * @param {VendorOwner} info 
     */
    async create(info) {
        var unvalid = false
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let data = child.val()
            if (data.username === info.username)
                unvalid = true
            return unvalid
        })
        if (unvalid === false)
            (await database.push()).set(info)
        return !unvalid
    },

    /** 
     * @param {string} username 
     * @param {string} password 
     * @param {VendorOwner} newInfo 
     */
    async modify(username, password, newInfo) {
        let snapshot = await database.once('value')
        var valid = false
        snapshot.forEach((child) => {
            let info = child.val()
            if (info.username === username && info.password == password) {
                valid = true
                var data = { ...newInfo }
                data.username = username
                data.vendorID = info.vendorID
                database.child(child.key).set(data)
            }
            return valid
        })
        return valid
>>>>>>> origin/backhoa
    }
}