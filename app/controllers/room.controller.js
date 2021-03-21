
const Room = require("../models/room.model");
exports.create = (req, res) => {
    // Validate request
    console.log("create 1111");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("create 2222 ," ,req.body);
    
    // Create a room
    const room = new Room({
      maphong:req.body.maphong,
      loaiphong:req.body.loaiphong,
      dientich:req.body.dientich,
      dongia:req.body.dongia,
      anh:req.body.anh,
    });

    // console.log("create 3333");
  
    // Save room in the database
    Room.create(room, (err, data) => {
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
    Room.getAll((err, data) => {
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
    Room.findById(req.params.phongId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found room with id ${req.params.phongId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving room with id " + req.params.phongId
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
  
    Room.updateById(
      req.params.phongId,
      new Room(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Room with id ${req.params.phongId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating room with id " + req.params.phongId
            });
          }
        } else res.send(data);
      }
    );
  };
//   Delete an object
exports.delete = (req, res) => {
    Room.remove(req.params.phongId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found room with id ${req.params.phongId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete room with id " + req.params.phongId
          });
        }
      } else res.send({ message: `Room was deleted successfully!` });
    });
  };
//   Delete all objects
exports.deleteAll = (req, res) => {
    Room.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All room were deleted successfully!` });
    });
  };