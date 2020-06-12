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
    item.id = ref.key
    this.foods.push(item)
    let data = { ...item }
    delete data.id
    ref.set(data)
    return ref.key
  }

  /**
   * @param {FoodItem} item 
   */
  modify(item) {
    let index = this.foods.findIndex((val) => val.id === item.id)
    if (index >= 0) {
      this.foods[index] = item
      let data = { ...item }
      delete data.id
      FirebaseAdmin.database().ref('/Food').child(item.id).set(data)
      return true
    }
    return false
  }

  /**
   * @param {string} id 
   */
  remove(id) {
    let index = this.foods.findIndex((val) => val.id === id)
    if (index >= 0) {
      this.foods.splice(index, 1)
      FirebaseAdmin.database().ref('/Food').child(id).remove()
      return true
    }
    return false
  }
}

export default new FoodItemDAO()