const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient;


router.get("/", (req, res) => {
    console.log("get");
    res.send("ユーザー情報を表示する");
});

router.post("/", (req, res) => {
    console.log("get");
    res.send("ユーザーです");
});

router.get("/:id", (req, res) => {
    console.log("get");
    res.send(`${req.params.id}`);
});

module.exports = router;