const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

//Leaves object create
var Roles = function (roles) {
  this.role_id = roles.role_id;
  this.role = roles.role;
  this.description = roles.description;
  this.company_id = roles.company_id;
  this.created_by = roles.created_by;
  this.created_date = new Date();
  this.is_active=roles.is_active;
  this.updated_by=roles.updated_by;
  this.updated_date = new Date();

};

Roles.create = function (newRoles, result) {
 
  let sql = "call hrms_new.hrms_sp_create_roles(?,?,?,?);";
  
  var body=[newRoles.role,newRoles.description,newRoles.company_id,newRoles.created_by]
  dbConn.query(sql, 
    body, function (err, res) {
    if (err) {
      result(err, null);
    }
  
     else {
      result(null, res);
    }
  });
};

Roles.findByCId = function (company_id, result) {
  console.log(company_id);
    dbConn.query("call hrms_new.hrms_sp_getRoles(?)    ;", company_id, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};



Roles.findbyid = function (roleid, result) {
  console.log(roleid);
    dbConn.query("call hrms_new.hrms_sp_getRolesById(?);",roleid, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Roles.delete = function (roleid, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_delete_roles(?);",roleid,function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};


Roles.update = function (roleid, role, result) {
  console.log("role", role);
  // let modified_time=new Date();

  dbConn.query(
    "call hrms_new.hrms_sp_update_roles(?, ?, ?, ?);",

    [
      roleid,
      role.role,
      role.description,
      role.updated_by,
     
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


module.exports = Roles;
