const { log } = require('async');
const ApplyLeaves = require('../models/applyleaves.model');

exports.findAll = function(req, res) {
    ApplyLeaves.findAll(req.params.company_id,function(err, leaves) {
    if (err)
    res.send(err);
    else if(leaves[0][0].response==="fail")
    {
      return res.status(404).send({success:false,error:true,message:"No leave exist with this company!",count:leaves[1][0].count})
    }
      else
      return res.json({data:leaves[0],success:true,error:false,message:"Leave fetched successfully!",count:leaves[1][0].count});
  

  });
};


exports.apply = function(req, res) {
    const new_leaves = new ApplyLeaves(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        ApplyLeaves.create(new_leaves, function(err, leave) {
           if (err)
            res.send(err);
          else if(leave[0][0].response==="fail")
          {
            return res.status(422).send({success:false,error:true,message:"leave alreday exist with this date!"})
          }
            else
            res.json({success:true,error:false,message:"Leave applied successfully!"});
        });
    }
};


exports.Totalleave = function(req, res) {
    ApplyLeaves.Totalleave( function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};


exports.findById_emp = function(req, res) {
  console.log(req.params.company_id,req.params.employee_id)
    ApplyLeaves.findById_emp(req.params.company_id,req.params.employee_id, function(err, leave) {
        if (err)
        res.send(err);
        else if(leave[0][0].response==="fail")
        {
          return res.status(404).send({success:false,error:true,message:"leave does not exist with this employee id ",count:leave[1][0].count})
        }
          else
          res.json({data:leave[0],success:true,error:false,message:"Leave fetched successfully!",count:leave[1][0].count});
        
    });
};

exports.findById = function(req, res) {
    ApplyLeaves.findById(req.params.ApplyLeaveId, function(err, leave) {
        if (err)
        res.send(err);
        else if(leave[0][0].response==="fail")
        {
          return res.status(404).send({success:false,error:true,message:"leave does not exist with this employee id "})
        }
          else
          res.json({data:leave[0],success:true,error:false,message:"Leave fetched successfully!",count:leave[1][0].count});
        
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        ApplyLeaves.update(req.params.ApplyLeaveId, new ApplyLeaves(req.body), function(err, leave) {
            if (err)
            res.send(err);
            else if(leave[0][0].response==="fail")
        {
          return res.status(404).send({success:false,error:true,message:"leave does not exist with this leave id "})
        }
          else
          res.json({success:true,error:false,message:"Leave updated successfully!"});
        
        });
    }
  
};


exports.delete = function(req, res) {
    ApplyLeaves.delete( req.params.ApplyLeaveId, function(err, leave) {
    if (err)
    res.send(err);
    else if(leave[0][0].response==="fail")
    {
      return res.status(404).send({success:false,error:true,message:"leave does not exist with this leave id "})
    }
      else
      res.json({success:true,error:false,message:"Leave deleted successfully!"});
    
  });
};




exports.updateBY = async (req, res) => {
    const {employee_id} = req.params;
    const {ApplyLeaveId} = req.params;
    const {body} = req;
    console.log("1",req.body.Action,req.params.employee_id,req.params.ApplyLeaveId);
    try {
     ApplyLeaves.updateBY(body,req.params.employee_id,req.params.ApplyLeaveId);
        res.json({
            message: 'UPDATE Action success',
            data: {
                id: employee_id,ApplyLeaveId,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
};

exports.findBy= function(req, res) {
    ApplyLeaves.findBy(req.params.employee_id,req.params.Action, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};

exports.findAllByAction= function(req, res) {
    ApplyLeaves.findAllByAction(req.params.Action, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};

exports.findBySearch = function(req, res) {
    ApplyLeaves.findBySearch(req.body.leave_type, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};

exports.findBySearchID = function(req, res) {
    ApplyLeaves.findBySearchID(req.body.leave_type,req.body.employee_id, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};

exports.applyfindAllSearch = function(req, res) {
//    console.log("e",req.body.employee_id,"l",req.body.leave_type)
    ApplyLeaves.applyfindAllSearch(req.body, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};
exports.applySearchAll = function(req, res) {

    ApplyLeaves.applySearchAll(req.body.leave_type, function(err, leave) {
        if (err)
        res.send(err);
        res.json(leave);
    });
};

