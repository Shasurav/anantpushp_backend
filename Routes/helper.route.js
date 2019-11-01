const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const address = require("../Model/address.model");
const bank_detail = require("../Model/bank_detail.model");

router.post("/address", (req, res, next) => {
    console.log(req.body);
    address.findOneAndUpdate({
            user: req.body.user._id,
        }, {
            $push: {
                address_details: {
                    name: req.body.body.name,
                    mobile: req.body.body.contact,
                    pincode: req.body.body.pincode,
                    address: req.body.body.address,
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
                message: "address added",
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

router.post("/getAddress", (req, res, next) => {
    address.find({
        user : req.body._id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Existing Address",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.post("/bank", (req, res, next) => {
    bank_detail.findOneAndUpdate({
            user: req.body.user._id,
        }, {
            $push: {
                bank_details: {
                    name: req.body.body.name,
                    ifsc: req.body.body.ifsc,
                    account_number: req.body.body.accountnumber,
                    bank_name: req.body.body.bankname,
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
                message: "address added",
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

router.post("/getBankDetails", (req, res, next) => {
    bank_detail.find({
        user : req.body._id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Existing Bank Details",
                result: result
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