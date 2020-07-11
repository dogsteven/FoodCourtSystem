import VendorOwnerController from './controller'
import FirebaseAdmin from '../firebase'

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/vendor-owner/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        res.json(await VendorOwnerController.queryByUsernamePassword(username, password))
    })

    /**
     * @param {string} vendor who sent notification
     * @return {void}
     */
    router.get('/vendor-owner/notification/:vendor/test/', async(req, res) => {
        let owner = req.params.vendor
        var registrationToken = 'eNUNsTrBoq0EO5onwhEFgD:APA91bHibBCMFgSTyFHucg5rU_wJ4Qk2Eut_T4ivYeTEMlI93N2ItlBFPJqYOQfZvoQ3rus0iPB_XHbblMq2vLVmkDxpenGT0otyN01II_6NWMwNj8o30upVqWMBnKab6RemZQeGKg-t'
        var message = {
            notification: {
                title : 'alo',
                body: 'del hieu sao',
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
        res.json(await VendorOwnerController.queryByUsernamePassword('dogsteven', 'thisismypassword'))
    })

    /**
     * @param {string} vendor who sent
     * @param {string} userid who will recv
     * @param {string} foodID ready food
     * @returns {void}
     */
    router.post('/vendor-owner/notification/done/:vendor/:userid/:foodID', async(req, res) => {
        let owner = req.params.vendor
        let user = req.params.userid
        let foodID = red.params.foodID
        console.log(owner)
        var registrationToken = 'eNUNsTrBoq0EO5onwhEFgD:APA91bHibBCMFgSTyFHucg5rU_wJ4Qk2Eut_T4ivYeTEMlI93N2ItlBFPJqYOQfZvoQ3rus0iPB_XHbblMq2vLVmkDxpenGT0otyN01II_6NWMwNj8o30upVqWMBnKab6RemZQeGKg-t'
        var message = {
            notification: {
                title : 'Ready Food for you',
                body: 'alo'
            },
            token: registrationToken,
        }
        FirebaseAdmin.messaging().send(message).then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
        });
        res.json(await VendorOwnerController.queryByUsernamePassword('dogsteven', 'thisismypassword'))
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