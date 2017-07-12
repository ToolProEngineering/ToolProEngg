var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var webMails = new Schema({
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('webmails', webMails);