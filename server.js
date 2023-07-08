/*
使用modele
FW : express
DB : mysql

ORM : Prisma?
認証 : Passport or JWT

*/
//module読み込み
const express = require("express");
const expressLayouts = require('express-ejs-layouts');

//routerを読み込み
const homeRouter = require("./routes/home.js");
const userRouter = require("./routes/user.js");
const postsRouter = require("./routes/posts.js");


const PORT = 3000;
const app = express();

app.use(express.json());
app.set("view engine", "ejs");//server.jsで使用を宣言すれば、他のルーティングでも使える
app.use(expressLayouts);
app.use(express.static("css"))

//routerをset
// app.use("/", homeRouter);
// app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    console.log("post");
    console.log(req.body);
    res.render("home");
});

app.listen(PORT, () => console.log("サーバー起動中😸"));