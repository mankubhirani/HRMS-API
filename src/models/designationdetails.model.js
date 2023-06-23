

'user strict';
const { log } = require('async');
var dbConn = require('./../../config/db.config');

var departmentdetails = function(details){

    this.departmentName =  details.departmentName
    this.MailAlias = details.MailAlias
    this.DepartmentLead =  details.DepartmentLead
    this.ParentDepartment = details.ParentDepartment
//    this.employee_id      = details.employee_id;
//     this.company_id          = details.company_id;
    this.added_by   = details.added_by;
    this.modified_by    = details.modified_by;
    this.status         = details.status ? details.status : 1;
    this.added_time     = new Date();
    this.company_id=details.company_id
    
};

departmentdetails.create = function (department, result) {  
    dbConn.query("Select * from department where departmentName=? and company_id=? ",
    [department.departmentName,department.company_id], function (err, res) {
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
           
        }
        else{
            let sql = `CALL insert_department(?,?,?,?,?,?,?,?)`;
    dbConn.query(sql,
        [   department.company_id,
            department.departmentName, 
            department.MailAlias,
            department.DepartmentLead,
            department.ParentDepartment,
            department.status,
            department.added_by, 
            new Date()
        
        ],
           
       
            function (err, res) {

                if(err) {
                    console.log("why this colavery colavery deeee");
                    console.log("error: ", err);
                    result(err, null);
                }
                else{

                    console.log("res: ", res[0]);
                    result(null, res[0]);
                    //result(null, res);
                    
                }
            });  
        }
    }); 
     
};
         
departmentdetails.findById = function (id, result) {
    dbConn.query("Select * from department where departmentId = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
departmentdetails.findAll = function (company_id,result) {
    let sql = `CALL department_info(?)`;
    dbConn.query(sql, company_id,function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('departmentdetails : ', res);  
            result(null, res);
            //dbConn.end();
        }
    });   
};
departmentdetails.update = function(id, department, result){    
    dbConn.query("Select * from department where departmentName=? and company_id=? ",
    [department.departmentName,department.company_id], function (err, res) {
        if(err || res.length > 0) {
            console.log("error: ", err);
            const msg = "already exist"
            result(err, msg);
            //result(null, err);
        }
        else{
            let sql = `CALL update_department(?,?,?,?,?,?,?)`;
  dbConn.query(sql,[department.departmentName,department.MailAlias, department.DepartmentLead,
    department.ParentDepartment,department.modified_by,new Date(),id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
});
};
departmentdetails.delete = function(id, result){
     
    let sql = `CALL delete_department(?)`;
    dbConn.query(sql, [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

// departmentdetails.findBySearch = function (department, result) {
//     dbConn.query("Select * FROM department where departmentName = ? and company_id = ?", department.departmentName ,department.
//                  company_id, function (err, res) {             
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };



departmentdetails.findBySearch = function (department, result) {
    let sql = `CALL searchByName_department(?,?)`;
dbConn.query(sql,[department.departmentName,
  department.company_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("depart",department.departmentName);
console.log(department.company_id)
            result(null, res);
        }
    });   
};



// departmentdetails.findAllSearch = function (company_id,result) {
//     dbConn.query("Select * from department where company_id = ? ",company_id, function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{
//             console.log('department : ', res);  
//             result(null, res);
//         }
//     });   
//   };


departmentdetails.findAllSearch = function (department,result) {
    let sql = `CALL searchAllName_department(?)`;
    dbConn.query(sql,[department.company_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('department : ', res);  
            result(null, res);
        }
    });   
  };
  
module.exports= departmentdetails;
