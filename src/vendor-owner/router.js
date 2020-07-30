import VendorOwnerController from './controller'
import FirebaseAdmin from '../firebase'

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

    router.get('/vendor-owner/notification/test/:customerID', (req, res) => {
        var registrationToken = 'cmqHAiTLoT9s_amyIo7EEh:APA91bEwOwBnJcA_aDOhsoQmHSTax0XQv7NjVi5NtarobbEGDhgJ3O0QTq4GLV9M4BrNSoWWj7MekM55TnbbwDF_hNRmXcTPEnZEmCGo5F7DyKTNkd7NpS65ACBvWzbIFnT5o8e71o0s'
        var message = {
            notification: {
                title : 'Vui lòng đến quầy để lấy thức ăn',
                body: 'Nhớ mang theo hóa đơn nhé!',
                imageUrl : 'https://product.hstatic.net/1000335596/product/img_0163_8dd37ca37c8b447080b3591e540dd99c_2a902d303dac43c0aef9d212828c0b8d.jpg'
            },
            token: registrationToken,
        }
        FirebaseAdmin.messaging().send(message).then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
        });
        res.json({'alo' : 'wtf'})
    })
}

export default run