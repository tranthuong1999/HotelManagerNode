
const Customer = require("../models/customer.model");
exports.create = (req, res) => {
    // Validate request
    console.log("create 1111");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("create 2222");
    // Create a Customer
    const customer = new Customer({
      manv: req.body.manv,
      tennv: req.body.tennv,
      ngaysinh: req.body.ngaysinh,
      gioitinh:req.body.gioitinh,
      diachi:req.body.diachi,
      sdt:req.body.sdt,
      cmnd:req.body.cmnd,
      chucvu:req.body.chucvu,
      mabophan:req.body.mabophan,
      ngayvaolam:req.body.ngayvaolam,
      luong:req.body.luong
    });

    // console.log("create 3333");
  
    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
    // console.log("create 4444");
  };
//   Retrieve all objects
  exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else {
     
        res.send(JSON.parse(JSON.stringify(data)));
      }
    });
  };
//   Retrieve a single object
  exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
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
  
    Customer.updateById(
      req.params.customerId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      }
    );
  };
//   Delete an object
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
//   Delete all objects
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };