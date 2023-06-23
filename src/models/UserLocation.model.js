const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");

//Leaves object create
var Location = function (location) {
  this.Emp_Id = location.Emp_Id;
  this.full_address = location.full_address;
  this.state_name = location.state_name;
  this.city_name = location.city_name;
  this.latitude = location.latitude;
  this.longitude = location.longitude;
  this.distance = location.distance;
  this.company_id=location.company_id
  this.created_by = location.created_by;
  this.created_date = new Date();
};

Location.create = function (newLocation, result) {
 
  let sql = "call hrms.sp_insert_employee_geoLocation(?,?,?,?,?,?,?,?,?,?);";
  var values = Object.values(newLocation);
  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("id", res);
      result(null, res[0][0]);
    }
  });
};

Location.findAll = function (Emp_Id,company_id, result) {
 
    dbConn.query("call hrms.getUserLocations(?,?);",[Emp_Id,company_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res[0]);
        }
    });
};


module.exports = Location;
