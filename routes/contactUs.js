var webMails = require('../models/webMails');
var webMessages = require('../models/webMessages');


exports.main = function (req, res) {
  res.render('contactUs', { page_title: "Contact Us" });
};


exports.sendMessage = function (req, res) {
  var customerMessage = req.body;
  var saveCustomerMessage = new webMessages({
    companyName: customerMessage.companyName || '',
    emailAddress: customerMessage.emailAddress || '',
    telephone: customerMessage.telephone || '',
    designation: customerMessage.designation || '',
    description: customerMessage.description || '',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  var email;
  var password;

  Promise.resolve()
    .then(function () {
      //save the message received from web
      return saveCustomerMessage.save();
    })
    .then(function (saveCustomerMessageSuccess) {
      //retrive the userId and password
      if (!saveCustomerMessageSuccess.errors) {
        return webMails.findOne({ 'email': 'webmail@toolproengg.com' });
      }
    })
    .then(function (webMailData) {
      if (webMailData) {
        email = webMailData.email;
        password = webMailData.password;
        return sendEmailMessage(saveCustomerMessage, email, password)
      }
    })
    .then(function (sendEmailMessageSuccess) {
      if (sendEmailMessageSuccess) {
        res.json({ status: 1 });
      }
    })
    .catch(function (err) {
      console.log('Error at sendMessage ' + err);
    })
};


function sendEmailMessage(message, email, password) {
  return true;
}