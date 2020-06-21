import express from 'express'
let router = express.Router()

import FirebaseAdmin from './firebase'

/* database */
router.get('/test/database/:ref', async (req, res) => {
    res.json((await FirebaseAdmin.database().ref('/' + req.params.ref).once('value')).val())
})
/* end database */

/* food-item */
import FoodItem from './food-item/model'
import FoodItemDataAccessObject from './food-item/data-access-object'
/**
 * get: /api/food-item
 * data trả về ở dạng: 
 * {
 *   {
 *     id
 *     vendorID,
 *     name,
 *     price,
 *     quantity
 *     categories,
 *     description,
 *     photo
 *   }[]
 * }
 */
router.get('/food-item', async (req, res) => {
    res.json(await FoodItemDataAccessObject.query())
})
/**
 * get: /api/food-item/:id
 * :id là id của food item muốn lấy thông tin
 * Nếu id là trùng khớp thì trả về
 * {
 *   vendorID,
 *   name,
 *   price,
 *   quantity
 *   categories,
 *   description,
 *   photo
 * }
 */
router.get('/food-item/:id', async (req, res) => {
    res.json(await FoodItemDataAccessObject.queryByID(req.params.id))
})
/**
 * post: /api/food-item
 * - header:
 * {
 *   "Content-Type": "application/json"
 * }
 * - data:
 * {
 *   vendorID,
 *   name,
 *   price,
 *   quantity,
 *   categories,
 *   description,
 *   photo
 * }
 * 
 * Thêm món ăn mới vào database và trả về:
 * {
 *   key
 * }
 * trong đó key là id của món ăn mới thêm
 */
router.post('/food-item', (req, res) => {
    let vendorID = req.body.vendorID
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let categories = req.body.categories
    let description = req.body.description
    let photo = req.body.photo

    let item = new FoodItem("", vendorID, name, price, quantity, categories, description, photo)
    let id = FoodItemDataAccessObject.create(item)
    res.json({
        key: id
    })
})
/**
 * put: /api/food-item/:id
 * :id là id của food item muốn sửa
 * - header:
 * {
 *   "Content-Type": "application/json"
 * }
 * - data:
 * {
 *   vendorID,
 *   name,
 *   price,
 *   quantity,
 *   categories,
 *   description,
 *   photo
 * }
 *
 * Nếu tìm thấy id trùng khớp thì sửa các lại food item đó và trả về:
 * {
 *   status: true
 * }
 * Nếu không thì trả về:
 * {
 *   status: false
 * }
 */
router.put('/food-item/:id', async (req, res) => {
    let id = req.params.id
    let vendorID = req.body.vendorID
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let categories = req.body.categories
    let description = req.body.description
    let photo = req.body.photo

    let item = new FoodItem(id, vendorID, name, price, quantity, categories, description, photo)
    let status = await FoodItemDataAccessObject.modify(item)
    res.json({
        status: status
    })
})
/**
 * delete: /api/food-item/:id
 * :id là id của food item muốn xóa
 * Nếu id trùng khớp thì sẽ xóa food item đó và trả về:
 * {
 *   status: true
 * }
 * nếu không thì trả về:
 * {
 *   status: false
 * }
 */
router.delete('/food-item/:id', async (req, res) => {
    let id = req.params.id
    let status = await FoodItemDataAccessObject.remove(id)
    res.json({
        status: status
    })
})
/* end food-item */

/* vendor-owner */

/* end vendor-owner */

/* customer */
import Customer from './customer/model'
import CustomerDataAccessObject from './customer/data-access-object'
/**
 * get: /api/customter/:username/:password
 * :username, :password lần lược là username và password của customer
 * Dữ liệu trả về:
 * - Nếu username và password trùng khớp thì sẽ trả về dạng sau
 * {
 *   id,
 *   info: {
 *     username,
 *     firstname,
 *     lastname,
 *     email
 *   }
 * }
 * - Nếu username và password trùng khớp thì trả về null
 */
router.get('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    res.json(await CustomerDataAccessObject.queryByUsernamePassword(username, password))
})
/**
 * get: /api/customter/:id
 * :id là id của customer
 * - Nếu id trùng khớp thì sẽ trả về:
 * {
 *   id,
 *   info: {
 *     username,
 *     firstname,
 *     lastname,
 *     email
 *   }
 * }
 * - Nếu id không trùng khớp với bất cứ dữ liệu nào thì trả về null
 */
router.get('/customer/:id', async (req, res) => {
    let id = req.params.id
    res.json(await CustomerDataAccessObject.queryByID(id))
})

/**
 * post: /api/customer
 * - headers: 
 * {
 *   "Content-Type": "application/json"
 * }
 * - data:
 * {
 *   username,
 *   password,
 *   firstname,
 *   lastname,
 *   email
 * }
 * Dữ liệu trả về:
 * {
 *   id
 * }
 * Nếu một customer đã tồn tại username đó thì sẽ trả về:
 * {
 *   id: null
 * }
 * Nếu không có customer nào có cùng username thì sẽ tạo một tài khoản customer mới và trả về id của tài khoản mới đó.
 */
router.post('/customer', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let customer = new Customer("", username, password, firstname, lastname, email)
    res.json({
        id: await CustomerDataAccessObject.create(customer)
    })
})
/**
 * put: /customer/:username/:password
 * - headers:
 * {
 *   "Content-Type": "application/json"
 * }
 * - data: 
 * {
 *   password,
 *   firstname,
 *   lastname,
 *   email
 * }
 * 
 * Nếu username và password không đúng thì sẽ trả về:
 * {
 *   status: false
 * }
 * Nếu username và password đúng thì sẽ sửa password, firstname, lastname, email như trong data và 
 */
router.put('/customer/:username/:password', async (req, res) => {
    let username = req.params.username
    let password = req.params.password
    let newPassword = req.body.password
    let newFirstname = req.body.firstname
    let newLastname = req.body.lastname
    let newEmail = req.body.email
    let info = await CustomerDataAccessObject.queryByUsernamePassword(username, password)
    if (info !== null) {
        let customer = new Customer(info.id, username, newPassword, newFirstname, newLastname, newEmail)
        CustomerDataAccessObject.modify(customer)
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
})
/* end customer */

/* order for customers */
import OrderController from './order/controller'
router.post('/order-customer', async (req, res) => {
    let customerID = req.body.customerID
    let vendorID = req.body.vendorID
    let items = req.body.items
    let customer = await CustomerDataAccessObject.queryByID(customerID)
    if (customer === null) {
        res.json({
            error: "Wrong customerID!"
        })
    } else {
        let id = await OrderController.makeOrder(vendorID, customerID, items)
        res.json({
            error: null,
            id: id
        })
    }
})
/* end order for customers */

/* order for cooks */

/* end order for cooks */

/* categories */

router.get('/categories', async (req, res) => {
    res.json((await FirebaseAdmin.database().ref('/FoodCourt/Categories').once('value')).val())
})

/* end categories */

export default router