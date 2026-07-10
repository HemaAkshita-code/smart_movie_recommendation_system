
const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
    name : {type: String, required: true, trim: true, match: /^[a-zA-Z\s]+$/},
    username : {type: String, unique: true, required: true, trim: true, match: /^[a-zA-Z\s]+$/},
    email : {type: String, unique: true, required: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    password : {type: String, required: true},
    created_at : {type: Date, default: Date.now},
    updated_at : {type: Date, default: Date.now},
    isVerified : {type: Boolean, default: false},
    otp : {type: String, default: null},
    otp_expiration : {type: Date, default: null}
})

const UserLoginModel = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLoginModel;