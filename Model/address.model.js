const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user    : { type: String, required: true ,unique: true},
    address_details : [{
    name    : { type: String, unique: true, required: true },
    mobile  : { type: String, required: true },
    pincode : { type: String, required: true },
    address : { type: String, required: true }
    }]
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('address', schema , 'address');
