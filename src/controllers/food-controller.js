import Food from '../models/food'
import FirebaseAdmin from '../configurated-firebase'

class FoodController {
  constructor() {
    this.foods = {}
    FirebaseAdmin.database().ref('/Food').once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        this.foods[child.key] = child.val()
      })
    })
  }

  query() {
    return this.foods
  }

  /**
   * @param {Food} newItem 
   */
  create(newItem) {
    let ref = FirebaseAdmin.database().ref('/Food').push()
    ref.set(newItem)
    this.foods[ref.key] = newItem
    return ref.key
  }

  /**
   * @param {string} id
   * @param {Food} item 
   */
  modify(id, item) {
    if ((id in this.foods) === false)
      return true
    FirebaseAdmin.database().ref('/Food').child(id).set(item)
    this.foods[id] = item
    return true
  }

  /**
   * @param {string} id 
   */
  remove(id) {
    if ((id in this.foods) === false)
      return false
    FirebaseAdmin.database().ref('/Food').child(id).remove()
    delete this.foods[id]
    return true
  }
}

export default new FoodController()