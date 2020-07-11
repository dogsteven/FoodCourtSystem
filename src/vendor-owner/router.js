import VendorOwnerController from './controller'

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/vendor-owner/:vendorID', async (req, res) => {
        let vendorID = req.params.vendorID
        res.json(
            (await VendorOwnerController.queryByAll())
                .filter(vo => vo.vendorID === vendorID)
                .map(
                    vo => ({ 
                        id: vo.id, 
                        vendorID: vo.vendorID 
                    })
                )
        )
    })

    router.get('/vendor-owner/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        res.json(await VendorOwnerController.queryByUsernamePassword(username, password))
    })
}

export default run