const mongoose = require('mongoose');

const personalDetailSchema = new mongoose.Schema({
    gender: {
        type: String,
        default: "other"
    },
    firstname: String,
    phone:Number,
    lastname: String,
    date: {
        type: String,
        default: Date.now
    },
    day: String,
    month: String,
    year: String
}); 

const PersonalDetail = module.exports = mongoose.model('PersonalDetail', personalDetailSchema);
