/*
使用module
FW : express

ORM : Prisma
セッション : express-session

テンプレートエンジン : ejs
*/
//module読み込み
const express = require("express");
const session = require('express-session');
const rootPath = require('app-root-path');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');

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
const malter_opt = setteings.malter_option;
app.use(session(ses_opt));

const storage = multer.diskStorage(malter_opt);
const upload = multer({ storage: storage });

//テンプレートエンジン・静的ファイルの設定
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

//自作middleware
app.use(orgMiddleware.getLoginUserInfo);
app.use(orgMiddleware.checkRole);

//routerをset
app.use("/user", userRouter);
app.use("/paid-vacation", paidVacationRouter);
app.use("/posts", postsRouter);
app.use("/", homeRouter);

app.post('/upload', upload.single('file'), function (req, res) {
    res.send(req.file.path + 'ファイルのアップロードが完了しました。' + req.file.originalname);
});

// app.get("/", (req, res) => {

//     res.render("home");
// })
console.log(rootPath.path);
app.listen(PORT, () => console.log("サーバー起動中😸"));