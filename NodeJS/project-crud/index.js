
const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
let app = express()

app.use(bodyParser.json)


var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db"
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("succesful connection");

    } else {
        console.log("DB connection failed" +
            JSON.stringify(err, undefined, 2));

    }
})

app.listen(3000, () => console.log("Express server is running at 3000"));

app.get('/getemployees', function (req, res) {
    mysqlConnection.query("select * from employee", function (error,
        row, fields) {
        if (error) throw error;
        console.log(row);

    });
})

app.get('/getemployees/:id', (req, res) => {
    mysqlConnection.query("select * from employee where EmpID = ?",)
    [req.params.id], (error, rows, fields) => {
        if (!error) {
            console.log(rows);

        } else {
            console.log(err)
        }
    }
})

app.delete("/deleteemployee/:id", (req, res) => {
    mysqlConnection.query("Delete Employee where EmpID = ?"
        , [req.params.id], (err, rows, fields) => {
            if (!err) {
                req.send(rows);
            }
            else console.log(err);
        })
})