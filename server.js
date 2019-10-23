var express = require("express");
var cors = require("cors");
//var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);

var Users = require("./routes/Users");
var Listbucket = require("./routes/Listbucket");
var FileinfoSave = require("./routes/SaveFiledetails");
var Returnfiles = require("./routes/Returnfiles");
app.use("/users", Users);
app.use("/bucket", Listbucket);
app.use("/FileinfoSave", FileinfoSave);
app.use("/returnfiles",Returnfiles);


app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
