module.exports = app => {
    const room = require("../controllers/room.controller.js");
  
    // Create a new Customer
    app.post("/phong", room.create);
    // Retrieve all room
    app.get("/phong", room.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/phong/:phongId", room.findOne);
  
    // Update a Customer with customerId
    app.put("/phong/:phongId", room.update);
  
    // Delete a Customer with customerId
    app.delete("/phong/:phongId", room.delete);
  
    // Create a new Customer
    app.delete("/phong", room.deleteAll);
  };