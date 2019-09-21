// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// const Item = require("../Model/item.model");

// router.post("/create", (req, res, next) => {
//   const item = new Item({
//         Item_Id: ,
//         NAME: req.body.item_name,
//         Price: req.body.price,
//         Image: ,
//         Stock : req.body.stock
//          item
//              .save()
//              .then(result => {
//                   console.log(result);
//                   res.status(201).json({
//                   message: "Item created"
//                   });
//               })
//               .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                     error: err
//                     });
//                });
//         });
//       });

// router.post("/update", (req,res,next) => {
//    if(req.body.price) {
//        Item.findOneAndUpdate({NAME: req.body.item_name},{$set:{Price: req.body.price}},{new:true})
//        .then((result)=>{
//             res.status(201).json({
//             message: "Item price updated"
//             });
//        }).catch((err)=>{
//            res.status(500).json({
//            error: err
//            });
//        })
//    }
//     if(req.body.stock) {
//        Item.findOneAndUpdate({NAME: req.body.item_name},{$set:{Stock: req.body.stock}},{new:true})
//        .then((result)=>{
//             res.status(201).json({
//             message: "Item stock updated"
//             });
//        }).catch((err)=>{
//            res.status(500).json({
//            error: err
//            });
//        })
//    }
// });

// module.exports = router;
