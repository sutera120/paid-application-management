const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client")

const mysql = require("mysql");

const app = express();
const prisma = new PrismaClient;


//サーバー接続
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});


// router.get("/", (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         console.log("DB接続中");

//         connection.query('SELECT * FROM posts', (err, rows) => {
//             connection.release();

//             console.log(rows);

//             if (!err) {
//                 res.render("posts", { rows });
//             };
//         });
//     });

// });

// router.get("/", (req, res) => {
//     res.render("home");
// });

router.post("/", (req, res) => {
    console.log("post");
    console.log(req.body);
    res.send("hello");
});
// router.post("/posts", async (req, res) => {
//     const { title, body } = req.body;
//     const posts = await prisma.posts.create({
//         data: {
//             title: title,
//             body: body,
//         },
//     });
//     return res.json(posts);
// });


// router.get("/:id", (req, res) => {
//     console.log("get");
//     res.send(`${req.params.id}`);
// });

module.exports = router;