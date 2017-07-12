var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var webMessages = new Schema({
    _id: Number,
    companyName: String,
    emailAddress: String,
    telephone: String,
    designation: String,
    description: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('webMessages', webMessages);