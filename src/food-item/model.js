export default class {

    /**
     * @param {string} id 
     * @param {string} vendorID 
     * @param {string} name 
     * @param {number} price 
     * @param {number} quantity 
     * @param {string[]} categories 
     * @param {string} description 
     * @param {string} photo 
<<<<<<< HEAD
     * @param {number} rating
     * @param {number} ratingTimes
     */
    constructor(id, vendorID, name, price, quantity, categories, description, photo, rating = 0, ratingTimes = 0) {
=======
     */
    constructor(id, vendorID, name, price, quantity, categories, description, photo) {
>>>>>>> origin/backhoa
        this.id = id
        this.vendorID = vendorID
        this.name = name
        this.price = price
        this.quantity = quantity
        this.categories = categories
        this.description = description
        this.photo = photo
<<<<<<< HEAD
        this.rating = rating
        this.ratingTimes = ratingTimes
=======
>>>>>>> origin/backhoa
    }
}