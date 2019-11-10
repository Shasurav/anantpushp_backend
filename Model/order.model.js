const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    order_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    timeStamp: { type: Date, required: true },
    generated_by: { type: String, required: true },
    items:[],
    status : { type: String },
    address : {},
    bank : {}
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('order', schema, 'order');
