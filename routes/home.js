const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("get");
    res.render("index", { text:"です"});
});

router.post("/", (req, res) => {
    console.log("get");
    res.send("ユーザーです");
});

module.exports = router;