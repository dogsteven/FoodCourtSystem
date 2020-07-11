import VendorOwner from './model'
import VendorOwnerDataAccessObject from './data-access-object'

export default {
    /**
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<VendorOwner?>}
     */
    async queryByUsernamePassword(username, password) {
        return await VendorOwnerDataAccessObject.queryFirst((vendorOwner) => vendorOwner.username === username && vendorOwner.password === password)
    },

    /**
     * @returns {Promise<VendorOwner[]>}
     */
    async queryByAll() {
        return await VendorOwnerDataAccessObject.query((vo) => true)
    },

    /**
     * @param {string} username 
     * @param {string} password 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} email 
     * @param {string} vendorID 
     */
    async create(username, password, firstname, lastname, email, vendorID) {
        let isExist = (await VendorOwnerDataAccessObject.queryFirst((vo) => vo.username === username)) !== null
        if (isExist)
            return null
        let vendorOwner = new VendorOwner("", username, password, vendorID, firstname, lastname, email)
        return await VendorOwnerDataAccessObject.create(vendorOwner)
    }
}