import FirebaseAdmin from 'firebase-admin'
import configuration from '../configuration'
import Customer from './model'

let database = FirebaseAdmin.database().ref(configuration.database.customer)

export default {

    /**
     * @param {string} username 
     * @param {string} password 
     */
    async queryByUsernamePassword(username, password) {
        let info = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let data = { ...child.val() }
            if (data.username === username && data.password === password) {
                delete data.password
                info = {
                    id: child.key,
                    info: data
                }
            }
            return info !== null
        })
        return info
    },

    /**
     * @param {string} id 
     */
    async queryByID(id) {
        let data = await database.child(id).once('value')
        let info = data.val()
        if ('password' in info)
            delete info.password
        return {
            id: data.key,
            info: info
        }
    },

    /**
     * @param {Customer} customer 
     * @returns {Promise<string?>}
     */
    
    
    /**
     * @param {Notification} StringContent
     * @returns {void}
     */
    // async send(notification)
    // {
    //     var fcmKey = "AAAA8k14vzQ:APA91bGnrw4WYwDgzpichuR9l0KE2aq1DbMFx_m3O-mzysiDh6vSHt0ylbnyDJDM6YGAgWYfu7PB4E_1Ak8VgISOwPsFQwheyB1E0-UeDgXzEg_4d2IxorQMagY_xGfZYdalGNsJ6I2Y"
    //     var http = new HttpClient();
    //     http.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "key=" + fcmKey);
    //     http.DefaultRequestHeaders.TryAddWithoutValidation("content-length", notification.Length.ToString());
    //     var content = new StringContent(notification, System.Text.Encoding.UTF8, "application/json");

    //     var response = await http.PostAsync("https://fcm.googleapis.com/fcm/send", content);
    // },

    /**
     * @param {Customer} customer 
     * @returns {void}
     */
   
    async create(customer) {
        var unvalid = false
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            if (child.val().username === customer.username)
                unvalid = true
            return unvalid
        })
        if (unvalid === false) {
            let data = { ...customer }
            if ('id' in data)
                delete data.id
            let ref = await database.push()
            ref.set(data)
            return ref.key
        }
        return null
    },

    /**
     * @param {Customer} customer 
     */
    async modify(customer) {
        let data = { ...customer }
        if ('id' in data)
            delete data.id
        let valid = (await database.child(customer.id).once('value')).exists()
        if (valid === true)
            database.child(customer.id).set(data)
        return valid
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

    async remove(id) {
        let valid = (await database.child(id).once('value')).exists()
        if (valid === true)
            database.child(id).remove()
        return valid
    }
}