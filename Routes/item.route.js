const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
var os = require('os');
const hostname = os.hostname();
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

router.post("/create",upload.single('image'),(req, res, next) => {
    console.log('created', req.body , req.file);
    const item = new Item({
        item_id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: "/uploads/images/"+req.file.originalname,
  });
         item
             .save()
             .then(result => {
                 console.log(result);
                 
                  res.status(201).json({
                  message: "Item created",
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
router.post("/update", (req,res,next) => {
       Item.findOneAndUpdate({
           item_id: req.body.item_id},
           {
               $set:{price: req.body.price}
            },
            {new:true})
            .then((result)=>{
                console.log(result);
                res.status(201).json({
                message: "Item price updated"
            });
       }).catch((err)=>{
           res.status(500).json({
           error: err
           });
       })
});

router.post("/delete", (req, res, next) => {
    console.log("entering delete");
    console.log(req.body);
    
    Item.deleteOne({
        item_id: req.body.item_id
        })
        .exec()
        .then(result => {
            console.log(result);
            
            res.status(200).json({
                message: "product deleted"
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
