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

    router.get('/vendor-owner/notification/:vendor/test/', async(req, res) => {
        let owner = req.params.vendor
        console.log(owner)
        var registrationToken = 'eNUNsTrBoq0EO5onwhEFgD:APA91bHibBCMFgSTyFHucg5rU_wJ4Qk2Eut_T4ivYeTEMlI93N2ItlBFPJqYOQfZvoQ3rus0iPB_XHbblMq2vLVmkDxpenGT0otyN01II_6NWMwNj8o30upVqWMBnKab6RemZQeGKg-t'
        // var message = {
        //     "notification": {
        //         "title": "Firebase",
        //         "body": "Firebase is awesome from " + owner,
        //         "click_action": "https://facebook.com/sotfdat",
        //     },
        //     "to": registrationToken
        // }
        var message = {
            notification: {
                title : 'alo',
                body: 'del hieu sao'
            },
            token: registrationToken,
        }
        // promises.push(this.app.messaging().sendMulticast(msg));
        // Send a message to the device corresponding to the provided
        // registration token.
        console.log("ALo")
        console.log(message)
        FirebaseAdmin.messaging().send(message).then((response) => {
            // Response is a message ID string.
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