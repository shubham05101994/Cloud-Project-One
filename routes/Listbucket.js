const express = require("express");
const listbucket = express.Router();
const fs = require("fs");
const cors = require("cors");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-1" });
listbucket.use(cors());
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

listbucket.get("/bucketlist", (req, res) => {
  s3.listBuckets(function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });

  var params = {
    Bucket: "",
    MaxKeys: 2
  };
  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    Bucket: ""
  };
  s3.getBucketLocation(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log("bucket resides " + data.LocationConstraint); // successful response
  });
});
/*
listbucket.post("/upload", (req, res) => {
  const element1 = fs.readFileSync(req.body.element1);
  //const  = req.body.element1;

  console.log("element1");
  console.log(element1);
  const file = fs.readFileSync(req.files.element2);
  //const file = ;
  console.log(file);
  var params = {
    Body: file.data,
    Bucket: "imagesforuploadanddownload",
    Key: "file.name"
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
});
*/
module.exports = listbucket;
