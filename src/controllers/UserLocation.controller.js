const { log } = require('async');
const Location = require('../models/UserLocation.model');

exports.findAll = function(req, res) {

    Location.findAll(req.params.Emp_Id,req.params.company_id,function(err, location) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', location);
    res.send(location);
  });
};


exports.create = function(req, res) {
    const location = new Location(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Location.create(location, function(err, response) {
           if (err)
            res.send(err);
            else
            res.json({data:response});
        });
    }
};
