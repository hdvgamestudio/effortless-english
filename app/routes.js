var express = require('express');
var Error404 = require('../lib/errors/error404');
var cdController = require('./controllers/cd');
var lessionController = require('./controllers/lession');
var sectionController = require('./controllers/section');

module.exports = function(app) {
  var router = express.Router();

  router.route('/')
    .get(function(req, res, next) {
      res.send('Hello! The effortless English');
  });
  /*-- CD --*/
  router.route('/cds')
    .post(cdController.postCDs)
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
