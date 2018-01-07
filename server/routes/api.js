'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    ReprocessController = require('../controllers/reprocessController'),
    NodeMailController = require('../controllers/nodeMailer'),
    HubtelServiceController = require('../controllers/hubtel.service.controller'),
    ContactServiceController = require('../controllers/contact.service.controller'),
    SosServiceController = require('../controllers/sos.service.controller'),
    AgentController = require('../controllers/agent.service.controller');

var APIRoutes = function(passport) {
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);
    router.post('/repr', ReprocessController.doMaker);
    // POST Routes.
    // router.post('/repr', passport.authenticate('jwt', { session: false}), allowOnly(config.accessLevels.user, ReprocessController.doMaker));
    router.post('/authorize', ReprocessController.doTransaction);
    router.post('/remove', ReprocessController.removeMaker);
    router.post('/mail', NodeMailController.doPost);
    router.post('/receive', HubtelServiceController.receiveMoney);
    router.post('/send', HubtelServiceController.sendMoney);
    router.post('/savecontacts', ContactServiceController.saveContacts);
    router.post('/share', SosServiceController.shareLocation);
    router.post('/onboard', AgentController.addAgent);

    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));
    router.get('/makers', ReprocessController.doGetAllMaker);
    router.get('/status', HubtelServiceController.geTranStatus);
    router.get('/contacts', ContactServiceController.contacts);
    router.get('/contact/:userId', ContactServiceController.contact);
    router.get('/contact/email/:email', ContactServiceController.contactByEmail);
    router.get('/locations', SosServiceController.locations);
    router.get('/location/:userId', SosServiceController.location);
    router.get('/location/account/:account', SosServiceController.locationByAccount);
    router.get('/agents', AgentController.agents);
    router.get('/agent/:userId', AgentController.agents);
    

    return router;
};

module.exports = APIRoutes;
