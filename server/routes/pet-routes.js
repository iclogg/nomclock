const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("get request in pet routes");
    res.json({ message: "This is a lovely pet!" });
});
