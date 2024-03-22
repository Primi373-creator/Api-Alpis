const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    apikey: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    limitApikey: {
        type: Number
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    premiumEndDate: {
        type: Date,
    },
    premiumInitDate: {
        type: Date,
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', userSchema);
