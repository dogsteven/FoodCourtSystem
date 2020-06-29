import FoodItemController from './controller'

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
}

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    UserService(router)
    ManagerService(router)
}

export default run