const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

//Leaves object create
var leave = function (leave) {
    this.leave_type = leave.leave_type;
  this.description = leave.description;
  this.company_id = leave.company_id;
  this.created_at = new Date();
  this.created_by = leave.created_by; 
  this.updated_by = leave.updated_by; 
};

leave.create = function (l, result) {
  
  let sql = "call hrms_new.hrms_sp_create_leave_type(?,?, ?,?);  ";
  var values =[l.leave_type,l.description,l.company_id,l.created_by];
  console.log(values);

  dbConn.query(sql, values, function (err, res) {
    if (err) {
     // console.log("error: ", err);
      result(err, null);
    } else {
     // console.log("id", res);
      result(null, res[0]);
    }
  });
};

leave.findById = function (leave_type_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getLeave_typeById(?);    ",
    [leave_type_id],
    function (err, res) {
      if (err) {
        result(err, null);
      } else {  
         console.log("error: ", res);
        result(null, res);
      }
    }
  );
};

leave.findAll = function (company_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getLeave_type(?);    ",
    company_id,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};




leave.update = function (leave_type_id,leave, result) {
  
  let sql = "call hrms_new.hrms_sp_update_leave_type(?, ?, ?,?);  ";
  // console.log(permission);
  var values =[leave_type_id,leave.leave_type,leave.description,leave.updated_by];
  dbConn.query(sql, values, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
leave.delete = function (leave_type_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_delete_leave_type(?)    ;",
    [leave_type_id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};


module.exports = leave;
