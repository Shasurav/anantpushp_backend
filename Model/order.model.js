const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    order_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    timeStamp: { type: Date, required: true },
    generated_by: { type: String, required: true },
    ttems:[{
        item_id : { type: Number, unique: true, required: true },
        qty : { type: Number, required: true },
        value : { type: Number, required: true }
    }],
    total_amount : { type: Number },
    status : { type: String },
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('order', schema, 'order');
