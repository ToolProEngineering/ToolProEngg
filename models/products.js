var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Products = new Schema({
    id: Number,
    name: String,
    pictureLocation: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('Products', Products);