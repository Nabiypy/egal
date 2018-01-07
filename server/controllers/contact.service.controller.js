/**
 * Created by hanson on 12/16/2017.
 */

'use strict';
var config = require('../config'),
    request = require('request'),
    db = require('../models/database'),
    Contact = require('../models/contacts'),
    ContactController = {};

// post emergency contacts here
ContactController.saveContacts = function (req, res) {
  console.log("contacts request ~ ",req.body);
  if (!req.body.findme_id || !req.body.email) {
    res.json({ message: 'Please login.' });
  } else {
    // todo: generate cardWallet
    db.sync().then(function () {
      var contacts = {
        userId: req.body.findme_id,
        account: req.body.account,
        email: req.body.email,
        phoneOne: req.body.phoneOne,
        phoneTwo: req.body.phoneTwo,
        phoneThree: req.body.phoneThree,
        date: req.body.date
      };
      return Contact.create(contacts).then(function () {
        res.status(201)
           .json({message: 'New phone contacts added successfully!'});
      });
    }).catch(function (error) {
      console.log(error);
      res.status(403).json({ message: 'Error occured saving phone numbers' });
    });
  }

}
// get all contacts posted
ContactController.contacts = function (req, res) {
  Contact.findAll()
    .then(function (contacts) {
      res.status(200)
        .json(contacts);
      console.info('find all emergency contacts ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
  //get one contact post
ContactController.contact = function (req, res) {
  Contact.findById(req.params.userId)
    .then(function (contact) {
      res.status(200)
        .json(contact);
      console.log('error: false ', 'message: get user contacts ~', contact);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
ContactController.contactByEmail = function (req, res) {
  Contact.findById(req.params.email)
    .then(function (contact) {
      res.status(200)
        .json(contact);
      console.log('error: false ', 'message: get user contacts ~', contact);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}


ContactController.updateContact = (req, res) => {
  Contact.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
      console.log('updateRecords >>', updatedRecords)
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
  //delete maker post
ContactController.removeContact = function (req, res) {
  Contact.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (deletedContact) {
      res.status(200)
        .json(deletedContact);
      console.log('error: false', 'message: deletedContact ~ ', deletedContact);
    })
    .catch(function (error) {
      res.status(500)
        .json(error);
      console.log('error: true ', 'message: ', error)
    });
}

module.exports = ContactController;
