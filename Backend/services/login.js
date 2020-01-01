const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { selectByEmail } = require('../config/sqlQueries');
const bcrypt = require('bcryptjs');


/*
 * Check if Email exists
 * Check if password equals to actual hashed password
 * Database access
 */
async function checkLoginDb(email, password) {
    await startConnection();
    const result = await sqlStatement(selectByEmail, [email]);
    closeConnection();
    if (!result.rows.length) {
        return {value: false, msg: ['Email or password incorrect']}
    }
    let user = result.rows[0];
    // Get password to this email
    let hashPassword = user[3];
    // Compare entered password with actual password
    try {
        if (!await bcrypt.compare(password, hashPassword)) {
            return {value: false, msg: ['Email or password incorrect']}
        }
        return {value: user, msg: ['Logging in']}
    } catch (e) {
        return {value: false, msg: ['Something went wrong']}
    }
}

module.exports = {
    checkLoginDb
};
