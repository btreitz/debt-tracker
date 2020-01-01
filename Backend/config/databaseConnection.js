const oracledb = require('oracledb');
oracledb.autoCommit = true;
const db_config = require('./db_config.js');

let connection;

module.exports = {
    getDb,
    initDb
};

/*
 * set 'connection' variable
 */
async function initDb() {
    try {
        connection = await oracledb.getConnection(db_config);
        console.log('Connected to Oracle Database...');
    } catch (err) {
        console.log('!!! Connection with Database could not be established !!!');
    }
}

/*
 * get 'connection' to access it
 */
function getDb() {
    return connection;
}
