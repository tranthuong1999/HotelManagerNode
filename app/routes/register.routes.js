module.exports = app => {
    const register = require("../controllers/register.controller.js");
  
    // Create a new Customer
    app.post("/dangkiphong", register.create);
    // Retrieve all room
    app.get("/dangkiphong", register.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/dangkiphong/:registerId", register.findOne);
  
    // Update a Customer with customerId
    app.put("/dangkiphong/:registerId", register.update);
  
    // Delete a Customer with customerId
    app.delete("/dangkiphong/:registerId", register.delete);
  
    // Create a new Customer
    app.delete("/dangkiphong", register.deleteAll);
  };