const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const multer = require('multer');
// const upload = multer({dest: __dirname + '/uploads/images'});
require('dotenv').config()

const userRoutes = require('./Routes/user.route');
const itemRoutes = require('./Routes/item.route');
const cartRoutes = require('./Routes/cart.route');
const orderRoutes = require('./Routes/order.route');
const helperRoutes = require('./Routes/helper.route');




const port = 3000
// app.use(express.static('public'),function(){console.log(__dirname);});
app.use(express.static('public'));
// app.use(express.static('uploads/images'));
app.use('/uploads/images', express.static(__dirname + '/uploads/images'));
mongoose.connect('mongodb://localhost/mongoDb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected & open");
});


app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use("/user", userRoutes);
// app.use("/",function(req,res){
//     res.send('Hello')
// });

app.use("/item", itemRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/helper", helperRoutes);




app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
