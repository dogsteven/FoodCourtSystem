export default class Food {
    /**
     * @param {string} id 
     * @param {number} vendorID 
     * @param {string} name 
     * @param {number} price 
     * @param {string} description 
     * @param {string} picture 
     */
    constructor(id, vendorID, name, price, description, picture) {
        this.id = id
        this.data = {
            vendorID: vendorID,
            name: name,
            price: price,
            description: description,
            picture: picture
        }
    }
}