const bigInt = require("big-integer");
var dbConn = require('./../../config/db.config');

//TimeSheet object create
var TimeSheet = function (timedata) {
    
this.employeeId = timedata.employeeId;
    this.Clients = timedata.Clients;
    this.Project = timedata.Project;
    this.Date = timedata.Date;
    this.WorkingHours = timedata.WorkingHours;

    this.Task = timedata.Task;
    this.company_id = timedata.company_id;
 this.Action=timedata.Action
    this.SubmittedHours=timedata.SubmittedHours;
this.Approval_date=new Date();
};
TimeSheet.create = function (newTimeSheet, result) {
    dbConn.query("INSERT INTO tbl_timesheet set ?", newTimeSheet, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

TimeSheet.findById = function (TimeSheetId, result) {
    dbConn.query("Select * from tbl_timesheet where TimeSheetId = ? ", TimeSheetId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

TimeSheet.findAll = function (company_id,result) {
    dbConn.query("Select * from tbl_timesheet where company_id=?",company_id,function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('timesheet : ', res);
            result(null, res);
        }
    });
};

TimeSheet.update = function (TimeSheetId, data, result) {
    // const idint = bigInt(id).value;
    dbConn.query("UPDATE tbl_timesheet SET Clients=?, Project=?, Date=?, WorkingHours=?, Task=? WHERE TimeSheetId =?",
        [data.Clients, data.Project, data.Date, data.WorkingHours, data.Task, TimeSheetId], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

TimeSheet.delete = function (TimeSheetId, result) {
    dbConn.query("DELETE FROM tbl_timesheet WHERE TimeSheetId = ?", [TimeSheetId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



TimeSheet.month = function (employeeId, result) {
    dbConn.query("select SEC_TO_TIME(sum(TIME_TO_SEC(WorkingHours))) AS TotalHours from tbl_timesheet where  MONTH(Date)= MONTH(curdate()) and  employeeId = ? ", employeeId, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

TimeSheet.findByEmpId = function (month, year, empID,company_id, result) {
    dbConn.query("Select * from tbl_timesheet where MONTH(Date) = ? AND YEAR(Date)=?  AND employeeId =? AND company_id=?",[empID,company_id,month,year],function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


TimeSheet.findBySearch = function (params, result) {
   let Project = params.Project;
    let Clients = params.Clients;
    let month = params.month;
    let year  = params.year;
    let companyID  = params.company_id;
    let employeeId = params.employeeId;
   
    // var sql = 'SELECT * FROM employees WHERE employee_id in (SELECT employeeId FROM tbl_timesheet WHERE company_id = ? AND Project = ? OR Clients = ? OR Date = ?)';
    var sql = 'call hrms.sp_timesheet_join_search(?, ?, ?, ?, ?,?);';
    dbConn.query(sql, [companyID,employeeId,Project, Clients, month,year], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};






TimeSheet.updateForApproval = function (employeeId,TimeSheetId, data, result) {
 
//     console.log(data.Approval_date, data.Action,employeeId, TimeSheetId);
    dbConn.query("UPDATE tbl_timesheet SET  Action=?, Approval_date=? WHERE employeeId =? and TimeSheetId=?",
        [ data.Action,data.Approval_date,employeeId, TimeSheetId], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

module.exports = TimeSheet;
