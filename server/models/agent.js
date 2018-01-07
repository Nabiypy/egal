/**
 * Created by hanso on 01/06/2018.
 */
// The Agent model.
'use strict';

var Sequelize = require('sequelize'),
    config = require('../config'),
    db = require('./database');

// 1: The model schema.
var modelDefinition = {
    userId: { type: Sequelize.STRING},
    gravatar: { type: Sequelize.TEXT},
    firstName: { type: Sequelize.STRING, allowNull: false },
    otherNames: { type: Sequelize.STRING, allowNull: false },
    dateOfBirth: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    maritalStatus: { type: Sequelize.STRING },
    mobile: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING },
    region: { type: Sequelize.STRING },
    city: { type: Sequelize.TEXT },
    town: { type: Sequelize.DECIMAL },
    position: { type: Sequelize.STRING},
    geolocation: { type: Sequelize.TEXT},
    otherInfo: { type: Sequelize.TEXT }
};

// 2: The model options.
var modelOptions = {
    classMethods: {
        associate: associate
    }
};

// 3: Define the User model.
var AgentModel = db.define('agent', modelDefinition, modelOptions);

function associate(models) {
    AgentModel.belongsTo(models.UserModel, {
        onDelete: 'cascade'
    })
}
module.exports = AgentModel;
