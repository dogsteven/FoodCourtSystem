import Vendor from './model'
import VendorDataAccessObject from './data-access-obejct'
import VendorOwnerController from '../vendor-owner/controller'

export default {
    /**
     * @returns {Promise<Vendor[]>}
     */
    async getAll() {
        return await VendorDataAccessObject.query((item) => true)
    },

    /**
     * @param {string} name 
     * @param {string} description 
     * @returns {Promise<string>}
     */
    async create(name, description) {
        let vendor = new Vendor("", name, description)
        return await VendorDataAccessObject.create(vendor)
    },

    /**
     * @param {string} username 
     * @param {string} password 
     * @param {string} id 
     * @param {string} name 
     * @param {string} description 
     * @returns {Promise<string>}
     */
    async modify(username, password, id, name, description) {
        let vendorOwner = await VendorOwnerController.queryByUsernamePassword(username, password)
        if (vendorOwner === null)
            return false
        if (vendorOwner.vendorID === id) {
            let vendor = new Vendor(id, name, description)
            VendorDataAccessObject.modify(vendor)
            return true
        }
        return false
    },
}