const mongoose = require('mongoose');
const address = require('./address.model');
const bank_detail = require('./bank_detail.model');

const Schema = mongoose.Schema;

const schema = new Schema({
    phone: { type: String, unique: true, required: true },
    password : { type: String, required: true },
    name : { type: String, required: true },
    is_admin : { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    refferedBy : {
        _id : {type: String, required: true },
        name :{type: String, required: true }
    },
    level : {type: Number, required: true },
    referralCode : {type: String, required: true }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('user', schema, 'user');
