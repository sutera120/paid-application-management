const express = require("express");
const router = express.Router();

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