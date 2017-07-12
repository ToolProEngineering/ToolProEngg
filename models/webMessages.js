var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var webMessages = new Schema({
    companyName: String,
    emailAddress: String,
    telephone: String,
    designation: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('webMessages', webMessages);