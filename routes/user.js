const express = require("express");
const rootPath = require('app-root-path');
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient;

// const setteings = require(rootPath + "/config/settings");
const orgMod = require(rootPath + "/script/original_modules");
const orgMiddleware = require(rootPath + "/middleware/middleware.js");
const auth = orgMiddleware.auth;

//アカウント新規登録
router.get("/register", (req, res) => {
    const pageType = "input";
    res.render("user/register", {  user: req.query, pageType: pageType });
});

router.post("/register", async (req, res) => {

    const findUser = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });

    //登録ユーザーが既に存在する
    if (findUser !== null) {
        const pageType = "input";
        const errMsg = "このemailは既に登録されています";
        res.render("user/register", {
            errMsg: errMsg,
            pageType: pageType,
            user: req.body
        });
        return;
    }

    const pageType = "confirm";
    req.body.maskedEmail = orgMod.toMasked(req.body.email, 3);
    res.render("user/register", { user: req.body, pageType: pageType });
});

router.post("/register/success", async (req, res) => {
    const { name, email, password } = req.body;

    //パスワードをハッシュ化
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });

    // id取得のため
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    // sessionにログインユーザー情報追加
    req.session.userId = user.id;
    req.session.userName = user.name;
    console.log("新規登録成功");
    res.redirect("/user/info")
});

//ログイン
router.get('/login', (req, res) => {
    res.render("user/login");
    // res.render("user/login", { errMsg: "hey " });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    //ユーザーが存在しない場合
    if (user === null) {
        const errMsg = "emailまたはパスワードが間違っています";
        res.render("user/login", { errMsg: errMsg });
        return
    }
    // メールアドレスが登録済みかチェック
    if (user.email === email) {
        // パスワードが合致するかチェック
        const isMatched = bcrypt.compareSync(password, user.password);
        if (isMatched) {
            console.log("ログイン成功");
            // sessionにログインユーザー情報追加
            req.session.userId = user.id;
            req.session.userName = user.name;
            res.redirect("/");
        } else {
            const errMsg = "emailまたはパスワードが間違っています";
            res.render("user/login", { errMsg: errMsg });
        }
    }
});

//ログアウト
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    });
});

//アカウント情報表示
router.get('/info',auth, async (req, res) => {
    if (req.session.userId === undefined) {
        res.send("ログインしないと見れないよ");
    }
    //sessionが存在する場合は表示
    else {
        const id = req.session.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        // res.render(req.session.email)
        user.maskedEmail = orgMod.toMasked(user.email, 3);
        res.render("user/info", { user: user });
    };

});

module.exports = router;