const { log } = require('async');
const UserPermission = require('../models/UserPermission.model');

exports.findById= function(req, res) {
    UserPermission.findById(req.params.module_id,req.params.form_id,req.params.role_id,req.params.company_id,function(err, permission) {
        if (err)
    res.send(err);
    if (permission[0][0].response === "fail")
    return res.json({success:false, error:true,message:"Permission does not exist with this company!"});
     else
   return  res.json({ data:permission[0],success:true,error:false,message:"Permissions fetched successfully!","count":permission[1][0].count});
  });
};

exports.permissionById= function(req, res) {
    UserPermission.permissionById(req.params.role_id,req.params.company_id,function(err, permission) {
    if (err)
    res.send(err);
    if (permission[0][0].response === "fail")
   { return res.json({success:false, error:true,message:"Permission does not exist with this company!"});
    
    }
    else
     {

        // Sample data
const data = permission[0];

// Object to store the form names and permissions
const result = {};

// Iterate over the data and populate the result object
data.forEach(record => {
  const formName = record.form_name.replace(/ /g, "_");
  result[formName] = {
    view: record.is_view === 1,
    create: record.is_create === 1,
    update: record.is_update === 1,
    delete: record.is_delete === 1
  };
});

// Convert the result object to JSON
const jsonResult = JSON.stringify(result, null, 4);

//console.log(jsonResult);

const dataString=jsonResult;
const jsonData = JSON.parse(dataString);
//console.log(jsonData);

   return  res.json({ data:jsonData,success:true,error:false,message:"Permissions fetched successfully!","count":permission[1][0].count});
     }    
});
};



exports.create = function(req, res) {
    const new_permission = new UserPermission(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserPermission.create(new_permission, function(err, permission) {
           if (err)
            res.send(err);

            else if (permission[0][0].response === "fail")
           return res.status(422).send({success:false, error:true,message:"This permission details already exist with this company id!"});
            else if (permission[0][0].response === "updated")
            return res.status(200).send({success:true, error:false,message:"This permission details updated successfully!"});
            else
           { 
          console.log(permission[0][0].response);
            return   res.json({success:true, error:false,message:"This permission details added successfully!"});
           }
          });
    }
};



exports.update = async (req, res) => {
    // const {module_id} = req.params;
    // const {form_id} = req.params;
    // const {role_id} = req.params;
    // const {company_id} = req.params;
    // const {body} = req;
    const User_Permission = new UserPermission(req.body);
    console.log(req.params.module_id,req.params.form_id,req.params.role_id,req.params.company_id);
  
        UserPermission.update(req.params.module_id,req.params.form_id,req.params.role_id,req.params.company_id,User_Permission,function(err, permission)
       { if (err)
            res.send(err);
            else
            res.json({error:false,success:true,message:"permission details updated successfully!"});
        });
    
};
