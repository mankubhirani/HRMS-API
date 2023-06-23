"use strict";

const Company = require("../models/company.model");
const companyController = require("../routes/company.routes");

exports.findAll = function (req, res) {
  Company.findAll(function (err, company) {
    console.log("---Company controller---");
    console.log("Company Request", req);
    if (err) res.send(err);
    console.log("res", company);
    res.send(company);
  });
};

exports.create = function (req, res) {
  const new_company = new Company(req.body);
  const login_email = req.body.email;
 // console.log("email",login_email);
  Company.create(new_company, login_email, function (err, company) {
    if (err) res.send(err);
    else if (company[0][0].response === "fail") {
      return res
        .status(422)
        .json({
          success: false,
          error: true,
          message: "This company name already exist!",
        });
    } else if (company[0][0].response === "fail1") {
      return res
        .status(422)
        .json({
          success: false,
          error: true,
          message: "This company email already exist!",
        });
    } else if (company[0][0].response === "fail2") {
      return res
        .status(422)
        .json({
          
          success: false,
          error: true,
          message: "This company domain already exist!",
        });
    } else if (company[0][0].response === "fail3") {
      return res
        .status(422)
        .json({
          success: false,
          error: true,
          message: "This Website url already exist!",
        });
    }
     else
    {
     
     
    return res.json({
data:company[1][0],
      company_id: company[2][0].company_id,
      role_id: company[2][0].role_id,
      role: company[2][0].role,
      success: true,
      error: false,
      message: "company details added successfully!",
    });
  }
  });
};

exports.findById = function (req, res) {
  Company.findById(req.params.company_id, function (err, company) {
    if (err) return res.send(err);
    else if (company.response === "fail") {
      return res
        .status(422)
        .json({
          success: false,
          error: true,
          message: "This company doesn't exist!",
        });
    } else
      return res.json({
        data: company,
        success: true,
        error: false,
        message: "company details fetched successfully!",
      });
  });
};

exports.companyDomain = function (req, res) {
  Company.companyDomain(req.params.company_domain, function (err, company) {
    if (err) res.send(err);
   // console.log(company.response);
    if (company.response === "fail") {
      return res
        .status(422)
        .json({
          data: company,
          message: "This domain already exist, Please contact your admin",
        });
    }
    if (company.response === "success") {
      return res.json({
        data: company,
        message: "This domain does not exist.",
      });
    }
  });
};

exports.findByDomain = function (req, res) {
  //console.log("param", req.params.company_domain);
  Company.findByDomain(req.params.company_domain, function (err, company) {
    if (err) res.send(err);
    res.json(company);
  });
};
exports.findByDomain = function (req, res) {
  Company.findByDomain(req.params.company_domain, function (err, company) {
    if (err) res.send(err);
    res.json(company);
  });
};

exports.findBySearch = function (req, res) {
  Company.findBySearch(req.body, function (err, company) {
    if (err) res.send(err);
    res.json(company);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    const {
      company_id,
      company_name,
      company_email,
      company_website,
      industry_id,
      no_of_emp_id,
      company_applicable_tax,
      tax_information,
      country_id,
      state_id,
      city_id,
      pin_code,
      street_address,
      is_active,
      updated_by,
    } = req.body;

    Company.update(
      req.params.company_id,
      {
        company_id,
        company_name,
        company_email,
        company_website,
        industry_id,
        no_of_emp_id,
        company_applicable_tax,
        tax_information,
        company_logo_path: req.file.path, // Pass req.file.path to the model
        country_id,
        state_id,
        city_id,
        pin_code,
        street_address,
        is_active,
        updated_by,
      },
      function (err, company) {
        if (err) return res.send(err);
        else if (company.response === "fail") {
          return res
            .status(422)
            .json({
              success: false,
              error: true,
              message: "This company name already exist!",
            });
        } else if (company.response === "fail1") {
          return res
            .status(422)
            .json({
              success: false,
              error: true,
              message: "This company email already exist!",
            });
        } else if (company.response === "fail2") {
          return res
            .status(422)
            .json({
              success: false,
              error: true,
              message: "This company domain already exist!",
            });
        } else if (company.response === "fail3") {
          return res
            .status(422)
            .json({
              success: false,
              error: true,
              message: "This Website url already exist!",
            });
        } else if (company.response === "success") {
          return res
            .status(200)
            .json({
              success: true,
              error: false,
              message: "Company details successfully updated!",
            });
        } else
          return res
            .status(404)
            .json({ success: false, error: true, message: "no data found!" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Company.delete(req.params.company_id, function (err, company) {
    if (err) res.send(err);
    res.json({
      company: company,
      error: false,
      message: "Company successfully deleted",
    });
  });
};
