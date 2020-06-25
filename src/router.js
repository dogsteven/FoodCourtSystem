import { Router } from 'express'
let router = Router()

/** User space  **/
/* food */
import FoodItemController from './food-item/controller'
router.get('/food-item', async (req, res) => {
    res.json(await FoodItemController.UserService.getAllFood())
})
/* end food */

/* customer */
import CustomerController from './customer/controller'
router.get('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    res.json(await CustomerController.UserService.queryByUsernamePassword(username, password))
})

router.post('/customer', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email

    let id = await CustomerController.UserService.register(username, password, firstname, lastname, email)
    if (id === null)
        res.json(null)
    else
        res.json({ id: id })
})

router.put('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    let newPassword = req.body.password
    let newFirstname = req.body.firstname
    let newLastname = req.body.lastname
    let newEmail = req.body.email

    res.json({
        status: await CustomerController.UserService.changeProfile(username, password, newPassword, newFirstname, newLastname, newEmail)
    })
})

router.delete('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    
    res.json({
        status: await CustomerController.UserService.removeAccount(username, password)
    })
})

router.get('/customer/:id/newRegistrationToken/:token', async (req, res) => {
    let id = req.params.id
    let token = req.params.token
    res.json({
        status: await CustomerController.UserService.addNewRegistrationToken(id, token)
    })
})
/* end customer */

/* order */

/* end order */

/** end User space **/

export default router