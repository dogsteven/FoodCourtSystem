import VendorController from './controller'

/** 
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/vendor', async (req, res) => {
        res.json(await VendorController.getAll())
    })

    router.post('/vendor', async (req, res) => {
        let name = req.body.name
        let description = req.body.description
        res.json({
            id: await VendorController.create(name, description)
        })
    })

    router.put('/vendor/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let id = req.body.id
        let name = req.body.name
        let description = req.body.description

        res.json({
            status: await VendorController.modify(username, password, id, name, description)
        })
    })
}

export default run