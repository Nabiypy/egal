/**
 * Created by hanson on 12/16/2017.
 */

'use strict';
var config = require('../config'),
    request = require('request'),
    db = require('../models/database'),
    Sos = require('../models/sos'),
    SosController = {};

// send maker post to vasapp
SosController.shareLocation = function (req, res) {
    console.log("location request ~ ",req.body);
    if (!req.body.findme_id || !req.body.email) {
      res.json({ message: 'Please login.' });
    } else {
      // todo: generate cardWallet
      db.sync().then(function () {
        var location = {
          userId: req.body.findme_id,
          account: req.body.account,
          email: req.body.email,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          date: req.body.date,
          geometry: req.body.geometry.coordinates,
          otherInfo: req.body.otherInfo
        };
        return Sos.create(location).then(function () {
          res.status(201)
             .json({message: 'User location saved successfully!'});
        });
      }).catch(function (error) {
        console.log(error);
        res.status(403).json({ message: 'Error occured saving user locations' });
      });
    }
}

// get all maker post
SosController.locations = function (req, res) {
  Sos.findAll()
    .then(function (locations) {
      res.status(200)
        .json(locations);
      console.info('find all user locations ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
  //get one maker post
SosController.location = function (req, res) {
  Sos.findById(req.params.userId)
    .then(function (location) {
      res.status(200)
        .json(location);
      console.log('error: false ', 'message: get user location ~', location);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
  //find location by account
SosController.locationByAccount = function (req, res) {
    Sos.findById(req.params.account)
      .then(function (location) {
        res.status(200)
          .json(location);
        console.log('error: false ', 'message: get user location ~', location);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  }
SosController.updateLocation = (req, res) => {
  Sos.update(req.body, {
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
SosController.removeLocation = function (req, res) {
  Sos.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (deletedRecords) {
      res.status(200)
        .json(deletedRecords);
      console.log('error: false', 'message: deletedRecords ~ ', deletedRecords);
    })
    .catch(function (error) {
      res.status(500)
        .json(error);
      console.log('error: true ', 'message: ', error)
    });
}

module.exports = SosController;
