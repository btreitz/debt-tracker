const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { insertPaymentQuery, selectAllUserPayments } = require('../config/sqlQueries');
const { addPayReceiveToPayment } = require('./operationsHelper');


module.exports = {
    addPayment,
    getUserPayments
};

/*
 * Insert a new payment to table 'payments'
 * Database access
 */
async function addPayment(fromID, toID, amount, currency, description, date) {
    await startConnection();
    return sqlStatement(insertPaymentQuery, [fromID, toID, amount, currency, description, date])
        .then(() => {
            return { err: false, message: 'Payment added'}
        })
        .catch(err => {
            console.log(err);
            return { err: true, message: 'Payment could not be added'}
        })
        .finally(() => {
            closeConnection();
        })
}

/*
 * Find all payments to and from specific user
 * Database access
 */
async function getUserPayments(userID) {
    await startConnection();
    return sqlStatement(selectAllUserPayments, [userID])
        .then(result => {
            result = addPayReceiveToPayment(userID, result.rows);
            console.log(result);
            return { payments: result, message: 'Payments found'}
        })
        .catch(err => {
            console.log(err);
            return { payments: null, message: 'Payments could not be found'}
        })
        .finally(() => {
            closeConnection();
        })
}
