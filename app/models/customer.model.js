const connection = require("./db.js");

const Customer = function(customer) {
            this.manv=customer.manv;
            this.tennv=customer.tennv;
            this.ngaysinh=customer.ngaysinh;
            this.gioitinh=customer.gioitinh;
            this.diachi=customer.diachi;
            this.sdt=customer.sdt;
            this.cmnd=customer.cmnd;
            this.chucvu=customer.chucvu;
            this.mabophan=customer.mabophan;
            this.ngayvaolam=customer.ngayvaolam;
            this.luong=customer.luong;
};
Customer.create = (newCustomer, result) => {
  // console.log('newCustomer:', newCustomer);
  const queryInsert = `INSERT INTO nhanvien (manv,tennv,ngaysinh,gioitinh,diachi,sdt,cmnd,chucvu,mabophan,ngayvaolam,luong) 
  VALUES ('${newCustomer.manv}', '${newCustomer.tennv}','${newCustomer.ngaysinh}',
  '${newCustomer.gioitinh}','${newCustomer.diachi}','${newCustomer.sdt}','${newCustomer.cmnd}',
  '${newCustomer.chucvu}','${newCustomer.mabophan}' ,'${newCustomer.ngayvaolam}','${newCustomer.luong}')`
  connection.query(queryInsert, function (err, res) {
    if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
    }
    console.log("1 record inserted",res);
    result(null, { id: res.insertId, ...newCustomer });

  });
};

  // tim nhan vien bang id
Customer.findById = (customerId, result) => {
  connection.query(`SELECT * FROM nhanvien WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  connection.query("SELECT * FROM nhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customers: ", res);
    result(null, res);
  });
};

// update nhanvien

Customer.updateById = (id, customer, result) => {
  connection.query(
    "UPDATE nhanvien SET manv =?, tennv =?, ngaysinh =?,gioitinh =?, diachi=?,sdt=?,cmnd=?,chucvu=?,mabophan=?,ngayvaolam=?,luong=? WHERE id = ?",
    [customer.manv, customer.tennv, customer.ngaysinh,customer.gioitinh,
      customer.diachi,customer.sdt,customer.cmnd,
      customer.chucvu,customer.mabophan,customer.ngayvaolam,
      customer.luong, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};
// remove nhanvien

Customer.remove = (id, result) => {
  connection.query("DELETE FROM nhanvien WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};
//  remove all nhanvien

Customer.removeAll = result => {
  connection.query("DELETE FROM nhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
