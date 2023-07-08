/*
使用modele
FW : express
DB : mysql

ORM : Prisma?
認証 : Passport or JWT

*/

const express = require("express");
const mysql = require("mysql");
const userRouter = require("./routes/user.js");
const app = express();

// const test = "testです";

const PORT = 3000;

app.set("view engine", "ejs");
app.use("/user", userRouter);

//サーバー接続
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

//ルーティング
app.get("/", (req, res) => {
    // res.render("index", { text: "ejs" });
    // res.render("index", { test });

    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("DB接続中");

        connection.query('SELECT * FROM userinfo', (err, rows) => {
            connection.release();

            console.log(rows);

            if (!err) {
                res.render("index", { rows });
            };
        });
    });

});

app.listen(PORT, () => console.log("サーバー起動中😸"));