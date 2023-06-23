"user strict";
const { log } = require("async");
var dbConn = require("./../../config/db.config");

var departmentdetails = function (details) {
  this.department_id = details.department_id;
  this.department_name = details.department_name;
  this.mail_alias = details.mail_alias;
  this.department_lead_id = details.department_lead_id;
  this.parent_department_id = details.parent_department_id;
  this.company_id = details.company_id;
  this.is_active = details.is_active;
  this.created_by = details.created_by;
  this.created_date = new Date();
  this.updated_by = details.updated_by;
  this.updated_date = new Date();
};

departmentdetails.create = function (department, result) {
  let sql = `call hrms_new.hrms_sp_create_department(?,?,?,?,?,?);`;
  dbConn.query(
    sql,
    [
      department.department_name,
      department.mail_alias,
      department.department_lead_id,
      department.parent_department_id,
      department.company_id,
      department.created_by,
    ],

    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

departmentdetails.findById = function (id, result) {
  dbConn.query("call hrms_new.hrms_sp_getDepartmentById(?);  ", id, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
departmentdetails.findAll = function (company_id, result) {
  let sql = `call hrms_new.hrms_sp_getDepartment(?);`;
  dbConn.query(sql, company_id, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
departmentdetails.update = function (departmentid, department, result) {

  let sql = `call hrms_new.hrms_sp_update_department(?, ?, ?, ?,?,?); `;
  dbConn.query(
    sql,
    [departmentid,
      department.department_name,
      department.mail_alias,
      department.department_lead_id,
      department.parent_department_id,
      department.updated_by
    ],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );

}

departmentdetails.delete = function (id, result) {
  let sql = `call hrms_new.hrms_sp_delete_department(?);  `;
  dbConn.query(sql, [id], function (err, res) {
    if (err) {
      result(null, err);
    } else {
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
  dbConn.query(
    sql,
    [department.departmentName, department.company_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("depart", department.departmentName);
        console.log(department.company_id);
        result(null, res);
      }
    }
  );
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

departmentdetails.findAllSearch = function (department, result) {
  let sql = `CALL searchAllName_department(?)`;
  dbConn.query(sql, [department.company_id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("department : ", res);
      result(null, res);
    }
  });
};

module.exports = departmentdetails;
