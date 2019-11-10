const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../Model/order.model");


router.post("/newOrder", (req, res, next) => {
console.log(req.body);
const order = new Order({
    order_id: mongoose.Types.ObjectId(),
    timeStamp: new Date(),
    generated_by: req.body.user._id,
    items: req.body.productList,
    status : "pending",
    address : req.body.address,
    bank : req.body.bankDetails
});
     order
         .save()
         .then(result => {
             console.log(result);
              res.status(201).json({
              message: "Order Placed",
              product : result
              });
          })
          .catch(err => {
                console.log(err);
                res.status(500).json({
                error: err
                });
           });
});

router.post("/getOrder", (req, res, next) => {
    Order.find({
        generated_by : req.body._id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "order Details",
                order: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;
