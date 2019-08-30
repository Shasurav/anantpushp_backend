const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    PHONE: { type: Number, unique: true, required: true },
    NAME: { type: String, required: true },
    ADDRESS: { type: String, required: true },
    BANK: {
        IFSC : { type: String, required: true },
        ACCOUNT_NUMBER : { type: Number, required: true },
        BANK_NAME : { type: String, required: true },
    },
    IS_ADMIN : { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User', schema);
