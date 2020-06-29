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
     * @param {string} username 
     * @param {string} password 
     * @param {string} vendorID 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} email 
     * @returns {Promise<string?>}
     */
    async register(username, password, vendorID, firstname, lastname, email) {
        let vendorOwner = new VendorOwner("", username, password, vendorID, firstname, lastname, email)
        let isExist = await VendorOwnerDataAccessObject.queryFirst((vo) => vo.username === username) !== null
        if (isExist === true)
            return null
        return await VendorOwnerDataAccessObject.create(vendorOwner)
    }
}