import FirebaseAdmin from './firebase'
import configuration from './configuration'
import controller from './food-item/controller'

let database = FirebaseAdmin.database().ref(configuration.database.categories)

let Controller = {
    /**
     * @returns {Promise<string[]>}
     */
    async query() {
        let result = []
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            result.push(child.val())
        })
        return result
    },

    /**
     * @param {string} category 
     * @returns {Promise<boolean>}
     */
    async addNewCategories(category) {
        var valid = true
        var counter = 0
        let snapshot = await database.once('value')
        snapshot.forEach((child) => {
            if (child.val() === category) {
                valid = false
                return true
            }
            counter += 1
            return false
        })
        if (valid)
            database.child(counter).set(category)
        return valid
    },

    
}

/**
 * 
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/categories', async (req, res) => {
        res.json(await Controller.query())
    })
}

export default {
    /**
     * @param {import('express').Router} router 
     */
    Router(router) {
        run(router)
    },
    ...Controller
}