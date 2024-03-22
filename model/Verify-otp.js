const mongoose = require('mongoose');

const Otp = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    created: {
        type: Date,
        default: () => Date.now(),
    },
    expire_at: { type: Date, default: () => Date.now() + 15 * 60 * 1000 } // 15 minutes expiry
});
module.exports = mongoose.model('VerifyOtp', Otp);
