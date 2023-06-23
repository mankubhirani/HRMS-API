const { log } = require('async');
const leave = require('../models/leavemaster.model');

exports.findAll = function(req, res) {
    leave.findAll(req.params.company_id,function(err, leave) {
    if (err)
    res.send(err);
    
    else if(leave[0][0].response === "fail")
  {  console.log(leave);
    return res.status(404).send({success:false, error:true,message:"leave details does not exist with this company id!",count:leave[1][0].count});
  }
    else

    return res.send({data:leave[0],success:true, error:false,message:"leaves fetched successfully!",count:leave[1][0].count});
  });
};


exports.create = function(req, res) {
    const new_leave = new leave(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        leave.create(new_leave, function(err, leave) {
           if (err)
            res.send(err);

            else if (leave[0].response === "fail")
            return   res.status(409).send({success:false, error:true,message:"This leave details already exist with this company id!"});
            else
          
            return    res.json({success:true, error:false,message:"leave details added successfully!"});
        });
    }
};
exports.delete = function(req, res) {
    leave.delete(req.params.leave_type_id, function(err, leave) {
    if (err)
    res.send(err);
    else if (leave[0][0].response === "fail")
    return   res.status(404).send({success:false, error:true,message:"leave details does not exist with this id!"});
            else
            
            return res.json({success:true, error:false,message:"leave deleted successfully!"});
  });
};
exports.findById = function(req, res) {
    leave.findById(req.params.leave_type_id,function(err, leave) {
    if (err)
    res.send(err);
  
    else if(leave[0][0].response === "fail")
    return res.status(404).send({success:false, error:true,message:"leave details does not exist with this id!"});

    else
    console.log('res', leave);
    return res.send({data:leave[0],success:true,message:"leaves fetched successfully!",count:leave[1][0].count});
   
  });
};


exports.update = function (req, res){
 
  const new_leave = new leave(req.body);
  
  
    leave.update(req.params.leave_type_id,new_leave, function(err, leave)
       {  if (err)
        res.send(err);
  
        else if (leave[0][0].response === "fail")
    return    res.status(404).send({success:false, error:true,message:"leave details does not exist with this id!"});
        else
      
        return  res.json({success:true, error:false,message:"leave details updated successfully!"});
        });
    
  };
  