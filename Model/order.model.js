const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Order_id: { type: Number, unique: true, required: true },
    TimeStamp: { type: Date, required: true },
    Generated_by: { type: String, required: true },
    Items:[{
        Item_id : { type: Number, unique: true, required: true },
        Quantity : { type: Number, required: true },
        Value : { type: Number, required: true }
    }],
    Total_amount : { type: Number },
    Status : { type: String },
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Order', schema);
