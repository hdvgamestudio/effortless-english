var Section = require('../models/section');
var _ = require('underscore');

exports.postSections = function(req, res, next) {
  var newSection = req.body.section;
  var section = new Section(newSection);
  section.save(function(err, section) {
    if (err) return next(err);
    res.json(section);
  });
}

exports.getSections = function(req, res, next) {
  var lessionId = req.params.lession_id;
  var criteria = {lession_id: lessionId};
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
  Section.find(criteria)
    .exec(function(err, sections) {
    if (err) return next(err);
    res.json({sections: sections, record_total: sections.length});
  });
}

exports.showSections = function(req, res, next) {
  var id = req.params.section_id;
  Section.findOne({_id: id})
    .exec(function(err, section) {
    if (err) return next(err);
    res.json(section);
  })
}

exports.editSections = function(req, res, next) {
  var id = req.params.section_id;
  var updatedSection = req.body.section;
  Section.findOne({_id: id})
    .exec(function(err, section) {
    if (err) return next(err);
    section = _.extend(section, updatedSection);
    section.save(function(err, section) {
      if (err) return next(err);
      res.json(section);
    });
  })
}

exports.deleteSections = function(req, res, next) {
  var id = req.params.section_id;
  Section.remove({_id: id})
    .exec(function(err, result){
    if (err) return next(err);
    res.json(result);
  });
}
