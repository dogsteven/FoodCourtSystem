export default class {
    /**
     * @param {string} id
     * @param {string} username 
     * @param {string} password 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} email 
     */
    constructor(id, username, password, firstname, lastname, email) {
        this.id = id
        this.username = username
        this.password = password
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.registrationTokens = []
    }
}