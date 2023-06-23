const Addclient_poc = require('../models/client_poc.model')

exports.findAll = function(req, res) {
    Addclient_poc.findAll(function(err, client) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', client);
    res.send(client);
  });
};

// exports.findTotalLeave = function(req, res) {
//     Addleave.findTotalLeave(function(err, leaves) {
//     console.log('controller')
//     if (err)
//     res.send(err);
//     console.log('res', leaves);
//     res.send(leaves);
//   });
// };


exports.create = function(req, res) {
    const new_client_poc = new Addclient_poc(req.body);
    //handles null error 
    console.log("new_client_poc",new_client_poc);
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Addclient_poc.create(new_client_poc, function(err, client_poc) {
            // if (err)
            // res.send(err);
            // res.json({error:false,message:"Client poc added successfully!",data:client_poc});
            if (err)
            res.send(err);
            if (client_poc === "already exist")
            res.json({data:client_poc, error:true,message:"This Client poc name already exist with email or phone number!"});
            else
            res.json({data:client_poc, error:false,message:"Client poc details added successfully!"});
        });
    }
};


exports.findById = function (req, res) {
    Addclient_poc.findById(req.params.client_poc_id, function (err, client_poc) {
      if (err) return res.send(err);
      else if (client_poc.response === "fail") {
        return res
          .status(422)
          .json({
            success: false,
            error: true,
            message: "This client poc details doesn't exist!",
          });
      } else
        return res.json({
          data: client_poc,
          success: true,
          error: false,
          message: "Client poc details fetched successfully!",
        });
    });
  };


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Addclient_poc.update(req.params.id, new Addclient_poc(req.body), function(err, client) {
            if (err)
            res.send(err);
            res.json({ client : client, error:false, message: 'client poc successfully updated' });
        });
    }
};


exports.delete = function(req, res) {
    Addclient_poc.delete( req.params.id, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'client poc deleted successfully' });
  });
};
