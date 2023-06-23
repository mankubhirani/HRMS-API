const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const dbConn = require("../../config/db.config").promise();

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    let email = req.body.email;
    let new_email = email.split("@");
    let email_domain = new_email[1];

 //   console.log(req.body.email, email_domain);
    const [row] = await dbConn.execute(
      "call hrms_new.hrms_sp_company_poc_login(?,?);",

      [req.body.email, email_domain]
    );

    const theToken = jwt.sign({ id: row[0].id }, "the-super-strong-secrect", {
      expiresIn: "1h",
    });

  //  console.log(row[1][0].response);
if (
  req.body.password === row[0][0].password &&
  row[1][0].response === "success1"
) {
  delete row[0][0].password;
  return res.json({
    success: true,
    data: row[0][0],
    message: "Employee Login Successfully",
    token: theToken,
    domain_exist: false,
  });
} 

   else if (
      req.body.password === row[0][0].password &&
      row[2][0].response === "success"
    ) {
      delete row[0][0].password;
      return res.json({
        success: true,
        data: row[0][0],
        company_id: row[1][0].company_id,
        role_id: row[1][0].role_id,
        role: row[1][0].role,
        employee_id: row[1][0].employee_id,
        message: "Employee Login Successfully",
        token: theToken,
        domain_exist: true,
      });
    }
     else if (row[0][0].response === "fail") {
      return res.status(422).json({
       // data:row[0][0].response,
        success: false,
        error: true,
        message: "User does not exist!",
      });
    } else {
      return res.status(422).json({
        status: false,
        error: true,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    next(err);
  }
};
