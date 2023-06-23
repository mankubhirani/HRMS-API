'user strict';
var dbConn = require('./../../config/db.config');

Designation = function (designation) {
    this.designation_id = designation.designation_id;
    this.designation_name = designation.designation_name;
    this.mail_alias = designation.mail_alias;
    this.company_id = designation.company_id;
    this.modified_by = designation.modified_by;
    this.is_active = designation.is_active;
    this.created_by = designation.created_by;
    this.created_date = new Date();
    this.updated_by = designation.updated_by;
    this.updated_date = new Date();

};


Designation.create = function (designation, result) {
    dbConn.query("call hrms_new.hrms_sp_create_designation(?,?,?,?); ",
        [designation.designation_name,
        designation.mail_alias,
        designation.company_id,
        designation.created_by,
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








Designation.findById = function (id, result) {
    dbConn.query("call hrms_new.hrms_sp_getDesignationById(?);", id, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Designation.findAll = function (company_id, result) {
    let sql = `call hrms_new.hrms_sp_getDesignation(?)`;
    dbConn.query(sql, company_id, function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Designation.update = function (id, designation, result) {

    let sql = `call hrms_new.hrms_sp_update_designation(?, ?, ?, ?);    `;
    dbConn.query(sql,
        [id,
            designation.designation_name,
            designation.mail_alias,
            designation.updated_by
        ], function (err, res) {
            if (err) {
                result(null, err);
            } else {
               
                result(null, res);
                
            }
        });


};
Designation.delete = function (id, result) {

    let sql = `call hrms_new.hrms_sp_delete_designation(?)`;
    dbConn.query(sql, [id], function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

// Designation.findBySearch = function (designation, result) {
//     dbConn.query("Select * FROM designation where designation_name = ? and company_id = ?", designation.designation_name ,designation.
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


Designation.findBySearch = function (designation, result) {
    let sql = `CALL searchByName_designation(?,?)`;
    dbConn.query(sql, [designation.designation_name,
    designation.company_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("depart", designation.departmentName);
            console.log(designation.company_id)
            result(null, res);
        }
    });
};

// Designation.findAllSearch = function (company_id,result) {
//     dbConn.query("Select * from designation where company_id = ? ",company_id, function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{
//             console.log('designation : ', res);  
//             result(null, res);
//         }
//     });   
//   };


Designation.findAllSearch = function (designation, result) {
    let sql = `CALL searchAllName_designation(?)`;
    dbConn.query(sql, [designation.company_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('designation : ', res);
            result(null, res);
        }
    });
};


module.exports = Designation;
