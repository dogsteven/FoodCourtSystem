import ImageItem from './model'
import FirebaseAdmin from '../firebase'
import configuration from '../configuration'

let database = FirebaseAdmin.database().ref(configuration.database["image-item"])

let mutableFields = ['name']

export default {
    /**
     * @param {(imageItem: ImageItem) => boolean} filter 
     * @returns {Promise<ImageItem?>}
     */
    async queryFirst(filter) { 
        var result = null
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let { vendorID, name, extension } = child.val()
            let imageItem = new ImageItem(child.key)
            if (filter(imageItem)) {
                result = imageItem
                return true
            }
            return false
        })
        return result
    },

    /**
     * @param {(imageItem: ImageItem) => boolean} filter 
     * @returns {Promise<ImageItem[]>}
     */
    async query(filter) {
        let result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            let { vendorID, name, extension } = child.val()
            let imageItem = new ImageItem(child.key)
            if (filter(imageItem))
                result.push(imageItem)
        })
        return result
    },

    /**
     * @param {ImageItem} imageItem 
     * @returns {Promise<String>}
     */
    async create(imageItem) {
        let data = { ...imageItem }
        if ('id' in data)
            delete data.id
        let ref = database.push()
        ref.set(data)
        return (await ref).key
    },

    /**
     * @param {ImageItem} imageItem 
     * @returns {void}
     */
    modify(imageItem) {
        let data = { ...imageItem }
        if ('id' in data)
            delete data.id
        database.child(imageItem.id).set(data)
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