var Help = require('../models/help');
var _ = require('underscore');

exports.postHelps = function(req, res, next) {
  var newHelp = req.body.help;
  var help = new Help(newHelp);
  help.save(function(err, help) {
    if (err) return next(err);
    res.json(help);
  });
}

exports.getHelps = function(req, res, next) {
  var fields;
  var criteria = {};
  var sort = {};
  if (req.query.q) {
    var expr = new RegExp('.*' + req.query.q + '.*');
    criteria.$or = [
      { title: expr },
      { language: expr },
      { content: expr }
    ];
  }
  if (req.query.fields) {
    fields = req.query.fields.replace(/,/g, ' ');
  }

  if (req.query.language) {
    criteria.language = req.query.language;
  }
  Help.find(criteria, fields)
    .exec(function(err, helps) {
    if (err) return next(err);
    res.json({helps: helps, record_total: helps.length});
  });
}

exports.showHelps = function(req, res, next) {
  var id = req.params.id;
  Help.findOne({_id: id})
    .exec(function(err, help) {
    if (err) return next(err);
    res.json(help);
  })
}

exports.editHelps = function(req, res, next) {
  var id = req.params.id;
  var updatedHelp = req.body.help;
  Help.findOne({_id: id})
    .exec(function(err, help) {
    if (err) return next(err);
    help = _.extend(help, updatedHelp);
    help.save(function(err, help) {
      if (err) return next(err);
      res.json(help);
    });
  })
}

exports.deleteHelps = function(req, res, next) {
  var id = req.params.id;
  Help.remove({_id: id})
    .exec(function(err, result){
    if (err) return next(err);
    res.json(result);
  });
}
