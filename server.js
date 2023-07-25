/*
使用module
FW : express

ORM : Prisma

セッション : express-session

*/
//module読み込み
const express = require("express");
const session = require('express-session');
const rootPath = require('app-root-path');
const expressLayouts = require('express-ejs-layouts');

//routerを読み込み
const homeRouter = require("./routes/home.js");
const userRouter = require("./routes/user.js");
const paidVacationRouter = require("./routes/paid_vacation.js");
const postsRouter = require("./routes/posts.js");

const app = express();

//各種設定・変数初期化
const PORT = 3000;
const setteings = require(rootPath + "/config/settings");
const orgMod = require(rootPath + "/script/original_modules");
const orgMiddleware = require(rootPath + "/middleware/middleware.js");

//jsonのparse設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//セッションの設定
const ses_opt = setteings.session_option;
app.use(session(ses_opt));

session.user = "admmin"
//テンプレートエンジン・静的ファイルの設定
app.set("view engine", "ejs");//server.jsで使用を宣言すれば、他のルーティングでも使える
app.use(expressLayouts);
app.use(express.static("public"));

//自作middleware
app.use(orgMiddleware.getLoginUserName);

//routerをset
app.use("/user", userRouter);
app.use("/paid-vacation", paidVacationRouter);
app.use("/posts", postsRouter);
app.use("/", homeRouter);

// app.get("/", (req, res) => {

//     res.render("home");
// })
app.listen(PORT, () => console.log("サーバー起動中😸"));