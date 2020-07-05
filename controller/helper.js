const mongoose = require("mongoose");
const User = require("../Model/user.model");


module.exports =  {
    
    coupongenerator: function ()  {
    var coupon = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return coupon;
    }, 
    checkreferral : function (_id) {
        console.log(_id , 'id');
        
        User.find({
            referralCode: _id
        })
        .exec()
        .then(user => {
            console.log(user , 'user');
            
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Invalid Refferal Code"
                });
            }else {
                console.log(user[0]);
                
                console.log(user[0].name , user[0]._id , 'return');
                
                return user.name , user._id
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
}