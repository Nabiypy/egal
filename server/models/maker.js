/**
 * Created by hanso on 6/29/2017.
 */
// The User model.
'use strict';

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt'),
    config = require('../config'),
    db = require('./database');

// 1: The model schema.
var modelDefinition = {
  product:{ type: Sequelize.STRING },
  account: { type: Sequelize.STRING,},
  reference:{
    type: Sequelize.STRING,
    unique: true
  },
  userId:{
    type: Sequelize.STRING,
  },
  bug:{ type: Sequelize.TEXT },
  amountPaid:{ type: Sequelize.DECIMAL },
  state:{
     type: Sequelize.STRING,
     defaultValue: 'pending'
  },
  serviceStatus:{ type: Sequelize.STRING },
  otherInfo:{ type: Sequelize.TEXT }

};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var MakerModel = db.define('maker', modelDefinition, modelOptions);

function associate(models) {
  MakerModel.belongsTo(models.UserModel,{
    onDelete: 'cascade'
  })
}
module.exports = MakerModel;
