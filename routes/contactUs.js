var webMails = require('../models/webMails');
var webMessages = require('../models/webMessages');
var nodemailer = require('nodemailer');






exports.main = function (req, res) {
  res.render('contactUs', { page_title: "Contact Us" });
};


exports.sendMessage = function (req, res) {
  var customerMessage = req.body;
  var saveCustomerMessage = new webMessages({
    companyName: customerMessage.companyName || 'NA',
    emailAddress: customerMessage.emailAddress || 'NA',
    telephone: customerMessage.telephone || 'NA',
    designation: customerMessage.designation || 'NA',
    description: customerMessage.description || 'NA',
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

  var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password
    }
  });

  //transporter.auth.user = email;
  //transporter.auth.pass = password;

  var composeMail = {
    from: email,
    to: 'contact@toolproengg.com',
    subject: 'Inquiry on ' + new Date().toLocaleDateString("en-US"),
    html: 'Hi, you have received a message from Contact Us page.on ' + new Date().toLocaleDateString("en-US") + '<br>' +
    'Company Name: ' + message.companyName + '<br>' +
    'Email Address: ' + message.emailAddress + '<br>' +
    'Telephone/Mobile: ' + message.telephone + '<br>' +
    'Designation: ' + message.designation + '<br>' +
    'Message Description: ' + message.description + '<br>'
  }

  transporter.sendMail(composeMail, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + res.response);
    }
  });
  
  return true;
}