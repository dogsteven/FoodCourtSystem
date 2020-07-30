import ImageItem from './model'
import ImageItemDataAccessObject from './data-access-object'
import fs from 'fs'

export default {
    /**
     * @param {string} vendorID 
     * @returns {Promise<ImageItem[]>}
     */
    async queryImageByVendorID(vendorID) {
        return await ImageItemDataAccessObject.query((item) => item.vendorID === vendorID)
    },

    async getImageDataByID(id) {
        let imageItem = await ImageItemDataAccessObject.queryFirst((image) => image.id === id)
        if (imageItem === null)
            return null
        return fs.readFileSync('./static/images/' + imageItem.id + imageItem.name)
    },

    /**
     * @param {string} vendorID 
     * @param {string} name 
     * @param {string} extension 
     * @param {any} data 
     * @returns {Promise<string>}
     */
    async uploadNewImage(vendorID, name, data) {
        let imageItem = new ImageItem("", vendorID, name)
        let id = await ImageItemDataAccessObject.create(imageItem)
        let realFileName = id + name
        fs.writeFile('static/images/' + realFileName, data, (error) => {
            if (error !== null)
                console.log(error)
        })
        return id
    },
    
    /**
     * @param {string} id 
     * @returns {Promise<{ error: string?, status: boolean? }>}
     */
    async removeImageItem(vendorID, id) {
        let imageItem = await ImageItemDataAccessObject.queryFirst((image) => image.id === id)
        if (imageItem === null)
            return {
                error: 'Image with id ' + id + ' is not exist!',
                status: false
            }
        if (imageItem.vendorID !== vendorID)
            return {
                error: 'Unvalid image item!',
                status: false
            }
        let filePath = './static/images/' + imageItem.id + imageItem.name
        ImageItemDataAccessObject.remove(id)
        fs.unlink(filePath, (error) => {
            if (error)
                console.log(error)
        })
        return {
            error: null,
            status: true
        }
    }
}