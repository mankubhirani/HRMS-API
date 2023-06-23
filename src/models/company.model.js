"user strict";
const { log } = require("async");
var dbConn = require("./../../config/db.config");

//Company object create
var Company = function (company) {
  this.company_id = company.company_id;
  this.company_name = company.company_name;
  this.company_email = company.company_email;
  this.company_website = company.company_website;
  this.industry_id = company.industry_id;
  this.no_of_emp_id = company.no_of_emp_id;
  this.company_applicable_tax = company.company_applicable_tax;
  this.tax_information = company.tax_information;
  this.company_logo_path = company.company_logo_path;
  this.country_id = company.country_id;
  this.state_id = company.state_id;
  this.city_id = company.city_id;
  this.pin_code = company.pin_code;
  this.street_address = company.street_address;
  this.is_active = company.is_active;
  this.created_by = company.created_by;
  this.created_date = new Date();
  this.updated_by = company.updated_by;
  this.updated_date = new Date();
};

Company.create = function (c, login_email, result) {
  let company_website = c.company_website;
  // Create a new URL object with the website URL
  let url = new URL(company_website);
  console.log(url.hostname);
  // Get the domain name from the URL object
  let domain = url.hostname.replace("www.", "");

  console.log(domain);
  console.log("model....",login_email);

  dbConn.query(
    "call hrms_new.hrms_sp_create_company(?,?, ?, ?, ?, ?, ?);",
    [
      "@" + domain, //company_id
      c.company_name,
      c.company_email,
      c.company_website,
      c.industry_id,
      c.no_of_emp_id,
      login_email,
    ],
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
Company.findById = function (company_id, result) {
  var sql = `call hrms_new.hrms_sp_getCompany_byCid(?);`;
  dbConn.query(sql, company_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res[0][0]);
    }
  });
};

Company.companyDomain = function (company_domain, result) {
  var sql = `call hrms.check_company_domain(?);`;
  dbConn.query(sql, company_domain, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res[0][0]);
    }
  });
};

Company.findByDomain = function (company_domain, result) {
  console.log("model", company_domain);
  var sql = "SELECT * FROM company WHERE company_domain = ?";
  console.log("model", sql);

  dbConn.query(sql, company_domain, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Company.findBySearch = function (params, result) {
  let company_email = params.company_email;
  let company_id = params.company_id;
  let company_name = params.company_name;
  var sql =
    "SELECT * FROM company WHERE company_email = ? OR company_id = ? OR company_name = ?";
  dbConn.query(
    sql,
    [company_email, company_id, company_name],
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
Company.findAll = function (result) {
  dbConn.query("Select * from company", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("company : ", res);
      result(null, res);
    }
  });
};

Company.update = function (param_company_id, c, result) {
  // var k = Object.values(c)
  // let sql=";

  let company_website = c.company_website;
  // Create a new URL object with the website URL
  let url = new URL(company_website);
  console.log(url.hostname);
  // Get the domain name from the URL object
  let domain = url.hostname.replace("www.", "");

  console.log(domain);

  dbConn.query(
    "call hrms_new.hrms_sp_update_company(?,?,?,?,?,?,? ,?,?,?,? ,? ,? ,?,?,? ,?);",
    [
      param_company_id,
      "@" + domain, //company_id
      c.company_name,
      c.company_email,
      c.company_website,
      c.industry_id,
      c.no_of_emp_id,
      c.company_applicable_tax,
      c.tax_information,
      c.company_logo_path,
      // req.file.path, // Get the path of the uploaded file
      c.country_id,
      c.state_id,
      c.city_id,
      c.pin_code,
      c.street_address,
      c.is_active,
      c.updated_by,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res[0][0]);
      }
    }
  );
};
Company.delete = function (company_id, result) {
  dbConn.query(
    "DELETE FROM company WHERE company_id = ?",
    [company_id],
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

module.exports = Company;
