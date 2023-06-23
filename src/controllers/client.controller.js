const Addclient = require('../models/client.model')

exports.findAll = function(req, res) {
    Addclient.findAll(function(err, client) {
    console.log('controller')
    if (err)
    res.send(err);
    res.json({ client : client, error:false, message: 'fetched successfully' });
 
  });
};


// exports.add = function(req, res) {
//     const new_client = new Addclient(req.body);
//     //handles null error 
//     console.log("new_client",new_client);
//    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         Addclient.add(new_client, function(err, client) {
//             // if (err)
//             // res.send(err);
//             // res.json({error:false,message:"Client added successfully!",data:client});
//             if (err)
//             res.send(err);
//             if (client === "already exist")
//             res.json({data:client, error:true,message:"This Client name already exist with email or phone number!"});
//             else
//             res.json({data:client, error:false,message:"Client details added successfully!"});
//         });
//     }
// };
exports.add = function(req, res) {
  const client = new Addclient(req.body);
  //handles null error 
 if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Addclient.add(client, function(err, new_client) {
          if (err)
          res.send(err);
          console.log(new_client);
          if (new_client[0][0].response === "fail")
        return  res.json({success:false, error:true,message:"This client name or email or contact number already exist with this company!"});
          else
          return  res.json({ success:true,error:false,message:"Client details inserted successfully!"});
      
         });
  }
};


exports.findById = function (req, res) {
    Addclient.findById(req.params.client_id, function (err, client) {
      if (err) return res.send(err);
      else if (client.response === "fail") {
        return res
          .status(422)
          .json({
            success: false,
            error: true,
            message: "This client details doesn't exist!",
          });
      } else
        return res.json({
          data: client,
          success: true,
          error: false,
          message: "Client details fetched successfully!",
        });
    });
  };


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Addclient.update(req.params.id, new Addclient(req.body), function(err, client) {
            if (err)
            res.send(err);
            res.json({ client : client, error:false, message: 'client successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Addclient.delete( req.params.id, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'client deleted successfully' });
  });
};
