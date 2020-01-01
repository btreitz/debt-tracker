const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { insertContactQuery, deleteContactQuery, selectUserContacts, selectContactInfo, selectContactPayments } = require('../config/sqlQueries');
const { addPayReceiveToPayment } = require('./operationsHelper');

module.exports = {
    insertContact,
    deleteContact,
    getUserContacts,
    getContactInformation
};

/*
 * Insert a new contact to the user's contacts_list
 * Database access
 */
async function insertContact(userID, newContactID) {
    await startConnection();
    return sqlStatement(insertContactQuery, [userID, newContactID])
        .then(() => {
            return { err: false, message: 'New Contact added'}
        })
        .catch(err => {
            console.log(err);
            return { err: true, message: 'New contact could not be added'}
        })
        .finally(() => {
            closeConnection();
        })
}

/*
 * Delete a contact from the user's contacts_list
 * Database access
 */
async function deleteContact(userID, deleteContactID) {
    await startConnection();
    return sqlStatement(deleteContactQuery, [userID, deleteContactID])
        .then(() => {
            return { err: false, message: 'Contact deleted'}
        })
        .catch(err => {
            console.log(err);
            return { err: true, message: 'Contact could not be deleted'}
        })
        .finally(() => {
            closeConnection();
        })
}

/*
 * Find all contacts who are in the user's contacts_list
 * Database access
 */
async function getUserContacts(userID) {
    await startConnection();
    return sqlStatement(selectUserContacts, [userID])
        .then(result => {
            console.log(result.rows);
            return { contacts: result.rows, message: 'Contacts found' }
        })
        .catch(err => {
            console.log(err);
            return {contacts: null, message: 'Contacts not found' }
        })
        .finally(() => {
            closeConnection()
        })
}

/*
 * Find contact information and payment information about the contact
 * Database access
 */
async function getContactInformation(userID, contactID) {
    await startConnection();
    // Basic contact information
    let contactInfo = await sqlStatement(selectContactInfo, [contactID, userID])
        .then(result => {
            return result.rows
        })
        .catch(err => {
            console.log(err);
            return null
        });

    // Payment information
    let contactPayments = await sqlStatement(selectContactPayments, [userID, contactID, userID, contactID])
        .then(result => {
            result = addPayReceiveToPayment(userID, result.rows);
            return result
        })
        .catch(err => {
            console.log(err);
            return []
        })
        .finally(() => {
            closeConnection();
        });
    return { contact: contactInfo, payments: contactPayments, message: 'Contact Information sent' }
}
