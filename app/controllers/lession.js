var Section = require('../models/section');
var Lession = require('../models/lession');
var _ = require('underscore');

exports.postLessions = function(req, res, next) {
  var newLession = req.body.lession;
  console.log(JSON.stringify(newLession));
  var lession = new Lession(newLession);
  lession.save(function(err, lession) {
    if (err) return next(err);
    res.json(lession);
  });
}

exports.getLessions = function(req, res, next) {
  var cdId = req.params.cd_id;
  var criteria = {cd_id: cdId};
  var sort = {};
  if (req.query.q) {
    var expr = new RegExp('.*' + req.query.q + '.*');
    criteria.$or = [
      { title: expr }
    ];
  }
  if (req.query.title) {
    criteria.title = req.query.title;
  }
  Lession.find(criteria)
    .populate('sections')
    .exec(function(err, lessions) {
    if (err) return next(err);
    res.json({lessions: lessions, record_total: lessions.length});
  });
}

exports.showLessions = function(req, res, next) {
  var id = req.params.lession_id;
  Lession.findOne({_id: id})
    .populate('sections')
    .exec(function(err, lession) {
    if (err) return next(err);
    res.json(lession);
  })
}

exports.editLessions = function(req, res, next) {
  var id = req.params.lession_id;
  var updatedLession = req.body.lession;
  Lession.findOne({_id: id})
    .exec(function(err, lession) {
    if (err) return next(err);
    lession = _.extend(lession, updatedLession);
    lession.save(function(err, lession) {
      if (err) return next(err);
      res.json(lession);
    });
  })
}

exports.deleteLessions = function(req, res, next) {
  var id = req.params.lession_id;
  Lession.remove({_id: id})
    .exec(function(err, result){
    if (err) return next(err);
    res.json(result);
  });
}
