
/**
 * Module dependencies.
 */

//mongodb://<dbuser>:<dbpassword>@ds131119.mlab.com:31119/heroku_fsp79d18

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var mongoConfig = require('./config/config.json');
//var processEnv = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 5000 ; //heroku

var serveIndex = require('serve-index');

//load route
var aboutUs = require('./routes/aboutUs');
var contactUs = require('./routes/contactUs');
var products = require('./routes/products');

var customers = require('./routes/customers');
var employers = require('./routes/employers');

var app = express();

var connection = require('express-myconnection');
//var mysql = require('mysql');
var appEnv = app.get('env');

//configure DB
mongoose.Promise = global.Promise;

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

mongoose.connect("mongodb://" + mongoConfig[appEnv].username + ":" + mongoConfig[appEnv].password + "@" + mongoConfig[appEnv].host + ":" + mongoConfig[appEnv].port + "/" + mongoConfig[appEnv].database);


/* var clientMongoDB =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    "mongodb://" + mongoConfig[appEnv].username + ":" + mongoConfig[appEnv].password + "@" + mongoConfig[appEnv].host + ":" + mongoConfig[appEnv].port + "/" + mongoConfig[appEnv].database;
 */

/* mongoose.connect(clientMongoDB, function (err, res) {
    if (err) {
        console.log('Error at connecting DB ' + err);
    } else {
        console.log('DB Connection Successful to ' + clientMongoDB);
    }
}); */

// all environments

//app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'); //OPENSHIFT_NODEJS_IP = '127.0.0.1 and Heroku IP = '0.0.0.0'
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080); //var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images/products/RUBBER_MOULDED_PARTS', express.static(__dirname + '/public/images/products/RUBBER_MOULDED_PARTS'));

app.use('/images/products/RUBBER_MOULDED_PARTS', serveIndex(__dirname + '/public/images/products/RUBBER_MOULDED_PARTS'));

app.use('/images/products/SS_FASTENERS', express.static(__dirname + '/public/images/products/SS_FASTENERS'));

app.use('/images/products/SS_FASTENERS', serveIndex(__dirname + '/public/images/products/SS_FASTENERS'));

app.use('/images/products/SS_PIPE_FITTINGS', express.static(__dirname + '/public/images/products/SS_PIPE_FITTINGS'));

app.use('/images/products/SS_PIPE_FITTINGS', serveIndex(__dirname + '/public/images/products/SS_PIPE_FITTINGS'));

app.use('/images/products/SPECIAL_COMPONENTS', express.static(__dirname + '/public/images/products/SPECIAL_COMPONENTS'));

app.use('/images/products/SPECIAL_COMPONENTS', serveIndex(__dirname + '/public/images/products/SPECIAL_COMPONENTS'));

// development only
/* if ('development' == app.get('env')) {
    app.use(express.errorHandler());
} */

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

/* app.use(
    connection(mysql, {

        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306, //port mysql
        database: 'nodejs'

    }, 'pool') //or single
); */



app.get('/', routes.index);

app.get('/aboutUs', aboutUs.main);
app.get('/contactUs', contactUs.main);
app.post('/contactUs/sendMessage', contactUs.sendMessage);
app.get('/products', products.main);

//not required currently
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);




app.use(app.router);

app.listen(port, function () {
    console.log('api running on port ${port}');
});

/* var server = http.createServer(app);

server.listen(app.get('port'), app.get('ip_address'), function () {
    console.log('Server ' + app.get('ip_address') + ' as Express server listening on port ' + app.get('port'));
}); */

module.exports = app;