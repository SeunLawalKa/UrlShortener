const mysql = require('mysql');
const config = require('config');
const db = config.get('mysqlConn');

const connectDB = mysql.createConnection(db);

connectDB.connect(function(error) {
    if (error) {
        console.error(error.message);
        process.exit(1);
    }

    console.log('Mysql Database Connected ...');

});

module.exports = connectDB;
