const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

//object create
var UserPermission = function (permission) {
    this.module_id = permission.module_id;
    this.form_id = permission.form_id;
    this.role_id = permission.role_id;
    this.company_id = permission.company_id;
    this.is_view = permission.is_view;
  this.is_create = permission.is_create;
  this.is_update = permission.is_update;
  this.is_delete = permission.is_delete;
  this.created_by = permission.created_by; 
  this.updated_by = permission.updated_by; 
};

UserPermission.create = function (permission, result) {
  
    let sql = "call hrms_new.hrms_sp_create_role_mapping_with_forms(?, ?, ?, ?, ?, ?, ?, ?,?,?); ";
    var values =[permission.module_id,permission.form_id,permission.role_id,permission.company_id,permission.is_create,permission.is_update,permission.is_view,permission.is_delete,permission.created_by,permission.created_by];
    dbConn.query(sql, values, function (err, res) {
      if (err) {
     
        result(err, null);
      } else {
       
        result(null, res);
      }
    });
  };
  

  UserPermission.update = function (module_id,form_id,role_id,company_id,permission, result) {
  
    let sql = "call hrms.sp_tbl_role_mapping_withforms_update(?,?,?,?,?,?,?,?,?,?);";
    var values =[module_id,form_id,role_id,company_id,permission.is_view,permission.is_create,permission.is_update,permission.is_delete,new Date(),permission.updated_by];
    dbConn.query(sql, values, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("id", res);
        result(null, res[0]);
      }
    });
  };
  



UserPermission.findById = function (module_id,form_id,role_id,company_id, result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getRoleMappingWithForms(?,?,?,?);",
      [module_id,form_id,role_id,company_id],
      function (err, res) {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  };
  
  
UserPermission.permissionById = function (role_id,company_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getUserPermission(?,?);",
    [role_id,company_id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = UserPermission;