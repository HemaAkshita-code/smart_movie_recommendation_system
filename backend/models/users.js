
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smart-movie-recommendation-system')
.then(() => {console.log('Connected to MongoDB');})
.catch((err) => {console.error('Error connecting to MongoDB', err);});

const userLoginSchema = mongoose.Schema({
    name : {type: String, required: true, trim: true, match: /^[a-zA-Z\s]+$/},
    username : {type: String, unique: true, required: true, trim: true, match: /^[a-zA-Z0-9_]{4,20}$/},
    email : {type: String, unique: true, required: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    password : {type: String, required: true},
    created_at : {type: Date, default: Date.now},
    updated_at : {type: Date, default: Date.now},
    isVerified : {type: Boolean, default: false},
    otp : {type: String, default: null},
    otp_expiration : {type: Date, default: null},
    resetOtpVerified : {type: Boolean, default: false}
})

const UserLoginModel = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLoginModel;