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

/* 
module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}; */