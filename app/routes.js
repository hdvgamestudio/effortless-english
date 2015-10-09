var express = require('express');
var config = require('../config/config')
var Error404 = require('../lib/errors/error404');
var cdController = require('./controllers/cd');
var lessionController = require('./controllers/lession');
var sectionController = require('./controllers/section');
var authController = require('./controllers/auth');
var authenticate = require('../lib/jwtAuth').authenticate;

module.exports = function(app) {
  var router = express.Router();

  router.route('/test')
    .get(function(req, res, next) {
      res.sendFile('../public/views/home.html');
  });

  /*-- Authenticate --*/
  router.route('/login')
    .post(authController.login)
  router.route('/logout')
    .get(authController.logout)

  /*-- CD --*/
  router.route('/cds')
    .post(authenticate, cdController.postCDs)
    .get(cdController.getCDs)
  router.route('/cds/:id')
    .get(cdController.showCDs)
    .put(cdController.editCDs)
    .delete(cdController.deleteCDs)

  /*-- Lession --*/
  router.route('/cds/:cd_id/lessions')
    .post(lessionController.postLessions)
    .get(lessionController.getLessions)
  router.route('/cds/:cd_id/lessions/:lession_id')
    .get(lessionController.showLessions)
    .put(lessionController.editLessions)
    .delete(lessionController.deleteLessions)

  /*-- Section --*/
  router.route('/cds/:cd_id/lessions/:lession_id/sections')
    .get(sectionController.getSections)
    .post(sectionController.postSections)
  router.route('/cds/:cd_id/lessions/:lession_id/sections/:section_id')
    .get(sectionController.showSections)
    .put(sectionController.editSections)
    .delete(sectionController.deleteSections)

  // Register all routes
  app.use('/api/v1', router);
  // All other request redirect to 404
  app.use('*', function(req, res, next) {
    next(new Error404());
  });
}
