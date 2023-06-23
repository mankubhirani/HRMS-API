var dbConn = require('./../../config/db.config');

//Leaves object create
var Addclient = function(clients){
    this.full_name     = clients.full_name;
    this.email_id      = clients.email_id;
    this.contact_no          = clients.contact_no;
    this.enroll_date          = clients.enroll_date;
    this.website         = clients.website;
    this.countryID   = clients.countryID;
    this.StateID=clients.StateID;    
    this.CityID=clients.CityID;  
    this.zip_pin_code=clients.zip_pin_code;  
    this.street_address=clients.street_address;  
    this.description=clients.description;  
this.company_id=clients.company_id;
this.created_by=clients.created_by
};

// Addclient.add = function (new_client, result) {  
//     dbConn.query("Select * from clients where full_name=? and email_id=? and contact_no=?",
//     [new_client.full_name,new_client.email_id,new_client.contact_no], function (err, res) {
             
//         if(err || res.length > 0) {
//             console.log("error: ", err);
//             const msg = "already exist"
//             result(err, msg);
           
//         }
//         else{  
//     dbConn.query("INSERT INTO clients set ?", new_client, function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });  
// }
// });
        
// };

Addclient.add = function (new_client, result) { 
    console.log(        new_client.company_id        );
    dbConn.query("call hrms_new.hrms_sp_create_client(?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
        new_client.company_id,
        new_client.full_name,
        new_client.email_id,
        new_client.contact_no,
        new_client.enroll_date,
        new_client.website,
        new_client.countryID,
        new_client.StateID,
        new_client.CityID,
        new_client.zip_pin_code,
        new_client.street_address,
        new_client.description,
        new_client.created_by,     
        ],
        function (err, res) {
            if (err) {
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
};

Addclient.findById = function (client, result) {
    var sql = `call hrms_new.hrms_sp_get_client(?);`;
    dbConn.query(sql, client, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0][0]);
      }
    });
  };


Addclient.findAll = function (result) {
    dbConn.query("Select * from clients", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('client : ', res);  
            result(null, res);
        }
    });   
};



Addclient.update = function(id, client, result){

    let d=new Date();
  dbConn.query("UPDATE clients SET full_name=?,email_id=?,contact_no=?,enroll_date=?,website=?,country=?,state=?,city=?,zip_pin_code=?,street_address=?,description=?WHERE id =?",
  [client.full_name,client.email_id,client.contact_no,client.enroll_date,client.website,client.country,client.state,client.city,client.zip_pin_code,client.street_address,client.description,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Addclient.delete = function(id, result){
     dbConn.query("DELETE FROM clients WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Addclient;
