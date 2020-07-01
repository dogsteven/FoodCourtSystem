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

    /**
     * @param {string} vendorID 
     * @param {string} name 
     * @param {string} extension 
     * @param {any} data 
     * @returns {Promise<string>}
     */
    async uploadNewImage(vendorID, name, extension, data) {
        let imageItem = new ImageItem("", vendorID, name, extension)
        let id = await ImageItemDataAccessObject.create(imageItem)
        let realFileName = name + id + '.' + extension
        fs.writeFile('./static/images' + realFileName, data)
        return realFileName
    },

    
}