const { log } = require('async');
const departmentdetails = require('../models/departmentdetails.model');

exports.findAll = function(req, res) {
    departmentdetails.findAll(req.params.company_id,function(err, department) {
    
    if (err)
    res.send(err);
    if (department[0][0].response === "fail")
   return res.json({success:false, error:true,message:"Department does not exist with this company!"});
    else
  return  res.json({ data:department[0],success:true,error:false,message:"Departments details fetched successfully!","count":department[1][0].count});
    
  });
};


exports.apply = function(req, res) {
    const new_details = new departmentdetails(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        departmentdetails.create(new_details, function(err, department) {
            if (err)
            res.send(err);
            if (department[0][0].response === "fail")
            return   res.json({success:false, error:true,message:"This department already exist with this company!"});
            else
            return res.json({ success:true,error:false,message:"Department added successfully!"});
        });
    }
};


exports.findById = function(req, res) {
    departmentdetails.findById(req.params.departmentId, function(err, department) {
        if (err)
        res.send(err);
        if (department[0][0].response === "fail")
        return res.json({success:false, error:true,message:"Department does not exist with this company!"});
         else
       return  res.json({ data:department[0],success:true,error:false,message:"Departments details fetched successfully!","count":department[1][0].count});
       
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        departmentdetails.update(req.params.departmentId, new departmentdetails(req.body), function(err, department) {
            if (err)
            res.send(err);
            else if (department[0][0].response === "fail")
           { 
            return   res.json({success:false, error:true,message:"This department does not exist with this company!"});
           }
           else 
            return res.json({ success:true,error:false,message:"Department details updated successfully!"});
     
        });
    }
  
};


exports.delete = function(req, res) {
    departmentdetails.delete( req.params.departmentId, function(err, department) {
    if (err)
    res.send(err);
    if (department[0][0].response === "fail")
    return res.json({success:false, error:true,message:"Department does not exist with this company!"});
     else
     console.log(department);
   return  res.json({success:true,error:false,message:"Departments details deleted successfully!","count":department[0][0].count});
    });
};

exports.findBySearch = function (req, res) {
    departmentdetails.findBySearch(req.body, function (err, department) {
        if (err)
            res.send(err);
        res.json(department);
    });
};

exports.findAllSearch = function(req, res) {
    departmentdetails.findAllSearch(req.body, function(err, department) {
        if (err)
        res.send(err);
        res.json(department);
    });
};
