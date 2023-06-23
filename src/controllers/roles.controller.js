"use strict";

const Roles = require("../models/roles.model");

exports.create = function (req, res) {
  const new_roles = new Roles(req.body);

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Roles.create(new_roles, function (err, role) {
      if (err) res.send(err);
      else if (role[0][0].response === "fail")
        return res
          .status(422)
          .send({
            success: false,
            error: true,
            message: "This role already exist with this company id!",
          });
      else
        return res.json({
          success: true,
          error: false,
          message: "role details added successfully!",
        });
    });
  }
};

exports.findAll = function (req, res) {
  Roles.findByCId(req.params.company_id, function (err, role) {
    if (err) res.send(err);
    if (role[0][0].response === "fail")
      return res.json({
        error: true,
        message: "role does not exist with this company!",
      });
    else
      return res.json({
        data: role[0],
        success: true,
        error: false,
        message: "roles fetched successfully!",
        count: role[1][0].count,
      });
  });
};

exports.findbyid = function (req, res) {
  Roles.findbyid(req.params.roleid, function (err, role) {
    if (err) res.send(err);
    else if (role[0][0].response === "fail")
      return res
        .status(404)
        .send({
          success: false,
          error: true,
          message: "This role does not exist with this id!",
        });
    else
      return res.json({
        data: role[0],
        success: true,
        error: false,
        message: "role details fetched successfully!",
        count: role[1][0].count,
      });
  });
};

exports.delete = function (req, res) {
  Roles.delete(req.params.roleid, function (err, role) {
    if (err) res.send(err);
    else if (role[0][0].response === "fail")
      return res
        .status(404)
        .send({
          success: false,
          error: true,
          message: "This role does not exist with this id!",
        });
    else
      return res.json({
        success: true,
        error: false,
        message: "role details deleted successfully!",
        count: role[0][0].count,
      });
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Roles.update(req.params.roleid, new Roles(req.body), function (err, role) {
      if (err) res.send(err);
      else if (role[0][0].response === "fail") {
        return res
          .status(404)
          .send({
            success: false,
            error: true,
            message: "This role does not exist with this id!",
          });
      } else {
        return res.json({
          success: true,
          error: false,
          message: "role details updated successfully!",
        });
      }
    });
  }
};
