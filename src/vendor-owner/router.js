import VendorOwnerController from './controller'

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/vendor-owner/vendor/:vendorID', async (req, res) => {
        let vendorID = req.params.vendorID
        res.json(
            (await VendorOwnerController.queryByAll())
                .filter(vo => vo.vendorID === vendorID)
                .map(
                    vo => ({
                        id: vo.id,
                        username: vo.username,
                        firstname: vo.firstname,
                        lastname: vo.lastname,
                        email: vo.email
                    })
                )
        )
    })

    router.get('/vendor-owner/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        res.json(await VendorOwnerController.queryByUsernamePassword(username, password))
    })

    router.post('/vendor-owner/vendor/:vendorID/', async (req, res) => {
        let vendorID = req.params.vendorID
        let { username, password, firstname, lastname, email } = req.body
        let id = await VendorOwnerController.create(username, password, firstname, lastname, email, vendorID)
        if (id === null)
            res.json({
                error: 'Vendor Owner with username ' + username + ' is exist!',
                id: null
            })
        else
            res.json({
                error: null,
                id: id
            })
    })

    router.delete('/vendor-owner/:id', async (req, res) => {
        let id = req.params.id
        res.json({
            status: await VendorOwnerController.remove(id)
        })
    })
}

export default run