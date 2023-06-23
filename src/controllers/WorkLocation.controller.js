const { log } = require('async');
const WorkLocation = require('../models/WorkLocation.model');

exports.findAll = function(req, res) {
    WorkLocation.findAll(req.params.company_id,function(err, location) {
   
    if (err)
    res.send(err);
    if (location[0][0].response === "fail")
   return res.json({success:false, error:true,message:"Company branches does not exist with this company!"});
    else
  return  res.json({ data:location[0],success:true,error:false,message:"Company branches fetched successfully!","count":location[1][0].count});
    

  });
};


exports.create = function(req, res) {
    const new_location = new WorkLocation(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        WorkLocation.create(new_location, function(err, location) {
           if (err)
            res.send(err);

            else if (location[0][0].response === "fail")
            {
            console.log(location[0][0].response);
        return    res.status(422).send({success:false, error:true,message:"This Company branch already exist with this branch head id!"});
            }    
        else
        {
            return  res.json({success:true, error:false,message:"Company branches added successfully!"});
        }
          });
    }
};



exports.update = function (req, res){
  const new_location = new WorkLocation(req.body);
// console.log(req.body);

  WorkLocation.update(req.params.location_id,new_location, function(err, location)
     {  if (err)
      res.send(err);

      else if (location[0][0].response === "fail")
  return    res.status(404).send({success:false, error:true,message:"This location details does not exist with this company id!"});
      else
    
      return  res.json({success:true, error:false,message:"location details updated successfully!"});
      });
  
};

exports.delete = function(req, res) {
    WorkLocation.delete( req.params.location_id, function(err, location) {
    if (err)
    res.send(err);
    else if (location[0][0].response === "fail")
   return res.status(404).send({success:false, error:true,message:"location does not exist with this company!"});
    else

  return res.json({success:true, error:false,message:"location details deleted successfully!"});
  });
};
exports.findById = function(req, res) {
  WorkLocation.findById( req.params.location_id, function(err, location) {
  if (err)
  res.send(err);
  else if (location[0][0].response === "fail")
 return res.status(404).send({success:false, error:true,message:"location does not exist with this company!"});
  else

return res.json({data:location[0][0],success:true, error:false,message:"location details fetched successfully!",count:location[1][0].count});
});
};
