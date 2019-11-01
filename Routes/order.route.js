const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cart = require("../Model/order.model");


router.post("/post", (req, res, next) => {
console.log(req.body);

});

module.exports = router;
