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
            let { username, password, firstname, lastname, email, registrationTokens } = child.val()
            let customer = new Customer(child.key, username, password, firstname, lastname, email, registrationTokens ?? [])
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
            let { username, password, firstname, lastname, email, registrationTokens } = child.val()
            let customer = new Customer(child.key, username, password, firstname, lastname, email, registrationTokens ?? [])
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