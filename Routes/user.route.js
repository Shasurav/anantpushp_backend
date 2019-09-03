const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Model/user.model");


router.post("/signup", (req, res, next) => {
    User.find({
        PHONE: req.body.contact
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Already exists"
                });
            } else {
                console.log(req.body.password,'pass');
                
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err,
                            message : "this is a error message"
                        });
                    } else {
                        const user = new User({
                            PHONE: req.body.contact,
                            PASSWORD: hash,
                            NAME: req.body.name,
                            ADDRESS: req.body.address,
                            BANK: {
                                IFSC : req.body.bank.ifsc,
                                ACCOUNT_NUMBER : req.body.bank.account_number,
                                BANK_NAME : req.body.bank.bank_name
                            },
                            IS_ADMIN : false,
                            createdDate: new Date()
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post("/login", (req, res, next) => {
    User.find({
            PHONE: req.body.contact
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            console.log(user);
            
            bcrypt.compare(req.body.password, user[0].PASSWORD, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            Phone: user[0].PHONE,
                            NAME: user[0].NAME
                        },
                        process.env.secret, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        Phone: user[0].PHONE,
                        NAME: user[0].NAME,
                        ADDRESS: user[0].ADDRESS,
                        BANK: {
                                IFSC : user[0].BANK.IFSC,
                                ACCOUNT_NUMBER : user[0].BANK.ACCOUNT_NUMBER,
                                BANK_NAME : user[0].BANK.BANK_NAME
                            },
                        IS_ADMIN : user[0].IS_ADMIN,
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:userId", (req, res, next) => {
    User.remove({
            PHONE: req.params.contact
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
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
