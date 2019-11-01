const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user    : { type: String, required: true ,unique: true},
    cartDetails : [{
    item_id : { type: Schema.Types.ObjectId, required: true },
    name    : { type: String, required: true },
    image   : { type: String , required: true },
    price   : { type: Number, required: true },
    qty     : { type: Number, min: 1}
    }]
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('cart', schema, 'cart');
