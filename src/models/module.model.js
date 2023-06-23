const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

exports.getmodule = function (id, result) {
  dbConn.query("call hrms.sp_get_module_byid(?);", id, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res[0]);
    }
  });
};

exports.getAllmodule = function (result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getModules();",

    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

exports.getformsbyId = function (id, result) {
  dbConn.query("call hrms.sp_get_forms_byid(?);", id, function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res[0]);
    }
  });
};

exports.getformsbyModuleId = function (module_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getForms_bymoduleid(?);",
    module_id,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res[0]);
      }
    }
  );
};
