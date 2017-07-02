var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var webMail = new Schema({
    _id: Number,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('webMail', webMail);