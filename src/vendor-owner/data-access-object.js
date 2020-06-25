import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import VendorOwner from './model'

let database = FirebaseAdmin.database().ref(configuration.database["vendor-owner"])

export default {
    /**
     * 
     * @param {string} username 
     * @param {string} password 
     */
    async queryByUsernameAndPassword(username, password) {
        let snapshot = await database.once('value')
        let result = null
        snapshot.forEach((child) => {
            let info = child.val()
            if (info.username === username && info.password === password) {
                result = new VendorOwner(child.key, username, password, info.vendorID, info.firstname, info.lastname, info.email)
                return true
            }
            return false
        })
        return result
    },

    /**
     * 
     * @param {VendorOwner} vendorOwner 
     */
    async create(vendorOwner) {
        let ref = database.push()
        if ('id' in vendorOwner)
            delete vendorOwner.id
        ref.set(vendorOwner)
        return (await ref).key
    }

    
}