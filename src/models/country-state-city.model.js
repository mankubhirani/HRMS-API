const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

exports.findAllCountry = function (result) {
 
      dbConn.query("call hrms_new.hrms_sp_getCountries();",function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(err, null);
          }
          else {
           
              result(null, res);
          }
      });
  };
  exports.findStatebyCountryid = function (country_id,result) {
 
    dbConn.query("call hrms_new.hrms_sp_getStates(?);",country_id,function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
         
            result(null, res);
        }
    });
};
exports.findCitybyStateid = function (state_id,result) {
 
    dbConn.query("call hrms_new.hrms_sp_getCities(?);",state_id,function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
         
            result(null, res);
        }
    });
};
