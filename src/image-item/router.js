import ImageItemController from './controller'
import VendorOwnerController from '../vendor-owner/controller'
/**
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/image-item/vendorID/:id', (req, res) => {
        let vendorID = req.params.id
        ImageItemController.queryImageByVendorID(vendorID)
            .then((images) => images.map((item) => item.id))
            .then((ids) => {
                res.json(ids)
            })
    })

    router.get('/image-item/:id', async (req, res) => {
        let id = req.params.id
        let data = await ImageItemController.getImageDataByID(id)
        if (data === null)
            res.json({
                error: 'Image with id ' + id + ' is not exist!'
            })
        else
            res.end(data)
    })

    router.post('/image-item/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner === null)
            res.json({
                error: 'Wrong username or password!',
                id: null
            })
        else if (req.files === null)
            res.json({
                error: 'Empty file!',
                id: null
            })
        else
            res.json({
                error: null,
                id: await ImageItemController.uploadNewImage(vendorOwner.vendorID, req.files.file.name, req.files.file.data)
            })
    })

    router.delete('/image-item/:id/:username/:password', (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let id = req.params.id
        
        VendorOwnerController.queryByUsernamePassword(username, password)
            .then((vo) => {
                if (vo === null)
                    res.json({
                        error: 'Username or password is incorrect!',
                        status: false
                    })
                else
                    ImageItemController.removeImageItem(vo.vendorID, id)
                        .then((response) => {
                            res.json(response)
                        })
            })
        
    })
}

export default run