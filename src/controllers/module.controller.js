const { log } = require('async');
const modules = require('../models/module.model');

exports.getmodule = function(req, res) {
    modules.getmodule(req.params.id,function(err, module) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', module);
    res.send({data:module,success:true,message:"data fetched successfully"});
  });
};

exports.getAllmodule = function(req, res) {
    modules.getAllmodule(function(err, module) {

    if (err)
    res.send(err);
    res.send({data:module,success:true,message:"data fetched successfully"});
  });
};


exports.getformsbyId = function(req, res) {
    modules.getformsbyId(req.params.id,function(err, forms) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', forms);
    res.send({data:forms,success:true,message:"data fetched successfully"});
  });
};
exports.getformsbyModuleId = function(req, res) {
    modules.getformsbyModuleId(req.params.module_id,function(err, forms) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', forms);
    res.send({data:forms,success:true,error:false,message:"data fetched successfully"});
  });
};
