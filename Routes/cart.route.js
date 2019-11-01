const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cart = require("../Model/cart.model");


router.post("/add", (req, res, next) => {
    console.log("enter");

    cart.findOneAndUpdate({
            user: req.body.user._id,
        }, {
            $push: {
                cartDetails: {
                    item_id: req.body._product.item_id,
                    name: req.body._product.name,
                    image: req.body._product.image,
                    price: req.body._product.price,
                    qty: 1
                }
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        }, )
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "cart added",
                cart: result
            })
        })
        .catch(err => {
            console.log(err, "error");
            res.status(500).json({
                error: err
            });
        });;
});

router.post("/delete", (req, res, next) => {
    cart.findOneAndUpdate({
            user: req.body.user._id
        }, {
            $pull: {
                cartDetails: {
                    item_id: req.body.id,
                }
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        }, )
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "cart deleted",
                cart: result
            })
        })
        .catch(err => {
            console.log(err, "error");
            res.status(500).json({
                error: err
            });
        });;
});
router.post("/cart", (req, res, next) => {
    cart.find({
        user : req.body._id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "all products",
                product: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.post("/update", (req, res) => {
    console.log(req.body);

    cart.findOneAndUpdate({
            "user": req.body.user._id,
            "cartDetails.item_id": req.body._product.item_id,

        }, {
            $inc: {
                "cartDetails.$.qty": req.body.value

            }
        }, {
            safe: true,
            upsert: true,
            new: true,
        }, )
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "cart updated",
                cart: result
            })
        })
        .catch(err => {
            console.log(err, "error");
            res.status(500).json({
                error: err
            });
        });
})
module.exports = router;