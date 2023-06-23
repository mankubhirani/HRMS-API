const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

//object create
var WorkLocation = function (location) {
  this.location_id=location.location_id,
  this.company_id = location.company_id;
    this.location_name = location.location_name;
  this.country_id=location.country_id,
  this.state_id=location.state_id,
  this.city_id=location.city_id,
  this.pin_code=location.pin_code,
  this.street_address=location.street_address,
  this.location_head_id=location.location_head_id,
  this.is_active=location.is_active,
  this.created_by = location.created_by,
  this.created_date = new Date(),
  this.updated_by = location.updated_by; 
  this.updated_date = new Date();
};

WorkLocation.create = function (loc, result) {
  
  let sql = "call hrms_new.hrms_sp_create_company_branches_address(?, ?, ?, ?, ?, ?, ?, ?, ?);";
  console.log(loc);
  var values =[loc.company_id,loc.location_name,loc.country_id,loc.state_id,loc.city_id,loc.pin_code,loc.street_address,loc.location_head_id,loc.created_by];
  dbConn.query(sql, values, function (err, res) {
    if (err) {
    
      result(err, null);
    } else {
    
      result(null, res);
    }
  });
};

WorkLocation.findById = function (location_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getCompanyBranchesAddressById(?);    ",
    [location_id],
    function (err, res) {
      if (err) {
        result(err, null);
      } else {  
        result(null, res);
      }
    }
  );
};

WorkLocation.findAll = function (company_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getCompanyBranchesAddress(?);",company_id, function (err, res) {
      if (err) {
       
        result(null, err);
      } else {
       
        result(null, res);
      }
    }
  );
};



WorkLocation.update = function (location_id,loc, result) {
  // console.log(loc);
  let sql = "call hrms_new.hrms_sp_update_company_branches_address(?, ?, ?, ?, ?, ?, ?, ?,?);  ";
  var values =[location_id,loc.location_name,loc.country_id,loc.state_id,loc.city_id,loc.pin_code,loc.street_address,loc.location_head_id,loc.updated_by];
  dbConn.query(sql, values, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

WorkLocation.delete = function (location_id, result) {
  dbConn.query(
    "call hrms.sp_delete_work_location(?);",
    [location_id],
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


module.exports = WorkLocation;
