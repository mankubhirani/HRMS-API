const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const conn = require("../../config/db.config").promise();
var nodemailer = require("nodemailer");
const express = require("express");
const { log } = require("async");
const crypto = require("crypto");
require('dotenv').config(); // Load environment variables from .env file


const app = express();
app.use(express.json());
exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let email = req.body.email;
    let new_email = email.split("@");
 
    let email_domain = new_email[1];
    //   const hashPass = await bcrypt.hash(req.body.password,6);
    //  console.log(hashPass)
    const [rows] = await conn.execute(
      "call hrms_new.hrms_sp_company_poc_register(?, ?,?, ?, ?, ?,?);",

      [
        req.body.full_name,
        req.body.email,
        req.body.password,
        req.body.phone_no,
        req.body.is_terms_policy,
        new Date(),
        email_domain,
      ]
    );


    if (rows[0][0].response == "success") {
      //...............
      var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers: "SSLv3",
        },

        auth: {
          user: "asma.bano@cylsys.com",

pass:"Password@2"
          //pass: process.env.EMAIL_PASSWORD, // Read password from environment variabl        
        }
      });

      var mailOptions = {
        //                  from:"ab308175@gmail.com",
        //                    from:"asma.bano@cylsys.com",

        from: "asma.bano@cylsys.com",

        to: req.body.email,

        subject: "Company Login Credentials",

    
        html:
          "Hi" +
          " " +
          req.body.full_name +
          "," +
          "<br>" +
          "<br>This is your Registration details.<br>" +
          "<br>Please find the Login Credentials here:<br>" +
          "<br>Display name:" +
          " " +
          req.body.full_name +
          "<br> email id:" +
          " " +
          req.body.email +
          "<br>Password:" +
          " " +
          req.body.password +
          "<br>Phone Number:" +
          " " +
          req.body.phone_no +
          "<br><br>" +
          "Login Url:" +
          " " +
          "http://angularhrms.cylsys.com" +
          "<br>" +
          "<br>Note: " +
          " Please let me know if you require any help." +
          "<br>" +
          "<br>Best Regards,<br>" +
          "Team Cylsys"
          //<br>" +
      //    "Cylsys Software Solutions Pvt. Ltd.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email has been sent", info.response);
        }
      });
     

        //       //................
        return res.status(201).json({
          success: true,
          error: false,
          message: "Registered Successfully!",
        });
      
    } 
    else if (rows[0][0].response == "fail") {
      return res.status(422).json({
        success: false,
        error: true,
        message: "Company domain is already exist;",
      });
    } else if (rows[0][0].response == "fail2") {
      return res.status(422).json({
        success: false,
        error: true,
        message: "Mobile number is already exist;",
      });
    } else if (rows[0][0].response == "fail1") {
      return res.status(422).json({
        success: false,
        error: true,
        message: "Email is already exist;",
      });
    }
  } catch (err) {
    //

    next(err);
  }
};
