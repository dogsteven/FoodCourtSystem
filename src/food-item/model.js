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
     */
    constructor(id, vendorID, name, price, quantity, categories, description, photo) {
        this.id = id
        this.vendorID = vendorID
        this.name = name
        this.price = Number(price)
        this.quantity = Number(quantity)
        this.categories = categories
        this.description = description
        this.photo = photo
        this.rating = Number(rating)
        this.ratingTimes = Number(ratingTimes)
    }
}