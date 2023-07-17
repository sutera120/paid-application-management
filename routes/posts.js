const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const session = require('express-session');

const app = express();
const prisma = new PrismaClient;

// });

// router.get("/", (req, res) => {
//     res.render("home");
// });

// 一覧表示
router.get("/", async (req, res) => {
    const allPosts = await prisma.post.findMany();
    res.render("posts", { allPosts });
});

// 新規作成
router.post("/", async (req, res) => {
    const { title, body } = req.body;
    const posts = await prisma.post.create({
        data: {
            title: title,
            body: body,
        },
    });
    res.redirect('/posts');
});

//更新処理
router.get('/edit/:id', async (req, res) => {
    const id = Number(req.params.id);
    const editItem = await prisma.post.findUnique({
        where: {
            id: id,
        },
    })
    res.render("edit", { editItem });
});

router.post('/edit/', async (req, res) => {
    const { id, title, body } = req.body;
    const editItem = await prisma.post.update({
        /**更新レコードを指定 */
        where: {
            id: Number(id),
        },
        /**更新内容 */
        data: {
            title: title,
            body: body,
        },
    })
    console.log(editItem);
    res.redirect('/posts');
});

//削除
router.post('/delete', async (req, res) => {
    const { id, } = req.body;
    const editItem = await prisma.post.delete({
        /**更新レコードを指定 */
        where: {
            id: Number(id),
        },
    });
    res.redirect('/posts');
});

// router.get("/:id", (req, res) => {
//     console.log("get");
//     res.send(`${req.params.id}`);
// });

module.exports = router;