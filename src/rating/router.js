import RatingController from './controller'
import RatingDataAccessObject from './data-access-object'

/** 
 * @param {import('express').Router} router 
 */
function run(router) {
    router.get('/rating/:customerID/:foodItemID', async (req, res) => {
        let customerID = req.params.customerID
        let foodItemID = req.params.foodItemID
        res.json({
            exist: (await RatingController.queryByCustomerIDAndFoodItemID(customerID, foodItemID)) !== null
        })
    })

    router.post('/rating/:customerID/:foodItemID/:ratingScore', async (req, res) => {
        let customerID = req.params.customerID
        let foodItemID = req.params.foodItemID
        let ratingScore = Number(req.params.ratingScore)
        res.json({
            newRatingScore: (await RatingController.createNewRating(customerID, foodItemID, ratingScore))
        })
    })
}

export default run