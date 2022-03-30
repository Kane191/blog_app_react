const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nairobi254",
    database: "blog_app_react",
})
module.exports = db;