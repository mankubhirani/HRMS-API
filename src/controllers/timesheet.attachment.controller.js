'use strict';
var express = require('express');
const path = require('path');
var router = express.Router();

const Document  = require('../models/timesheet.attachment.model');


exports.findAll = function(req, res) {

  Document.findAll(function(err, Document) {
    if (err)
    res.send(err);
   
    console.log('res', Document);
    res.json({ message: "Attachment has been fetched successfully!", status: "success",data:Document });
  });

};
exports.findById = function(req, res) {
  Document.findById(req.params.employeeId,req.params.companyId,req.params.month,req.params.year, function(err, Document) {
      if (err)
      res.send(err);
      
     // res.json(Document);
      res.json({ message: "Attachment has been fetched successfully!", status: "success",data:Document });

  });
};



exports.delete = function(req, res) {
    Document.delete( req.params.id, function(err, document) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'Document successfully deleted' });
    });
  };

  

  
  
