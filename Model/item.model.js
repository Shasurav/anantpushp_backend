const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    item_id: { type: Schema.Types.ObjectId},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('item', schema, 'item');
