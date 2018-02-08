/**
 * Created by hanson on 12/16/2017.
 */
// The Sos model.
'use strict';

var Sequelize = require('sequelize'),
    config = require('../config'),
    db = require('./database');
  
var lat=null, long=null;
// 1: The model schema.
var modelDefinition = {
    userId:{ type: Sequelize.STRING},
    account: { type: Sequelize.STRING},
    email:{ type: Sequelize.STRING },
    address:{ type: Sequelize.TEXT },
    latitude: { type: Sequelize.TEXT},
    longitude: { type: Sequelize.TEXT},
    geometry: {
      type: Sequelize.JSON
    },
    date:{ type: Sequelize.DATE },
    reference:{
      type: Sequelize.STRING,
      unique: true
    },
    serviceStatus:{ type: Sequelize.STRING },
    phoneOne:{ type: Sequelize.STRING},
    phoneTwo:{ type: Sequelize.STRING },
    phoneThree:{ type: Sequelize.STRING },
    otherInfo: { type: Sequelize.JSON}
  };

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var SosModel = db.define('sos', modelDefinition, modelOptions);

function associate(models) {
  SosModel.belongsTo(models.ContactModal,{
    onDelete: 'cascade'
  })
}
module.exports = SosModel;
