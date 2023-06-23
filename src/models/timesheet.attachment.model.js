'user strict';
var dbConn = require('./../../config/db.config');

// Documents object create
var Documents = function(doc){
    this.name     = doc.name;
    this.type      = doc.type;
    this.description  = doc.description;
    this.size          = doc.size;
    this.updated_by   = doc.updated_by;
    this.updated_at    = new Date();
};

Documents.findAll = function (result) {
    dbConn.query("Select * from timesheet_attachment", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           console.log('Documents : ', res); 
            result(null, res);
        }
    });  
};


Documents.findById = function (employeeId,companyId,month,year,result) {
    dbConn.query("Select * from timesheet_attachment where MONTH(created_at) = ? AND YEAR(created_at)=? AND employeeId =? and company_id=? ORDER BY created_at DESC", [month,year,employeeId,companyId], function (err, res) {             
        if(err) {
            console.log("error: ", err);
           // result(err, null);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Documents.delete = function(id, result){
    dbConn.query("DELETE FROM timesheet_attachment WHERE id = ?", [id], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           result(null, res);
       }
   }); 
};



module.exports= Documents;
