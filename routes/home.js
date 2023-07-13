const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/", (req, res) => {
    console.log("get");
    res.send("ユーザーです");
});

module.exports = router;