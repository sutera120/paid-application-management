const express = require("express");
const router = express.Router();
const session = require('express-session');
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const app = express();

const setteings = require("../config/settings");
const ses_opt = setteings.session_option;
app.use(session(ses_opt));

const prisma = new PrismaClient;

//アカウント新規登録
router.get("/register", (req, res) => {
    res.render("user/register");
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser !== null) {
        const errMsg = "このemailは既に登録されています";
        res.render("user/register", { errMsg: errMsg });
        return;
    }

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
    // const email = ;
    // console.log(editItem.id)
    req.session.userId = user.id;
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
    console.log(user);

    if (user === null) {
        console.log("nurupo");
        const errMsg = "emailまたはパスワードが間違っています";
        res.render("user/login", { errMsg: errMsg });
    }
    // メールアドレスが登録済みかチェック
    else if (user.email === email) {
        // パスワードが合致するかチェック
        const isMatched = bcrypt.compareSync(password, user.password);
        if (isMatched) {
            console.log("ログイン成功");
            req.session.userId = user.id;
            res.redirect("/user/info");
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
router.get('/info', async (req, res) => {
    console.log(req.session.userId);
    if (req.session.userId === undefined) {
        console.log("true");
        res.send("ログインしないと見れないよ");
    } else {
        const id = req.session.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        // res.render(req.session.email)
        res.render("user/info", { user });
        // console.log("hey");
    };

});



module.exports = router;