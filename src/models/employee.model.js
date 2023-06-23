"user strict";
const { log } = require("async");
const bcrypt = require("bcryptjs");
var dbConn = require("./../../config/db.config");

//Employee object create
var Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.employee_id = employee.employee_id;
  this.date_of_birth = employee.date_of_birth;
  this.marital_status_id = employee.marital_status_id;
  this.job_type_id = employee.job_type_id;
  this.employee_status_id = employee.employee_status_id;
  this.work_location_id = employee.work_location_id;
  this.date_of_joining = employee.date_of_joining;
  this.experience_designation = employee.experience_designation;
  this.gender = employee.gender;
  this.phone = employee.phone;
  this.designation_id = employee.designation_id;
  this.salary = employee.salary;
  this.total_experience = employee.total_experience;
  this.official_email = employee.official_email;
  this.source_of_hire_id = employee.source_of_hire_id;
  this.tentative_joining_date = employee.tentative_joining_date;
  this.skill_set = employee.skill_set;
  this.highest_qualification = employee.highest_qualification;
  this.additional_information = employee.additional_information;
  this.password = employee.password;
  this.reporting_manager_id = employee.reporting_manager_id;
  this.company_id = employee.company_id;
  this.role_id = employee.role_id;
  this.department_id = employee.department_id;
  this.is_active = employee.is_active;
  this.created_by = employee.created_by;
  this.updated_by = employee.updated_by;
};

Employee.create = function (
  newEmp,
  address,
  pAddress,
  education,
  experience,
  In_caseof_emergency,
  geolocation,
  result
) {
  let addressValues = [];
  let p_addressValues = [];
    let In_caseof_emergencyValues = [];
    let geolocationValues = [];

  addressValues.push(
    address.country_id,
    address.state_id,
    address.city_id,
    address.pin_code,
    address.street_address,
    address.same_as_present_address,
    newEmp.company_id,
    newEmp.employee_id,
    newEmp.created_by
  );

  // console.log("addressValues", addressValues);

  p_addressValues.push(
    pAddress.pCountry_id,
    pAddress.pState_id,
    pAddress.pCity_id,
    pAddress.pPin_code,
    pAddress.pStreet_address,
    pAddress.same_as_present_address,
    newEmp.company_id,
    newEmp.employee_id,
    newEmp.created_by
  );


  // console.log("p_addressValues", p_addressValues);



  In_caseof_emergencyValues.push(
    newEmp.company_id,
    newEmp.employee_id,
    In_caseof_emergency.name,
    In_caseof_emergency.phone,
    In_caseof_emergency.email,
    In_caseof_emergency.relation,
    In_caseof_emergency.country_id,
    In_caseof_emergency.state_id,
    In_caseof_emergency.city_id,
    In_caseof_emergency.street_address,
    In_caseof_emergency.pin_code,
    newEmp.created_by
  )

  // console.log("In_caseof_emergencyValues",In_caseof_emergencyValues);
  
      geolocationValues.push(
        newEmp.company_id,
        newEmp.employee_id,
        geolocation.full_address,
        geolocation.country_id,
        geolocation.state_id,
        geolocation.city_id,
        geolocation.latitude,
        geolocation.longitude,
        geolocation.distance,
        newEmp.created_by

       );
    

  let sp_emp =
    "call hrms_new.hrms_sp_create_employee(?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

  dbConn.query(
    sp_emp,
    [
      newEmp.company_id,
      newEmp.employee_id,
      newEmp.first_name,
      newEmp.last_name,
      newEmp.email,
      newEmp.phone,
      newEmp.official_email,
      newEmp.password,
      newEmp.date_of_birth,
      newEmp.source_of_hire_id,
      newEmp.skill_set,
      newEmp.total_experience,
      newEmp.salary,
      newEmp.additional_information,
      newEmp.highest_qualification,
      newEmp.tentative_joining_date,
      newEmp.gender,
      newEmp.experience_designation,
      newEmp.marital_status_id,
      newEmp.job_type_id,
      newEmp.work_location_id,
      newEmp.date_of_joining,
      newEmp.reporting_manager_id,
      newEmp.designation_id,
      newEmp.department_id,
      newEmp.role_id,
      newEmp.employee_status_id,
      newEmp.created_by,
    ],
    function (err, res) {
      if (err) throw err;
      else {
        console.log("EMP of records inserted: " + res[0][0].response);

        if (res[0][0].response === "success") {
          let sp_emp_address =
            "call hrms_new.hrms_sp_create_employee_address(?, ?, ?,?, ?, ?,?, ?, ?);";
          // console.log("after",addressValues,[addressValues.length]);

          dbConn.query(sp_emp_address, addressValues, function (err, res) {
            if (err) throw err;
            else {
              console.log("address of records inserted: " + res[0][0].response);
              //   console.log(p_addressValues);
              dbConn.query(
                sp_emp_address,
                p_addressValues,
                function (err, res) {
                  if (err) throw err;
                  else {
                    console.log(
                      "permanent address of records inserted: " +
                        res[0][0].response
                    );

                    let sp_education =
                      "call hrms_new.hrms_sp_create_education(?, ?, ?, ?, ?, ?, ?);";
console.log("education.length",education.length);
                    for (let i = 0; i < education.length; i++) {
                      let educationValues = [
                        education[i].institute_name,
                        education[i].degree,
                        education[i].date_of_completion,
                        education[i].field_of_study,
                        newEmp.company_id,
                        newEmp.employee_id,
                        newEmp.created_by,
                      ];

                      // console.log(educationValues);
                      dbConn.query(
                        sp_education,
                        educationValues,
                        function (err, res) {
                          if (err) throw err;
                          else {
                            console.log(
                              "Education of records inserted: " +
                                res[0][0].response
                            );


                          }
                          });
                          }

                            let sp_experience =
                              "call hrms_new.hrms_sp_create_experience(?, ?, ?, ?, ?, ?,?,?,?);";
console.log( " experience.length",experience.length);
                            for (let i = 0; i < experience.length; i++) {
                              let experienceValues = [
                                experience[i].occupation,
                                experience[i].company,
                                experience[i].from_date,
                                experience[i].to_date,
                                experience[i].duration,
                                experience[i].currently_work_here,
                                newEmp.company_id,
                                newEmp.employee_id,
                                newEmp.created_by,
                              ];

                              dbConn.query(
                                sp_experience,
                                experienceValues,
                                function (err, res) {
                                  if (err) throw err;
                                  else {
                                    console.log(
                                      "Experience of records inserted: " +
                                        res[0][0].response
                                    );




                                  }
                                }
                              );
                            }

                            let sp_In_caseof_emergency="call hrms_new.hrms_sp_create_employee_poc_incaseof_emergency(?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,?);"
                            dbConn.query(sp_In_caseof_emergency, In_caseof_emergencyValues, function (err, res) {
                              if (err) throw err;
                              else {
                                console.log("In_caseof_emergency of records inserted: " + res[0][0].response);
                               
                              dbConn.query(
                "call hrms_new.hrms_sp_create_geo_locations(?,?,?, ?, ?, ?, ?, ?,?,?); ",
                geolocationValues,
                function (err, res) {
                  if (err) throw err;
                  else{
                  console.log(
                    "geolocation of records inserted: " + res[0][0].response
                  );}
                }
              );
            }})
                  }
                }
              );
            }

          });
        }

        result(null, res);
        
      }
    }
  );
};

Employee.findById = function (id, result) {
  //     Select * from employees where email = ?
  dbConn.query(
    "Select * from employees where email = ?",
    id,
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

Employee.findByTableId = function (id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getEmployeeById(?);",
    id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Employee.findByEmpId = function (company_id, employee_id, result) {
  console.log("company_id,employee_id", company_id, employee_id);
  dbConn.query(
    "call hrms.sp_getEmp_byEmpId(?, ?)",
    [company_id, employee_id],
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

Employee.findByIdCid = function (email, company_id, result) {
  dbConn.query(
    "call hrms.sp_employeedetails_getdata(?,?);",
    [email, company_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("res..", res);
        result(null, res);
      }
    }
  );
};
Employee.findAll = function (company_id, result) {
  dbConn.query(
    "call hrms_new.hrms_sp_getEmployees(?)",
    company_id,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

Employee.delete = function (company_id,employee_id, result) {
  let del_emp = `call hrms_new.hrms_sp_delete_employee(?,?);  `;

  dbConn.query(del_emp, [company_id,employee_id], function (err, res) {
    if (err) {
      result(null, err);
    } else {
      // console.log("model", res);
      result(null, res);
    }
  });
};

Employee.Interviewer = function (result) {
  dbConn.query(
    "SELECT first_name, last_name FROM employees",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log(" employees: ", res);
        result(null, res);
      }
    }
  );
};

Employee.update = async function (
  param_company_id,
  param_email,
  newEmp,
  education,
  experience,
  address,
  pAddress,
  geolocation,
  result
) {
  let username = newEmp.first_name + " " + newEmp.last_name;
  const password = await bcrypt.hash(newEmp.password, 12);
  const confirm_password = await bcrypt.hash(newEmp.password, 12);

  console.log("newEmp", param_company_id, param_email, newEmp);
  let educationValues = [];
  let experienceValues = [];
  let addressValues = [];
  let p_addressValues = [];
  let geolocationValues = [];
  // let docsValues = [];
  console.log("lennnnnnn", education.length);
  for (let i = 0; i < education.length; i++) {
    educationValues.push([
      education[i].edu_id, //multiple field exist so need id to update
      education[i].institute_name,
      education[i].degree,
      education[i].date_of_completion,
      education[i].field_of_study,
      newEmp.email,
      newEmp.company_id,
      newEmp.employee_id,
    ]);
  }
  console.log("educationValues", educationValues);
  for (let i = 0; i < experience.length; i++) {
    experienceValues.push([
      experience[i].id,
      experience[i].occupation,
      experience[i].company,
      experience[i].fromDate,
      experience[i].toDate,
      experience[i].duration,
      experience[i].currently_work_here,
      newEmp.email,
      newEmp.company_id,
      newEmp.employee_id,
    ]);
  }
  console.log("experienceValues", experienceValues);
  for (let i = 0; i < address.length; i++) {
    addressValues.push([
      address[i].country,
      address[i].state,
      address[i].city,
      address[i].pin_code,
      address[i].street_address,
      address[i].address_type,
      address[i].same_as_current_address,
      newEmp.email,
      newEmp.company_id,
      newEmp.employee_id,
    ]);
  }

  console.log("addressValues", addressValues);
  for (let i = 0; i < pAddress.length; i++) {
    p_addressValues.push([
      pAddress[i].pCountry,
      pAddress[i].pState,
      pAddress[i].pCity,
      pAddress[i].pPin_code,
      pAddress[i].pStreet_address,

      pAddress[i].address_type,
      pAddress[i].same_as_current_address,
      newEmp.email,
      newEmp.company_id,
      newEmp.employee_id,
    ]);
  }

  console.log("p_addressValues", p_addressValues);

  for (let i = 0; i < geolocation.length; i++) {
    geolocationValues.push([
      newEmp.employee_id,
      geolocation[i].full_address,
      geolocation[i].country,
      geolocation[i].state_name,
      geolocation[i].city_name,
      geolocation[i].latitude,
      geolocation[i].longitude,
      geolocation[i].distance,
      newEmp.company_id,
      newEmp.email,
      //    geolocation[i].Active,
      1,
      new Date(),
      geolocation[i].updated_by,
    ]);
  }

  console.log("geolocationValues", geolocationValues);

  let modified_time = new Date();

  //dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=?, total_experience=?,additional_information=? WHERE email= ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, employee.total_experience, employee.additional_information, email],
  let sp_emp_update =
    "call hrms.sp_updateEmp_employees(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,?,?);";

  dbConn.query(
    sp_emp_update,
    [
      newEmp.first_name,
      newEmp.last_name,
      param_email,
      newEmp.email,
      newEmp.employee_id,
      newEmp.Date_of_Birth,
      newEmp.marital_status,
      newEmp.job_type,
      newEmp.employee_status,
      newEmp.work_location,
      newEmp.Date_of_joining,
      newEmp.Title,
      newEmp.gender,
      newEmp.phone,
      newEmp.organization,
      newEmp.designation,
      newEmp.salary,
      newEmp.total_experience,
      newEmp.official_email,
      newEmp.source_of_hire,
      newEmp.tentative_joining_date,
      newEmp.skill_set,
      newEmp.highest_qualification,
      newEmp.additional_information,
      newEmp.password,
      newEmp.reporting_manager,
      param_company_id,
      newEmp.status,
      newEmp.role_id,
      newEmp.created_at,
      newEmp.department,
      username,
      modified_time,
    ],

    function (err, res) {
      if (err) throw err;

      console.log("EMP of records updated: " + res.affectedRows);
      console.log("edu len", education.length);
      for (let i = 0; i < education.length; i++) {
        console.log(educationValues);
        dbConn.query(
          "call hrms.sp_update_tbl_education(?,?,?,?,?,?,?,?);",
          [
            education[i].edu_id,
            education[i].institute_name,
            education[i].degree,
            education[i].date_of_completion,
            education[i].field_of_study,
            newEmp.email,
            param_company_id,
            param_email,
          ],
          function (err, res) {
            if (err) throw err;
            console.log("edu.........", res[0][0].response);

            if (res[0][0].response === "fail") {
              let educationValues = [];
              let id;
              educationValues.push([
                id,
                education[i].institute_name,
                education[i].degree,
                education[i].date_of_completion,
                education[i].field_of_study,
                newEmp.email,
                newEmp.company_id,
                newEmp.employee_id,
              ]);

              dbConn.query(
                "INSERT INTO education VALUES ?",
                [educationValues],
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "Education of records inserted: " + res.affectedRows
                  );
                }
              );
            }
            console.log("Education of records updated: " + res[0][0].response);
          }
        );
      }

      console.log("len", experience.length);
      for (let i = 0; i < experience.length; i++) {
        dbConn.query(
          "call hrms.sp_update_tbl_experience(?,?,?,?,?,?,?,?,?,?);",
          [
            experience[i].id,
            experience[i].occupation,
            experience[i].company,
            experience[i].fromDate,
            experience[i].toDate,
            experience[i].duration,
            experience[i].currently_work_here,
            newEmp.email,
            param_company_id,
            param_email,
          ],
          function (err, res) {
            if (err) throw err;
            console.log("experience.........", res[0][0].response);
            if (res[0][0].response === "fail") {
              let experienceValues = [];
              let id;
              experienceValues.push([
                id,
                experience[i].occupation,
                experience[i].company,
                experience[i].fromDate,
                experience[i].toDate,
                experience[i].duration,
                newEmp.email,

                experience[i].currently_work_here,
                newEmp.company_id,
                newEmp.employee_id,
              ]);

              dbConn.query(
                "INSERT INTO experience VALUES ?",
                [experienceValues],
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "experience of records inserted: " + res.affectedRows
                  );
                }
              );
            }
            console.log("exp of records updated: " + res[0][0].response);
            //else
          }
        );
      }

      for (let i = 0; i < address.length; i++) {
        dbConn.query(
          "call hrms.sp_update_tbl_employee_address_present(?, ?, ?, ?, ?,?, ?, ?, ?);",
          [
            address[i].country,
            address[i].state,
            address[i].city,
            address[i].pin_code,
            address[i].street_address,
            address[i].same_as_current_address,
            newEmp.email,
            param_company_id,
            param_email,
          ],
          function (err, res) {
            if (err) throw err;
            if (res[0][0].response === "fail") {
              let addressValues = [];
              let id;
              addressValues.push([
                id,
                address[i].country,
                address[i].state,
                address[i].city,
                address[i].pin_code,
                address[i].street_address,
                newEmp.email,
                address[i].address_type,
                address[i].same_as_current_address,
                newEmp.company_id,
                newEmp.employee_id,
              ]);

              dbConn.query(
                "INSERT INTO employee_address VALUES ?",
                [addressValues],
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "present address of records inserted: " + res.affectedRows
                  );
                }
              );
            }
            console.log(
              "present address of records updated: " + res[0][0].response
            );
          }
        );
      }

      for (let i = 0; i < pAddress.length; i++) {
        dbConn.query(
          "call hrms.sp_update_tbl_employee_address1_permanent(?, ?, ?,?, ?, ?, ?, ?, ?);",
          [
            pAddress[i].pCountry,
            pAddress[i].pState,
            pAddress[i].pCity,
            pAddress[i].pPin_code,
            pAddress[i].pStreet_address,
            pAddress[i].same_as_current_address,
            newEmp.email,
            param_company_id,
            param_email,
          ],
          function (err, res) {
            if (err) throw err;
            if (res[0][0].response === "fail") {
              let p_addressValues = [];
              let id;

              p_addressValues.push([
                id,
                pAddress[i].pCountry,
                pAddress[i].pState,
                pAddress[i].pCity,
                pAddress[i].pPin_code,
                pAddress[i].pStreet_address,
                newEmp.email,
                pAddress[i].address_type,
                pAddress[i].same_as_current_address,
                newEmp.company_id,
                newEmp.employee_id,
              ]);

              dbConn.query(
                "INSERT INTO employee_address VALUES ?",
                [p_addressValues],
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "permanent address of records inserted: " + res.affectedRows
                  );
                }
              );
            }
            console.log(
              "permanent address of records updated: " + res[0][0].response
            );
          }
        );

        for (let i = 0; i < geolocation.length; i++) {}
        console.log([
          geolocation[i].full_address,
          geolocation[i].country,
          geolocation[i].state_name,
          geolocation[i].city_name,
          geolocation[i].latitude,
          geolocation[i].longitude,
          geolocation[i].distance,
          newEmp.email,
          1,
          new Date(),
          geolocation[i].updated_by,
          param_company_id,
          param_email,
        ]);
        dbConn.query(
          "call hrms.sp_update_geolocation(?,?,?, ?, ?, ?,?,?, ?,?,?,?,?)",
          [
            geolocation[i].full_address,
            geolocation[i].country,
            geolocation[i].state_name,
            geolocation[i].city_name,
            geolocation[i].latitude,
            geolocation[i].longitude,
            geolocation[i].distance,
            newEmp.email,
            1,
            param_company_id,
            param_email,
            geolocation[i].updated_by,
            new Date(),
          ],
          function (err, res) {
            if (err) throw err;
            if (res[0][0].response === "fail") {
              let geolocationValues = [];
              let UserLocation_Id;
              geolocationValues.push([
                UserLocation_Id,
                newEmp.employee_id,
                geolocation[i].full_address,
                geolocation[i].country,
                geolocation[i].state_name,
                geolocation[i].city_name,
                geolocation[i].latitude,
                geolocation[i].longitude,
                geolocation[i].distance,
                newEmp.company_id,
                newEmp.email,
                //    geolocation[i].Active,
                1,
                new Date(),
                geolocation[i].updated_by,
                new Date(),
                geolocation[i].updated_by,
              ]);

              dbConn.query(
                "INSERT INTO tbl_geo_locations VALUES ?",
                [geolocationValues],
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "geolocation records inserted: " + res.affectedRows
                  );
                }
              );
            }
            console.log(
              "geolocation of records updated: " + res[0][0].response
            );
          }
        );
      }

      // console.log("check")

      //onboarding tbl update

      let sp_user_update =
        "call hrms.update_onboardingtbl_byemail(?,?,?,?,?,?,?,?,?,?);";

      // console.log("onboarding.........",username,param_email,newEmp.role_id,password,confirm_password,newEmp.official_email,newEmp.phone,newEmp.email,newEmp.employee_id,param_company_id,username,modified_time)
      dbConn.query(sp_user_update, [
        username,
        param_email,
        password,
        confirm_password,
        newEmp.official_email,
        newEmp.phone,
        newEmp.email,
        param_company_id,
        username,
        modified_time,
      ]);

      //attachment tbl update

      let sp_user_attachment =
        "call hrms.update_documents_byemail(?, ?, ?, ?, ?, ?, ?);";

      console.log(
        "attachment.........",
        param_email,
        newEmp.email,
        param_company_id,
        newEmp.employee_id,
        newEmp.role_id,
        username,
        modified_time
      );
      dbConn.query(sp_user_attachment, [
        param_email,
        newEmp.email,
        param_company_id,
        newEmp.employee_id,
        newEmp.role_id,
        username,
        modified_time,
      ]);

      //notes tbl update

      let sp_user_notes =
        "call hrms.update_notes_byemail(?, ?, ?, ?,? , ?, ?);";

      console.log(
        "notes.........",
        param_email,
        newEmp.email,
        param_company_id,
        newEmp.employee_id,
        newEmp.role_id,
        username,
        modified_time
      );
      dbConn.query(sp_user_notes, [
        param_email,
        newEmp.email,
        param_company_id,
        newEmp.employee_id,
        newEmp.role_id,
        username,
        modified_time,
      ]);

      result(null, res);
    }
  );
};

//employee update by emp id and company id 20 june
Employee.updateEmployee = async function (id, newEmp, result) {
  console.log(newEmp.employee_status_id);
  let sp_emp_update =
    "call hrms_new.hrms_sp_update_employee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,? , ?, ?, ?, ?, ?, ?, ?, ?,?)    ;";
  console.log(newEmp.marital_status_id);
  console.log(newEmp.updated_by);
  dbConn.query(
    sp_emp_update,
    [
      id,
      newEmp.employee_id,
      newEmp.first_name,
      newEmp.last_name,
      newEmp.email,
      newEmp.phone,
      newEmp.official_email,
      newEmp.password,
      newEmp.date_of_birth,
      newEmp.source_of_hire_id,
      newEmp.skill_set,
      newEmp.total_experience,
      newEmp.salary,
      newEmp.additional_information,
      newEmp.highest_qualification,
      newEmp.tentative_joining_date,
      newEmp.gender,
      newEmp.experience_designation,
      newEmp.marital_status_id,
      newEmp.job_type_id,
      newEmp.work_location_id,
      newEmp.date_of_joining,
      newEmp.reporting_manager_id,
      newEmp.designation_id,
      newEmp.department_id,
      newEmp.role_id,
      newEmp.employee_status_id,
      newEmp.updated_by,
    ],
    function (err, res) {
      if (err) throw err;
      else {
        console.log("EMP of records updated: " + res[0][0].response);
        result(null, res);
      }
    }
  );
};

Employee.updateAfterPreonBoarding = function (email, Details, result) {
  dbConn.query(
    "UPDATE employees SET employee_id=?,official_email=?,password=?,modified_time=?,age=?,gender=?,Title=?,Date_of_joining=?,work_location=?,employee_role=?,marital_status=?,job_type=?,employee_status=?,reporting_manager=? where email=?",
    [
      Details.employee_id,
      Details.official_email,
      Details.password,
      Details.modified_time,
      Details.age,
      Details.gender,
      Details.Title,
      Details.Date_of_joining,
      Details.work_location,
      Details.employee_role,
      Details.marital_status,
      Details.job_type,
      Details.employee_status,
      Details.reporting_manager,
      email,
    ],
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

Employee.findEmployeeByEmployeeId = function (company_id, employee_id, result) {
  dbConn.query(
    "call hrms.sp_getAllDetailsbyemp_id_employee(?,?);",
    [employee_id, company_id],
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
Employee.SearchEmployeeByEmployeeIdAndName = function (
  company_id,
  employee_id,
  first_name,
  last_name,
  result
) {
  dbConn.query(
    "Select * from employees where company_id=? OR employee_id = ? OR first_name=? OR last_name=? ",
    [company_id, employee_id, first_name, last_name],
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

Employee.SearchAllEmployeeByEmployeeIdAndName = function (
  company_id,
  employee_id,
  first_name,
  last_name,
  result
) {
  dbConn.query(
    "Select * from employees where company_id=?",
    [company_id, employee_id, first_name, last_name],
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

Employee.findByreport_manager = function (reporting_manager, result) {
  dbConn.query(
    "SELECT Distinct(reporting_manager) FROM employees",
    reporting_manager,
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

module.exports = Employee;
