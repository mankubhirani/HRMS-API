const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");

//Leaves object create
var ApplyLeaves = function (leaves) {
  this.company_id = leaves.company_id;
  this.employee_id = leaves.employee_id;
this.leave_type_id = leaves.leave_type_id;
  this.date_from = leaves.date_from;
  this.date_to = leaves.date_to;
  this.reporting_manager_id = leaves.reporting_manager_id;
  this.reason_for_leave = leaves.reason_for_leave;
  this.email = leaves.email;
  this.additional_email = leaves.additional_email;
  this.poc_employee = leaves.poc_employee;
  this.poc_mobile = leaves.poc_mobile;
  this.poc_email = leaves.poc_email;
  this.leave_status = leaves.leave_status;
  this.leave_status_reason = leaves.leave_status_reason;
  this.created_by=leaves.created_by;
  this.updated_by=leaves.updated_by;
  this.apply_leave_id=leaves.apply_leave_id
};

ApplyLeaves.create = function (leave, result) {
  
  let sql = "call hrms_new.hrms_sp_create_apply_leave(?, ?, ?, ?, ?,?,?, ?,?,?, ?);  ";
 
  dbConn.query(sql, 
    [leave.company_id,
    leave.employee_id,
    leave.leave_type_id,
    leave.date_from,
    leave.date_to,
    leave.reporting_manager_id,
    leave.reason_for_leave,
    leave.poc_employee,
    leave.poc_mobile,
    leave.poc_email,
    leave.created_by
  ], function (err, res) {
    if (err) {
      result(err, null);
    } else {
     // console.log("id", res);
      result(null, res);
    }
  });
};

ApplyLeaves.Totalleave = function (result) {
  dbConn.query(
    "SELECT DATEDIFF(date_to, date_from) + 1 AS total_day FROM leaves order by Time_Added desc",
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

ApplyLeaves.findById_emp = function (company_id,employee_id,  result) {
  let sql = "call hrms_new.hrms_sp_getApplied_leave_byCid_byEmpid(?, ?);";
  dbConn.query(sql, [company_id, employee_id], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      console.log("res...............", res);
      result(null, res);
    }
  });
};

ApplyLeaves.findById = function (ApplyLeaveId, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getApplied_leave_byId(?);",
    [ApplyLeaveId],
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        console.log(res);
        console.log(res[0][0].response);
        result(null, res);
      }
    }
  );
};

ApplyLeaves.findAll = function (company_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getApplied_leave_byCid(?);",
    company_id,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        // console.log("Leaves : ", res[0][0]);
        result(null, res);
      }
    }
  );
};

ApplyLeaves.update = function (ApplyLeaveId, leave, result) {
  leave.email,      //mail will send

  leave.additional_email, //mail will send

  dbConn.query(
    "call hrms_new.hrms_sp_update_applied_leave(?, ?, ?, ?, ?, ?, ?, ?,?,?,?, ?);    ",

    [
      ApplyLeaveId,
      leave.leave_type_id,
    leave.date_from,
    leave.date_to,
    leave.reporting_manager_id,
    leave.reason_for_leave,
    leave.poc_employee,
    leave.poc_mobile,
    leave.poc_email,
    leave.leave_status,
    leave.leave_status_reason,
    leave.updated_by
    ],

    function (err, res) {
      if (err) {

        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

ApplyLeaves.delete = function (ApplyLeaveId, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_delete_applied_leave(?);",
    [ApplyLeaveId],
    function (err, res) {
      if (err) {
   
        result(null, err);
      } else {
      
        result(null, res);
      }
    }
  );
};

ApplyLeaves.updateBY = (body, employee_id, ApplyLeaveId) => {
  console.log("2", body, employee_id, ApplyLeaveId);
  const SQLQuery = `UPDATE leaves 
                        SET Action='${body.Action}' 
                        WHERE employee_id=${employee_id} and ApplyLeaveId=${ApplyLeaveId}`;

  return dbConn.query(SQLQuery);
};

ApplyLeaves.findBy = function (employee_id, Action, result) {
  console.log("hii.....", employee_id, Action);
  dbConn.query(
    "Select * from leaves where employee_id=? and Action=? ORDER BY Time_Added DESC",
    [employee_id, Action],
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

ApplyLeaves.findAllByAction = function (Action, result) {
  dbConn.query(
    "Select * from leaves where Action=? ORDER BY Time_Added DESC",
    Action,
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

ApplyLeaves.findBySearch = function (leave_type, result) {
  dbConn.query(
    "Select * from leaves where leave_type = ? ",
    leave_type,
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

ApplyLeaves.findBySearchID = function (leave_type, employee_id, result) {
  dbConn.query(
    "Select * from leaves where leave_type = ? and employee_id=?",
    [leave_type, employee_id],
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

ApplyLeaves.applyfindAllSearch = function (details, result) {
  // console.log(employee_id,leave_type)
  let leave_type = details.leave_type;
  let employee_id = details.employee_id;
  dbConn.query(
    "Select * from leaves where employee_id=? or leave_type=? ",
    [employee_id, leave_type],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
        console.log(res);
      }
    }
  );
};

ApplyLeaves.applySearchAll = function (leave_type, result) {
  // console.log(employee_id,leave_type)

  dbConn.query("Select * from leaves", leave_type, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
      console.log(res);
    }
  });
};

module.exports = ApplyLeaves;
