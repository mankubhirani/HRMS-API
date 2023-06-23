const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");



exports.findAllIndustry = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getIndustry();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };


  exports.findNumofEmployees = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getNum_of_employees();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };


  exports.findAllJobtype = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getJob_type();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };


  exports.findAllMeritalstatus = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getMarital_status();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };


  exports.findAllEmpStatus = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getEmployee_status();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };

  exports.findAllSourceofHire = function (result) {
    dbConn.query(
      "call hrms_new.hrms_sp_getSource_of_hire();",     
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          
          result(null, res);
        }
      }
    );
  };
