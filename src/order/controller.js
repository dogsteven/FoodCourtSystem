import FirebaseAdmin from '../firebase'
import configuration from '../configuration'
import OrderItem from './order-item/model'
import CartItem from './cart-item/model'
import Order from './model'

let database = FirebaseAdmin.database().ref(configuration.database.order)

class Controller {
    constructor() {
        this.waitingQueue = {}
        this.cookingQueue = {}
    }

    

    
}

export default new Controller()