'use strict';
var express = require('express');
const path = require('path');
var router = express.Router();

const Document  = require('../models/attachment.model');


// exports.findAll = function(req, res) {

//   Document.findAll(function(err, Document) {
//     if (err)
//     res.send(err);
   
//     console.log('res', Document);
//     res.json({ message: "Attachment has been fetched successfully!", status: "success",data:Document });
//   });

// };
// exports.findById = function(req, res) {
//   Document.findById(req.params.email, function(err, Document) {
//       if (err)
//       res.send(err);
      
//      // res.json(Document);
//       res.json({ message: "Attachment has been fetched successfully!", status: "success",data:Document });

//   });
// };

exports.findByCompanyId = function(req, res) {
  Document.findByCompanyId(req.params.email,req.params.company_id, function(err, Document) {
      if (err)
      res.send(err);
      
     // res.json(Document);
      res.json({ data:Document[0],success:true,message: "Attachment has been fetched successfully!"});

  });
};


exports.findByempId = function(req, res) {
  console.log("req.........",req.params.employee_id,req.params.company_id)
  Document.findByempId(req.params.employee_id,req.params.company_id, function(err, Document) {
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
      res.json({document});
    });
  };

  // exports.download = function(req, res) {
    // var file = req.params.file;
    // var fileLocation = path.join('./src/uploads',file);
    // res.download(fileLocation, file);
    
    // console.log(fileLocation);
    // res.download(fileLocation);
   
    
  // };

  
  
