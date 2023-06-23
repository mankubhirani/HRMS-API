const { log } = require('async');
const geotagging_checkin = require('../models/user_geotagging_checkin.model');
exports.create = function(req, res) {
    const checkin = new geotagging_checkin(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        geotagging_checkin.create(checkin, function(err, checkin) {
           if (err)
            res.send(err);

            else if (checkin[0][0].response === "fail")
            res.status(409).send({success:false, error:true,message:"This checkin details already exist with this employee id!"});
            else
      
            res.json({success:true, error:false,message:"This checkin details added successfully!"});
        });
    }



    
};

exports.update = function(req, res) {
    const checkout = new geotagging_checkin(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        geotagging_checkin.update(checkout, function(err, checkout) {
           if (err)
            res.send(err);

            else if (checkout[0][0].response === "fail")
            res.status(409).send({success:false, error:true,message:"This checkin details does not exist with this employee id!"});
            else
      
            res.json({success:true, error:false,message:"This checkout details updated successfully!"});
        });
    }
};