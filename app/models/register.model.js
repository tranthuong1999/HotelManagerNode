const connection = require("./db.js");

const Register = function(register) {
            this.ten=register.ten;
            this.sdt=register.sdt;
            this.cmnd=register.cmnd;
            this.diachi=register.diachi;
            this.sophong=register.sophong;
            this.idphong=register.idphong;
            this.sotien=register.sotien;
            this.dongia=register.dongia;
           
};
Register.create = (newRegister, result) => {
  // console.log('newCustomer:', newCustomer);
  const queryInsert = `INSERT INTO dangkiphong (ten,sdt,cmnd,diachi,sophong,idphong,sotien,dongia) 
  VALUES ('${newRegister.ten}', '${newRegister.sdt}','${newRegister.cmnd}',
  '${newRegister.diachi}','${newRegister.sophong}',
  '${newRegister.idphong}','${newRegister.sotien}','${newRegister.dongia}')`
  connection.query(queryInsert, function (err, res) {
    if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
    }
    console.log("1 record inserted",res);
    result(null, { id: res.insertId, ...newRegister });

  });
};

  // tim nhan vien bang id
  Register.findById = (registerId, result) => {
  connection.query(`SELECT * FROM dangkiphong WHERE id = ${registerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found register: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Register.getAll = result => {
  connection.query("SELECT * FROM dangkiphong", (err, res) => {
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

Register.updateById = (id, register, result) => {
  connection.query(
    "UPDATE dangkiphong SET ten =?, sdt =?, cmnd =?, diachi=? ,idphong =?,sotien =? ,dongia =? WHERE id = ?",
    [register.tennv, register.sdt,register.cmnd,
      register.diachi,register.idphong,register.sotien,register.dongia,id],
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

      console.log("updated customer: ", { id: id, ...register });
      result(null, { id: id, ...register });
    }
  );
};
// remove nhanvien

Register.remove = (id, result) => {
  connection.query("DELETE FROM dangkiphong WHERE id = ?", id, (err, res) => {
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

Register.removeAll = result => {
  connection.query("DELETE FROM dangkiphong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} registers`);
    result(null, res);
  });
};

module.exports = Register;
