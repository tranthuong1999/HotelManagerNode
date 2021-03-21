const connection = require("./db.js");

const Room = function(room) {
            this.maphong=room.maphong;
            this.loaiphong=room.loaiphong;
            this.dientich=room.dientich;
            this.dongia=room.dongia;
            this.anh=room.anh;
};
Room.create = (newRoom, result) => {
  // console.log('newRoom:', newRoom);
  const queryInsert = `INSERT INTO phong (maphong,loaiphong,dientich,dongia,anh) 
  VALUES ('${newRoom.maphong}', '${newRoom.loaiphong}',
  '${newRoom.dientich}','${newRoom.dongia}','${newRoom.anh}')`
  connection.query(queryInsert, function (err, res) {
    if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
    }
    console.log("1 record inserted",res);
    result(null, { id: res.insertId, ...newRoom });

  });
};

  // tim phong bang id
Room.findById = (phongId, result) => {
  connection.query(`SELECT * FROM phong WHERE id = ${phongId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found room: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found room with the id
    result({ kind: "not_found" }, null);
  });
};

Room.getAll = result => {
  connection.query("SELECT * FROM phong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("Rooms: ", res);
    result(null, res);
  });
};

// update nhanvien

Room.updateById = (id, Room, result) => {
  connection.query(
    "UPDATE phong SET maphong =?, loaiphong =?,dientich =?,dongia=?,anh=? WHERE id = ?",
    [Room.maphong, Room.loaiphong,Room.dientich,
      Room.dongia,Room.anh,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Room with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Room: ", { id: id, ...Room });
      result(null, { id: id, ...Room });
    }
  );
};
// remove nhanvien

Room.remove = (id, result) => {
  connection.query("DELETE FROM phong WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Room with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Room with id: ", id);
    result(null, res);
  });
};
//  remove all phong

Room.removeAll = result => {
  connection.query("DELETE FROM phong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Rooms`);
    result(null, res);
  });
};

module.exports = Room;
