'use strict';

const { log } = require('async');
const Designation = require('../models/designation.model');

exports.findAll = function(req, res) {
    Designation.findAll(req.params.company_id,function(err, designation) {
    if (err)
    res.send(err);
    if (designation[0][0].response === "fail")
    return res.json({ success:false,error:true,message:"Designation does not exist with this company!"});
     else
   return  res.json({ data:designation[0],success:true,error:false,message:"Designation details fetched successfully!","count":designation[1][0].count});
    });
};


exports.create = function(req, res) {
    const new_designation = new Designation(req.body);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Designation.create(new_designation,  function(err, designation) {
            if (err)
            res.send(err);
            console.log(designation);
            if (designation[0][0].response === "fail")
          return  res.json({success:false, error:true,message:"This designation already exist with this company!"});
            else
            return  res.json({ success:true,error:false,message:"Designation added successfully!"});
        
           });
    }
   
};



exports.findById = function(req, res) {
    Designation.findById(req.params.id, function(err, designation) {
        if (err)
        res.send(err);
        if (designation[0][0].response === "fail")
        return res.json({success:false, error:true,message:"Designation does not exist with this company!"});
         else
       return  res.json({ data:designation[0],success:true,error:false,message:"Designation details fetched successfully!","count":designation[1][0].count});
       
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Designation.update(req.params.id, new Designation(req.body), function(err, designation) {
            if (err)
           { res.send(err);}

          
            else if (designation[0][0].response === "fail")
            { 
             return   res.json({success:false, error:true,message:"This designation does not exist with this company!"});
            }
            else 
             return res.json({ success:true,error:false,message:"Designation details updated successfully!"});
             
            });
    }
  
};

exports.delete = function(req, res) {
  Designation.delete( req.params.id, function(err, designation) {
    if (err)
    res.send(err);
    if (designation[0][0].response === "fail")
    return res.json({success:false, error:true,message:"Designation does not exist with this company!"});
     else
   return  res.json({success:true,error:false,message:"Designation details deleted successfully!","count":designation[0][0].count});
    
  });
};

exports.findBySearch = function(req, res) {
    Designation.findBySearch(req.body.designation_name, function(err, designation_name) {
        if (err)
        res.send(err);
        res.json(designation_name);
    });
};

exports.findAllSearch = function(req, res) {
    Designation.findAllSearch(req.body.designation_name,function(err, designation_name) {
        if (err)
        res.send(err);
        res.json(designation_name);
    });
};
