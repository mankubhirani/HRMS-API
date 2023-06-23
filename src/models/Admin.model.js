'user strict';
var dbConn = require('./../../config/db.config');

// Documents object create
var Admin = function(doc){
    this.industry_name     = doc.industry_name;
    this.job_type      = doc.job_type;
    this.emp_status  = doc.emp_status;
    this.marital_status          = doc.marital_status;
    this.gender   = doc.gender;
    this.no_of_employee   = doc.no_of_employee;
};

Admin.findAll = function (result) {
    dbConn.query("call hrms.sp_commom_dropdowns();", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           
            result(null, res);
        }
    });  
};






// Documents.delete = function(id, result){
//     dbConn.query("call hrms.delete_employeeAttachment(?);", id, function (err, res) {
//        if(err) {
//            console.log("error: ", err);
//            result(null, err);
//        }
//        else{
//            result(null, res);
//        }
//    }); 
// };



module.exports= Admin;
