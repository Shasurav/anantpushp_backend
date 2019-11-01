const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user    : { type: String, required: true ,unique: true},
    bank_details : [{
    name    : { type: String, unique: true, required: true },
    ifsc    : { type: String, required: true },
    account_number : { type: String, required: true },
    bank_name : { type: String, required: true }
    }]
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('bank_detail', schema , 'bank_details');
