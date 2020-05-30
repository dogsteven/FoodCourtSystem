import Food from '../models/food'
import FirebaseAdmin from '../configurated-firebase'

class FoodController {
    constructor() {
        this.foods = []
        FirebaseAdmin.database().ref('/Food').once('value').then((snapshot) => {
            snapshot.forEach((child) => {
                this.foods.push(
                    new Food(child.key, child.vendorID, child.name, child.price, child.description, child.picture)
                )
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
        newItem.id = ref.key
        ref.set(newItem.data)
        this.foods.push(newItem)
    }

    /**
     * @param {Food} item 
     */
    modify(item) {
        let id = item.id
        let index = this.foods.findIndex((food) => { return id === food.id })
        if (index === -1)
            return false
        FirebaseAdmin.database().ref('/Food').child(id).set(item.data)
        this.foods[index] = item
        return true
    }

    /**
     * @param {string} id 
     */
    remove(id) {
        let index = this.foods.findIndex((food) => { return id === food.id })
        if (index === -1)
            return false
        FirebaseAdmin.database().ref('/Food').child(id).remove()
        this.foods.splice(index, 1)
        return true
    }
}

export default new FoodController()