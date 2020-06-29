export default class {
    /**
     * @param {string} id
     * @param {string} username 
     * @param {string} password 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} email 
     * @param {string[]} registrationTokens
     */
    constructor(id, username, password, firstname, lastname, email, registrationTokens = []) {
        this.id = id
        this.username = username
        this.password = password
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.registrationTokens = registrationTokens
    }
}