const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/images')
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage})

const Item = require("../Model/item.model");

router.post("/create",upload.single('photo'),(req, res, next) => {
    console.log('createed');
    const item = new Item({
        Item_Id: mongoose.Types.ObjectId(),
        NAME: req.body.item_name,
        Price: req.body.price,
        Image: __dirname+"/uploads/images/"+req.file.originalname,
        Stock : req.body.stock
  });
         item
             .save()
             .then(result => {
                  console.log(item);
                  console.log(result);
                  res.status(201).json({
                  message: "Item created"
                  });
              })
              .catch(err => {
                    console.log(err);
                    res.status(500).json({
                    error: err
                    });
               });
        });

router.get("/products", (req,res,next) => {
    console.log('enter');
    
    Item.find()
    .exec()
        .then(result => {
            res.status(200).json({
                message: "all products",
                product : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})        
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

module.exports = router;
