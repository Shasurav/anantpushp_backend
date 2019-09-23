const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Item_Id: { type: Schema.Types.ObjectId, unique: true},
    NAME: { type: String, required: true },
    Price: { type: Number, required: true },
    Image: { type: String },
    Stock : { type: Number, required: true },
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Item', schema, 'item');
