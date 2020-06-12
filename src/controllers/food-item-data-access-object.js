import FoodItem from '../models/food-item'
import FirebaseAdmin from '../configurated-firebase'

class FoodItemDAO {
  constructor() {
  }

  async query() {
    let snapshot = await FirebaseAdmin.database().ref('/Food').once('value');
    return snapshot.val()
  }

  /**
   * @param {string} id 
   */
  async queryByID(id) {
    var item = null
    let snapshot = await FirebaseAdmin.database().ref('/Food').once('value');
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
   * @param {FoodItem} item 
   */
  create(item) {
    let ref = FirebaseAdmin.database().ref('/Food').push()
    let data = { ...item }
    delete data.id
    ref.set(data)
    return ref.key
  }

  /**
   * @param {FoodItem} item 
   */
  async modify(item) {
    let checker = await this.queryByID(item.id)
    if (checker !== null) {
      var data = { ...item }
      delete data.id
      FirebaseAdmin.database().ref('/Food').child(item.id).set(data)
      return true
    }
    return false
  }

  /**
   * @param {string} id 
   */
  async remove(id) {
    let checker = await this.queryByID(id)
    if (checker !== null) {
      FirebaseAdmin.database().ref('/Food').child(id).remove()
      return true
    }
    return false
  }
}

export default new FoodItemDAO()