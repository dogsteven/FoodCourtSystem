import e from "express"

export default class {
    /**
     * @param {string} username
     * @param {string} password
     * @param {string} vendorID
     * @param {string} firstname
     * @param {string} lastname
     * @param {string} email
     */
    constructor(username, password, vendorID, firstname, lastname, email) {
        this.username = username
        this.password = password
        this.vendorID = vendorID
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
    }
}