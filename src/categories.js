import FirebaseAdmin from './firebase'
import configuration from './configuration'

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

export default run