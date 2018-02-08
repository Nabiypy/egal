// Application configuration.
'use strict';

var nodemailer = require('nodemailer'),
    SequelizeFile = require('sequelize-file'),
    config = module.exports;

config.db = {
  user: 'areash5_hanson',
  password: 'digimas14',
  name: 'areash5_findmeagent'
};

config.db.details = {
  host: '172.81.119.95',
  port: 3306,
  dialect: 'mysql'
};

// config.db = {
//   user: 'root',
//   password: 'digimas14',
//   name: 'egal_findr'
// };

// config.db.details = {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql'
// };


config.db.production = {
  url: 'postgres://vcgztlmh:1_ZBt7fkHjaBthXfLZFt3o-O7906rydL@baasu.db.elephantsql.com:5432/vcgztlmh',
  dialect: 'postgres'
};
config.keys = {
  secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

config.services = {
  url: "http://172.16.30.8:7777/vasApp/webapi/vas/pay",
  apiId: "payoutlet",
  apiSecret: "2di76uGJPyZ46RA6g4S4zvstlXNjtq1azw3aj5bjVyLkjaHqiZS9ve5KuRrldKLr"
}

config.hubtel = {
  baseUrl: "https://api.hubtel.com/v1/merchantaccount",
  merchantId: "HM2811170009",
  clientId: "dkxvcssl",
  clientSecret: "ipccgouu",
  momoReceiveUrl: "/merchants/HM2811170009/receive/mobilemoney",
  momoSendUrl: "/merchants/HM2811170009/send/mobilemoney",
  tranStatusUrl: "/merchants/HM2811170009/transactions/status?"
}

var userRoles = config.userRoles = {
  guest: 1,    // ...001
  user: 2,     // ...010
  admin: 4     // ...100
};

config.accessLevels = {
  guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
  user: userRoles.user | userRoles.admin,                       // ...110
  admin: userRoles.admin                                        // ...100
};

config.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'etzghana@gmail.com',
    pass: '#tr1nz13t'
  }
});

// config.picture = SequelizeFile({
//    attribute: 'picture',
//   mimetype: /^image/,
//   crop: true,
//   sizes: {
//    small: 64, //width 64
//    big: 150, //width 150
//   }
// });

