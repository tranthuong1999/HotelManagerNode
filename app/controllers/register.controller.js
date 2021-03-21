
const Register = require("../models/register.model");
exports.create = (req, res) => {
    // Validate request
    console.log("create 1111");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("create 2222");
    // Create a register
    const register = new Register({
      ten:req.body.ten,
      sdt:req.body.sdt,
      cmnd:req.body.cmnd,
      diachi:req.body.diachi,
      sophong:req.body.sophong,
      idphong:req.body.idphong,
      sotien:req.body.sotien,
      dongia:req.body.dongia,

    });

    // console.log("create 3333");
  
    // Save register in the database
    Register.create(register, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the room."
        });
      else res.send(data);
    });
    // console.log("create 4444");
  };
//   Retrieve all objects
  exports.findAll = (req, res) => {
    Register.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving room."
        });
      else {
     
        res.send(JSON.parse(JSON.stringify(data)));
      }
    });
  };
//   Retrieve a single object
  exports.findOne = (req, res) => {
    Register.findById(req.params.registerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found room with id ${req.params.registerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving room with id " + req.params.registerId
          });
        }
      } else res.send(data);
    });
  };
//   Update an object

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Register.updateById(
      req.params.registerId,
      new Register(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Register with id ${req.params.registerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Register with id " + req.params.registerId
            });
          }
        } else res.send(data);
      }
    );
  };
//   Delete an object
exports.delete = (req, res) => {
    Register.remove(req.params.registerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found register with id ${req.params.registerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete register with id " + req.params.registerId
          });
        }
      } else res.send({ message: `register was deleted successfully!` });
    });
  };
//   Delete all objects
exports.deleteAll = (req, res) => {
    Register.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all registers."
        });
      else res.send({ message: `All room were deleted successfully!` });
    });
  };