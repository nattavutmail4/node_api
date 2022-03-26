const mysql = require('mysql'); //import mysql
const dbConfig = require('../config/db.config'); // import setting database;

//connection database
var connection = mysql.createPool({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
});
module.exports = connection;