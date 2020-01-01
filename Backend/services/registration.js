const bcrypt = require('bcryptjs');
const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { selectByEmail, selectByUsername, insertUser } = require('../config/sqlQueries');
const saltRounds = 10;

/*
 * Validate Registration input
 * Database access
 */
async function validateRegisterData(username, email) {
    await startConnection();
    // check if username already exists
    const userResult = await sqlStatement(selectByUsername, [username]);
    // username already exists
    if (userResult.rows.length) {
        closeConnection();
        return {value: false, msg: ['Username already exists']};
    }
    // Check if email is not in Database already
    const emailResult = await sqlStatement(selectByEmail, [email]);
    // email already exists
    if (emailResult.rows.length) {
        closeConnection();
        return {value: false, msg: ['Email already exists']};
    }
    // If everything went well...
    return {value: true, msg: ['Registration successful!']};
}

/*
 * bcrypt
 * Generate salt
 * Hash password based on salt
 * Send hashed password to insert the new user
 */
function createUser(username, email, password){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, saltRounds)
            .then(function(hash) {
                insertNewUser(username, email, hash);
            });
    });
}

/*
 * Insert User with hashed password into table 'users'
 * Database access
 */
function insertNewUser(username, email, password) {
    sqlStatement(insertUser, [username, email, password])
        .then(() => {
            console.log('User successfully added to DB');
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            closeConnection();
        })
}

module.exports = {
    validateRegisterData,
    createUser
};
