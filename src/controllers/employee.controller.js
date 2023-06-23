'use strict';

const Employee = require('../models/employee.model');

exports.findAll = function(req, res) {
  Employee.findAll(req.params.company_id,function(err, employee) {
   
    if (err)
    res.send(err);
    if (employee[0][0].response === "fail")
   return res.json({success:false, error:true,message:"Employee does not exist with this company!","count":employee[1][0].count});
    else
  return  res.json({ data:employee[0],success:true,error:false,message:"Employees fetched successfully!","count":employee[1][0].count});
    
    
  });
};


exports.create = function(req, res) {
    const new_employee = new Employee(req.body);
    const address= req.body.address;
   const pAddress=req.body.pAddress;
    const education= req.body.education;
    const experience= req.body.experience;
    const In_caseof_emergency=req.body.In_caseof_emergency;
   const geolocation=req.body.geolocation;
   
// console.log(address);
// console.log(pAddress);
    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
       // Employee.create(new_employee, education, experience,address,pAddress,geolocation,function(err, employee) {
        Employee.create(new_employee,address,pAddress,education,experience,In_caseof_emergency,geolocation,function(err, employee) {
  
       if (err)
            return  res.send(err);
//             else if(employee[0][0].response==="fail1")
//             return  res.status(422).send({error:true,success:false,message:"This email is already exist!"});
// else if(employee[0][0].response==="fail2")
// return res.status(422).send({error:true,success:false,message:"This employee id is already exist!"});

else if(employee[0][0].response==="fail")
    return  res.status(422).send({error:true,success:false,message:"This Employee id already exist with this company!"});

else
return res.status(200).send({error:false,success:true,message:"Employee added successfully!"});



        });
    }
};


exports.findById = function(req, res) {
    Employee.findById(req.params.email, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};
exports.findByTableId = function(req, res) {
    Employee.findByTableId(req.params.id, function(err, employee) {
        if (err)
        res.send(err);

        if (employee[0][0].response === "fail")
        return res.json({success:false, error:true,message:"Employee does not exist with this company!"});
         else
       return  res.json({ data:employee[0],success:true,error:false,message:"Employee details fetched successfully!","count":employee[1][0].count});
     
    });
};

exports.findByEmpId = function(req, res) {
    console.log("req",req.params);
    Employee.findByEmpId(req.params.company_id,req.params.emp_id, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

exports.findByIdCid = function(req, res) {
    Employee.findByIdCid(req.params.email,req.params.company_id, function(err, employee) {
        if (err)
        res.send(err);
        
        res.send({data:employee[0],error:false,success:true,message:"data fetched succssfully!"});
    });
};

// exports.update = function(req, res) {
//     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         Employee.update(req.params.id, new Employee(req.body), function(err, employee) {
//             if (err)
//             res.send(err);
//             res.json({ employee: employee,error:false, message: 'Employee successfully updated' });
//         });
//     }
  
// };



exports.updateEmployee = function(req, res) {
    const new_employee = new Employee(req.body);


    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
       
    }else{
        

        Employee.updateEmployee(req.params.id,new_employee, function(err,response) {
            if (err)
            return   res.send(err);
else if( response[0][0].response==="fail")
return   res.status(404).json({ success:false,error:true, response: "This employee does not exist!" });
else
return  res.status(200).json({ success:true,error:false, response: "The employee has been successfully updated!" });
        });
    }
  
};



exports.update = function(req, res) {
    const new_employee = new Employee(req.body);
    const education= req.body.education;
    const experience= req.body.experience;
    const docs= req.body.docs;
    const address= req.body.address;
    const pAddress=req.body.pAddress;
    const geolocation=req.body.geolocation;
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
       
    }else{
        

        Employee.update(req.params.companyId,req.params.email, new_employee,education, experience,address,pAddress,geolocation, function(err,response) {
            if (err)
            return   res.send(err);
else if( response[0][0].response==="fail")
return   res.status(404).json({ success:false,error:true, response: "This employee does not exist!" });
else
return  res.status(200).json({ success:true,error:false, response: "The employee has been successfully updated!" });
        });
    }
  
};


exports.delete = function(req, res) {
  Employee.delete( req.params.company_id,req.params.employee_id, function(err, employee) {
    if (err)
    res.send(err);
else if(employee[0][0].response==="success")
return  res.status(200).json({ success:true,error:false, response: "The employee has been successfully deleted!" });
else 
return   res.status(404).json({ success:false,error:true, response: "This employee id does not exist!" });
       
  });
};


exports.updateAfterPreonBoarding = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Employee.updateAfterPreonBoarding(req.params.email, new Employee(req.body), function(err, Details) {
            if (err)
            res.send(err);
            res.json({ Details : Details, error:false, message: 'Employee successfully updated' });
        });
    }
  
};

exports.findEmployeeByEmployeeId = function(req, res) {
    Employee.findEmployeeByEmployeeId(req.body.employee_id,req.body.company_id, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

exports.SearchEmployeeByEmployeeIdAndName = function(req, res) {
    Employee.SearchEmployeeByEmployeeIdAndName(req.body.company_id,req.body.employee_id,req.body.first_name,req.body.last_name, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

exports.SearchAllEmployeeByEmployeeIdAndName = function(req, res) {
    Employee.SearchAllEmployeeByEmployeeIdAndName(req.body.company_id,req.body.employee_id,req.body.first_name,req.body.last_name, function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};


exports.findByreport_manager = function(req, res) {
    Employee.findByreport_manager( function(err, employee) {
        if (err)
        res.send(err);
        res.json(employee);
    });
};

