const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Model/user.model");
const helper = require("../controller/helper");

router.post("/signup", async (req, res, next) => {
    console.log(req.body);
    var refferedby_id ;
    var refferedbyname ;
    var refferedbylevel;


    User.find({
        referralCode: req.body.refferalCode
    })
    .exec()
    .then(result => {
        console.log(result , 'user');
        
        if (result.length < 1) {
            return res.status(401).json({
                message: "Invalid Refferal Code"
            });
        }else {
            refferedby_id = result[0]._id ;
            refferedbyname = result[0].name 
            refferedbylevel = result[0].level
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    .then(
    User.find({
        phone: req.body.contact
        })
        .exec()
        .then(user => {
            console.log("enter");
            console.log(user);
            
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err,
                            message : "this is a error message"
                        });
                    } else {
                        const user = new User({
                            phone: req.body.contact,
                            password: hash,
                            name: req.body.name,
                            is_admin : false,
                            createdDate: new Date(),
                            refferedBy :{
                                _id : refferedby_id,
                                name : refferedbyname
                            },
                            level : refferedbylevel + 1,
                            referralCode : helper.coupongenerator()
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created",
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
        })
    )
});

router.post("/login", (req, res, next) => {
    User.find({
            phone: req.body.contact
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            console.log(user);
            
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            phone: user[0].phone,
                            name: user[0].name
                        },
                        process.env.secret, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        _id : user[0]._id,
                        phone: user[0].phone,
                        name: user[0].name,
                        is_admin : user[0].is_admin,
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
            phone: req.params.contact
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


