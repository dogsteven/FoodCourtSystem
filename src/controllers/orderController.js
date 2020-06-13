import FoodItem from '../models/order'
import FirebaseAdmin from '../configurated-firebase'

class OrderController {
  constructor() {
  }

  async query() {
    let snapshot = await FirebaseAdmin.database().ref('/Order').once('value');
    return snapshot.val()
  }

  /**
   * @param {string} id 
   */
  async queryByID(id) {
    var item = null
    let snapshot = await FirebaseAdmin.database().ref('/Order').once('value');
    snapshot.forEach((child) => {
      if (child.key === id) {
        item = { ...child.val() }
        return true
      }
      return false
    })
    return item
  }

  /**
   * @param {Order} order 
   */
  create(order) {
    let ref = FirebaseAdmin.database().ref('/Order').push()
    let data = { ...order }
    delete data.id
    ref.set(data)
    return ref.key
  }

  /**
   * @param {Order} order 
   */
  async modify(order) {
    let checker = await this.queryByID(order.queueId)
    if (checker !== null) {
      var data = { ...order }
      delete data.queueId
      FirebaseAdmin.database().ref('/Order').child(order.queueId).set(data)
      return true
    }
    return false
  }

  /**
   * @param {string} id 
   */
  async remove(id) {
    let checker = await this.queryByID(queueId)
    if (checker !== null) {
      FirebaseAdmin.database().ref('/Order').child(queueId).remove()
      return true
    }
    return false
  }
}

export default new OrderController()