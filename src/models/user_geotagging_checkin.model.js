const bigInt = require("big-integer");
var dbConn = require("./../../config/db.config");
const { log } = require("async");

//object create
var geotagging_checkin = function (checkin) {
    this.employee_id = checkin.employee_id;
    
      this.full_address = checkin.full_address;
      
        this.state_name = checkin.state_name;
        
          this.city_name = checkin.city_name;
          this.latitude = checkin.latitude;
          this.longitude = checkin.longitude;
          this.distance=checkin.distance;
          this.checkIn_Datetime=checkin.checkIn_Datetime;
          this.checkOut_Datetime=checkin.checkOut_Datetime;
          this.Active=checkin.Active;
          this.hours=checkin.hours;
          this.created_date=new Date();
          this.created_by=checkin.created_by
          this.Ischecked_in = checkin.Ischecked_in;
  this.company_id = checkin.company_id;
  this.updated_by=checkin.updated_by;
  this.Ischecked_out=checkin.Ischecked_out;
  
};

geotagging_checkin.create = function (checkin, result) {
  
  let sql = "call hrms.sp_user_geotagging_checkin_add(?,?,? ,? ,? ,?,?,?, ?,?,?,?, ?,?);"
  console.log(checkin);
  var values =[checkin.employee_id,checkin.full_address,checkin.state_name,checkin.city_name,checkin.latitude,checkin.longitude,checkin.distance,checkin.checkIn_Datetime,checkin.hours,checkin.Active,new Date(),checkin.created_by,checkin.Ischecked_in,checkin.company_id];
  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("id", res);
      result(null, res);
    }
  });
};

geotagging_checkin.update = function (checkout, result) {
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"


  let sql = "call hrms.sp_user_geotagging_checkout_update(?,?, ?, ?, ?, ?);"
  console.log(checkout.employee_id,checkout.company_id,checkout.checkOut_Datetime,checkout.Ischecked_out,currentDate,checkout.updated_by);
  var values =[checkout.employee_id,checkout.company_id,checkout.checkOut_Datetime,checkout.Ischecked_out,currentDate,checkout.updated_by];
  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("id", res);
      result(null, res);
    }
  });
};
module.exports = geotagging_checkin;
