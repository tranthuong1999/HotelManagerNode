module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    app.post("/nhanvien", customers.create);
    // Retrieve all Customers
    app.get("/nhanvien", customers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/nhanvien/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/nhanvien/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/nhanvien/:customerId", customers.delete);
  
    // Create a new Customer
    app.delete("/nhanvien", customers.deleteAll);
  };