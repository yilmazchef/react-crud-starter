const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "newpassword",
    database: "reactblogdb"
})

module.exports = db;