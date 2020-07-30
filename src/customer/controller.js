import Customer from './model'
import CustomerDataAccessObject from './data-access-object'

export default {
    UserService: {
        /**
         * @param {string} username 
         * @param {string} password 
         * @returns {Promise<Customer?>}
         */
        async queryByUsernamePassword(username, password) {
            return await CustomerDataAccessObject.queryFirst((customer) => customer.username === username && customer.password === password)
        },

        /**
         * @param {String} id
         * @returns {Promise<Customer?>}
         */
        async queryByID(id) {
            return await CustomerDataAccessObject.queryFirst((customer) => customer.username === id)
        },

        /**
         * @param {Customer} newCustomer 
         * @returns {Promise<string?>}
         */
        async register(username, password, firstname, lastname, email) {
            if ((await CustomerDataAccessObject.queryFirst((customer) => customer.username === username)) !== null)
                return null
            let customer = new Customer("", username, password, firstname, lastname, email)
            return await CustomerDataAccessObject.create(customer)
        },

        /**
         * @param {string} username 
         * @param {string} password 
         * @param {string} newPassword 
         * @param {string} newFirstname 
         * @param {string} newLastname 
         * @param {string} newEmail 
         * @returns {Promise<boolean>}
         */
        async changeProfile(username, password, newPassword, newFirstname, newLastname, newEmail) {
            let customer = await CustomerDataAccessObject.queryFirst((customer) => customer.username === username && customer.password === password)
            if (customer === null)
                return false
            customer.password = newPassword
            customer.firstname = newFirstname
            customer.lastname = newLastname
            customer.email = newEmail
            CustomerDataAccessObject.modify(customer)
            return true
        },

        /**
         * @param {string} username 
         * @param {string} password 
         * @param {Promise<boolean>}
         */
        async removeAccount(username, password) {
            let customer = await CustomerDataAccessObject.queryFirst((customer) => customer.username === username && customer.password === password)
            if (customer === null)
                return false
            CustomerDataAccessObject.remove(customer.id)
            return true
        },

        /**
         * @param {string} id
         * @param {string} token 
         * @returns {Promise<boolean>}
         */
        async addNewRegistrationToken(id, token) {
            let customer = await CustomerDataAccessObject.queryFirst((customer) => customer.id === id)
            if (customer === null)
                return false
            console.log(token)
            let newTokens = customer.registrationTokens.concat(token)
            if (!customer.registrationTokens.includes(token)) {
                CustomerDataAccessObject.modifyByField(id, 'registrationTokens', newTokens)
                console.log(customer.registrationTokens)
            }
            return customer.registrationTokens.length
        }
    },

    ManagerService: {
        /**
         * @param {string} id 
         * @returns {Promise<Customer?>}
         */
        async queryByID(id) {
            return await CustomerDataAccessObject.queryFirst((customer) => customer.id === id)
        }
    }
}