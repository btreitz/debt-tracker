module.exports = {
    addPayReceiveToPayment
};

/*
 * Set Decimal of payment amount to 2 digits in case of Decimal bug
 * Access in paymentOperations.js & contactOperations.js
 */
function addPayReceiveToPayment(userID, rows) {
    for (let i = 0; i < rows.length; i++) {
        rows[i][2] = rows[i][2].toFixed(2);
        if (rows[i][0] === userID) {
            rows[i].push(-1)
        } else {
            rows[i].push(1)
        }
    }
    return rows
}
