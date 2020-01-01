const db = require('../config/databaseConnection');
let connection;

module.exports = {
    startConnection,
    closeConnection,
    sqlStatement,
};

/*
 * Initiate connection to the database
 */
async function startConnection() {
    await db.initDb();
    connection = db.getDb();
}

/*
 * Terminate the initiated connection
 */
function closeConnection() {
    connection.close().then(() => console.log('...Database connection closed'));
}
/*
 * Template to execute any sql-statement
 */
async function sqlStatement(query, param) {
    return await connection.execute(query, param)
        .then(rows => {
            return rows
        })
        .catch(err => {
            console.log('Request cancelled');
            console.log(err);
            return err
        });
}
