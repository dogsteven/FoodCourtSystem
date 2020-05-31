export default class Food {
    /**
     * @param {number} vendorID 
     * @param {string} name 
     * @param {number} price 
     * @param {string} description 
     * @param {string} picture 
     */
    constructor(vendorID, name, price, description, picture) {
        this.vendorID = vendorID
        this.name = name
        this.price = price
        this.description = description
        this.picture = picture
    }
}