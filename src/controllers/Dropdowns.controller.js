const { log } = require('async');
const Dropdowns = require('../models/Dropdowns.model');

exports.findAllIndustry = function(req, res) {
    Dropdowns.findAllIndustry(function(err, response) {
    console.log('controller')
    if (err)
    res.send(err);
    
    res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
  });
};

exports.findNumofEmployees = function(req, res) {
  Dropdowns.findNumofEmployees(function(err, response) {
  console.log('controller')
  if (err)
  res.send(err);
 
  res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
});
};


exports.findAllJobtype = function(req, res) {
  Dropdowns.findAllJobtype(function(err, response) {
  console.log('controller')
  if (err)
  res.send(err);

  res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
});
};
exports.findAllMeritalstatus = function(req, res) {
  Dropdowns.findAllMeritalstatus(function(err, response) {
  console.log('controller')
  if (err)
  res.send(err);

  res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
});
};
exports.findAllEmpStatus = function(req, res) {
  Dropdowns.findAllEmpStatus(function(err, response) {
  console.log('controller')
  if (err)
  res.send(err);
 
  res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
});
};
exports.findAllSourceofHire = function(req, res) {
  Dropdowns.findAllSourceofHire(function(err, response) {
  console.log('controller')
  if (err)
  res.send(err);
 
  res.send({data:response[0],success:true,error:false,message:"data fetched successfully!"});
});
};