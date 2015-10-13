var express = require('express');
var config = require('../config/config')
var Error404 = require('../lib/errors/error404');
var cdController = require('./controllers/cd');
var lessionController = require('./controllers/lession');
var sectionController = require('./controllers/section');
var helpController = require('./controllers/help');
var authController = require('./controllers/auth');
var authenticate = require('../lib/jwtAuth').authenticate;

module.exports = function(app) {
  var router = express.Router();

  /*-- Authenticate --*/
  router.route('/login')
    .post(authController.login)

  /*-- Help --*/
  router.route('/helps')
    .post(authenticate, helpController.postHelps)
    .get(helpController.getHelps)
  router.route('/helps/:id')
    .get(helpController.showHelps)
    .put(authenticate, helpController.editHelps)
    .delete(authenticate, helpController.deleteHelps)

  /*-- CD --*/
  router.route('/cds')
    .post(authenticate, cdController.postCDs)
    .get(cdController.getCDs)
  router.route('/cds/:id')
    .get(cdController.showCDs)
    .put(authenticate, cdController.editCDs)
    .delete(authenticate, cdController.deleteCDs)

  /*-- Lession --*/
  router.route('/cds/:cd_id/lessions')
    .post(authenticate, lessionController.postLessions)
    .get(lessionController.getLessions)
  router.route('/cds/:cd_id/lessions/:lession_id')
    .get(lessionController.showLessions)
    .put(authenticate, lessionController.editLessions)
    .delete(authenticate, lessionController.deleteLessions)

  /*-- Section --*/
  router.route('/cds/:cd_id/lessions/:lession_id/sections')
    .get(sectionController.getSections)
    .post(authenticate, sectionController.postSections)
  router.route('/cds/:cd_id/lessions/:lession_id/sections/:section_id')
    .get(sectionController.showSections)
    .put(authenticate, sectionController.editSections)
    .delete(authenticate, sectionController.deleteSections)

  // Register all routes
  app.use('/api/v1', router);
  // All other request redirect to 404
  app.use('*', function(req, res, next) {
    next(new Error404());
  });
}
