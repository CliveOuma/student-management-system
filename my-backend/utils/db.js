import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student"
})

con.connect(function(err) {
    if(err) {
        console.log("Db not connected")
    } else {
        console.log("Db connected successfully")
    }
}) 

export default con;