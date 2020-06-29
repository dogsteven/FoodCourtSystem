import VendorOwnerController from './controller'

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/vendor-owner/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        res.json(await VendorOwnerController.queryByUsernamePassword(username, password))
    })

    router.post('/vendor-owner/:key', async (req, res) => {
        let key = req.params.key
        let username = req.body.username
        let password = req.body.password
        let vendorID = req.body.vendorID
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.lastname

        let id = await VendorOwnerController.register(username, password, vendorID, firstname, lastname, email)
        if (id === null)
            res.json(null)
        else 
            res.json({ id: id })
    })
}

export default run