const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, conection) => {
    if (err) {
        if (err.code === 'PROTOCON_CONNECTION_LOST') {
            console.error('DATABASE CONECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONECTIONS');
        }
        if (err.code === 'ECONNREFUSEDD') {
            console.error('DATABASE CONECTION REFUSED');
        }
    }

    if (conection) conection.release();
    console.log('DATABASE CONNECTED');
    return;
});

// Pool Query con Promisify
pool.query = promisify(pool.query);

module.exports = pool;