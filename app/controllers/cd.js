var CD = require('../models/cd');
var Lession = require('../models/lession');
var _ = require('underscore');

exports.postCDs = function(req, res, next) {
  var newCd = req.body.cd;
  var cd = new CD(newCd);
  cd.save(function(err, cd) {
    if (err) return next(err);
    res.json(cd);
  });
}

exports.getCDs = function(req, res, next) {
  var fields;
  var criteria = {};
  var sort = {};
  if (req.query.q) {
    var expr = new RegExp('.*' + req.query.q + '.*');
    criteria.$or = [
      { title: expr }
    ];
  }
  if (req.query.fields) {
    fields = req.query.fields.replace(/,/g, ' ');
  }

  if (req.query.title) {
    criteria.title = req.query.title;
  }
  CD.find(criteria, fields)
    .populate('lessions', 'title')
    .exec(function(err, cds) {
    if (err) return next(err);
    res.json({cds: cds, record_total: cds.length});
  });
}

exports.showCDs = function(req, res, next) {
  var id = req.params.id;
  CD.findOne({_id: id})
    .populate('lessions')
    .exec(function(err, cd) {
    if (err) return next(err);
    res.json(cd);
  })
}

exports.editCDs = function(req, res, next) {
  var id = req.params.id;
  var updatedCd = req.body.cd;
  CD.findOne({_id: id})
    .exec(function(err, cd) {
    if (err) return next(err);
    cd = _.extend(cd, updatedCd);
    cd.save(function(err, cd) {
      if (err) return next(err);
      res.json(cd);
    });
  })
}

exports.deleteCDs = function(req, res, next) {
  var id = req.params.id;
  CD.remove({_id: id})
    .exec(function(err, result){
    if (err) return next(err);
    res.json(result);
  });
}
