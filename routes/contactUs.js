var webMail = require('../models/webMail');
var webMessages = require('../models/webMessages');


exports.main = function (req, res) {
  res.render('contactUs', { page_title: "Contact Us" });
};


exports.sendMessage = function (req, res) {
  var customerMessage = req.body.customerData;

  Promise.resolve()
    .then(function () {
      
    })
    .then(function () {

    })
    .catch(function (err) {
      console.log('Error at sendMessage ' + err);
    })



  res.json({ status: 1 });
};