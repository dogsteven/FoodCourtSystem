import FoodItemController from './controller'

/**
 * @param {import('express').Router} router 
 */
function UserService(router) {
    router.get('/food-item', async (req, res) => {
        res.json(await FoodItemController.UserService.getAllFood())
    })
}

/**
 * @param {import('express').Router} router 
 */
function ManagerService(router) {

}

/**
 * @param {import('express').Router} router 
 */
function run(router) {
    UserService(router)
    ManagerService(router)
}

export default run