const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { selectByUsernameOrEmail } = require('../config/sqlQueries');

module.exports = {
    searchInDb
};

/*
 * Find all users who contain searchString in username or email
 * Database access
 */
async function searchInDb(searchString, id) {
    await startConnection();
    const result = await sqlStatement(selectByUsernameOrEmail, [id, '%' + searchString + '%', '%' + searchString + '%', id]);
    closeConnection();
    if (!result.rows.length) {
        return { err: true, users: null, message: 'No user found'}
    }
    return { err: false, users: result.rows, message: 'Users found'}
}
