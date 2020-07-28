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
    }
}