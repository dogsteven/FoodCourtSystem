import FoodItem from './model'
import FoodItemController from './controller'
import VendorOwnerController from '../vendor-owner/controller'

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
    router.get('/food-item', async (req, res) => {
        res.json(await FoodItemController.UserService.getAllFoods())
    })
}

/**
 * @param {import('express').Router} router 
 */
function ManagerService(router) {
    router.get('/manager/food-item/:vendorID', async (req, res) => {
        let vendorID = req.params.vendorID
        res.json(await FoodItemController.ManagerService.getFoodsByVendorID(vendorID))
    })

    router.put('/manager/food-item/:username/:password/:id/:amount', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner !== null) {
            let id = req.params.id
            let amount = Number(req.params.amount)
            let status = await FoodItemController.ManagerService.increaseQuantity(vendorOwner.vendorID, id, amount)
            res.json({
                status: status
            })
        } else
            res.json({
                status: false
            })
    })

    router.post('/manager/food-item/:username/:password', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner !== null) {
            let name = req.body.name
            let price = Number(req.body.price)
            let quantity = Number(req.body.quantity)
            let categories = req.body.categories
            let description = req.body.description
            let photo = req.body.photo
            let id = await FoodItemController.ManagerService.addNewFood(vendorOwner.vendorID, name, price, quantity, categories, description, photo)
            res.json({
                status: true,
                id: id
            })
        } else
            res.json({
                status: false
            })
    }),

    router.put('/manager/food-item/:username/:password/:id', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner !== null) {
            let id = req.params.id
            let name = req.body.name
            let price = Number(req.body.price)
            let categories = req.body.categories
            let description = req.body.description
            let photo = req.body.photo
            let status = await FoodItemController.ManagerService.changeFoodItemInformation(vendorOwner.vendorID, id, name, price, categories, description, photo)
            res.json({
                status: status
            })
        } else
            res.json({
                status: false
            })
    })

    router.delete('/manager/food-item/:username/:password/:id', async (req, res) => {
        let username = req.params.username
        let password = req.params.password
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner !== null) {
            let id = req.params.id
            res.json({
                status: await FoodItemController.ManagerService.removeFood(vendorOwner.vendorID, id)
            })
        } else
            res.json({
                status: false
            })
    })
}

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    UserService(router)
    ManagerService(router)
}

export default run