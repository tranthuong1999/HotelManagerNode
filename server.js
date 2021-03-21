const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002'];
  const origin = req.headers.origin;
  // console.log("origin la cai gi:" ,origin);
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();


  // next();
});

app.use('/images', express.static(__dirname + '/public/images'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application hotel managerddd" });
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
    /*Now do where ever you want to do*/
    if (!err)
      return res.end(JSON.stringify({ image: req.file.filename }));
  });
});



require("./app/routes/customer.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/register.routes.js")(app);

// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000.");
});