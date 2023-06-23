var dbConn = require('./../../config/db.config');

//Leaves object create
var Addclient_poc = function(client_poc){
    this.full_name     = client_poc.full_name;
    this.client_Poc = client_poc.client_Poc
    this.email_id      = client_poc.email_id;
    this.contact_no          = client_poc.contact_no;
    this.country   = client_poc.country;
    this.state=client_poc.state;    
    this.city=client_poc.city;  
    this.zip_pin_code=client_poc.zip_pin_code;  
    this.street_address=client_poc.street_address;  
    this.description=client_poc.description;  
};

Addclient_poc.create = function (new_client_poc, result) { 
    dbConn.query("Select * from client_poc where client_Poc=? and email_id=? and contact_no=?",
    [new_client_poc.client_Poc,new_client_poc.email_id,new_client_poc.contact_no], function (err, res) {
             
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{    
    dbConn.query("INSERT INTO client_poc set ?", new_client_poc, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    }); 
}
    })          
};

Addclient_poc.findById = function (client_poc, result) {
    var sql = 'CALL hrms_new.hrms_sp_get_client_poc(?)';
    dbConn.query(sql, client_poc, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0][0]);
      }
    });
  };
  
Addclient_poc.findAll = function (result) {
    dbConn.query("Select * from client_poc", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('client_poc : ', res);  
            result(null, res);
        }
    });   
};

// Addleave.findTotalLeave = function (result) {
//     dbConn.query("Select sum(NumberOfDays) as TotalLeave from client_poc", function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{
//             console.log('Leaves : ', res);  
//             result(null, res[0]);
//         }
//     });   
// };

Addclient_poc.update = function(id, client, result){

    let d=new Date();
  dbConn.query("UPDATE client_poc SET full_name=?,client_Poc=?,email_id=?,contact_no=?,country=?,state=?,city=?,zip_pin_code=?,street_address=?,description=?WHERE id =?",
  [client.full_name,client.client_Poc,client.email_id,client.contact_no,client.country,client.state,client.city,client.zip_pin_code,client.street_address,client.description,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Addclient_poc.delete = function(id, result){
     dbConn.query("DELETE FROM client_poc WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Addclient_poc;
