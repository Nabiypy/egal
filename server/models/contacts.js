/**
 * Created by hanson on 12/16/2017.
 */
// The Contact model.
'use strict';

var Sequelize = require('sequelize'),
    config = require('../config'),
    db = require('./database');

// 1: The model schema.
var modelDefinition = {
  userId:{ type: Sequelize.STRING},
  account: { type: Sequelize.STRING},
  email: { type: Sequelize.STRING},
  phoneOne:{ type: Sequelize.STRING },
  phoneTwo:{ type: Sequelize.STRING },
  phoneThree:{ type: Sequelize.STRING },
  date:{ type: Sequelize.DATE },
  reference:{
    type: Sequelize.STRING,
    unique: true
  },
  serviceStatus:{ type: Sequelize.STRING }
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var ContactModel = db.define('contact', modelDefinition, modelOptions);

function associate(models) {
    //A User can have many Makers.
    ContactModel.hasMany(models.SosModel, {
      onDelete: 'cascade'
    });
  }
  
module.exports = ContactModel;
