const express = require("express");
const userfiledetials = express.Router();
const cors = require("cors");
const FileUserDetails = require("../models/Fileinfo");
userfiledetials.use(cors());

userfiledetials.post("/", (req, res) => {
    const today = new Date();
    const userfileData = {
        Email_id: req.body.Email_id,
        File_description: req.body.File_description,
        Download_link: req.body.Download_link,
        File_upload_time:today.toDateString()+" "+today.getHours() +":"+today.getMinutes()+":" +today.getSeconds(),
        File_updated_time: today.toDateString()+" "+today.getHours() +":"+today.getMinutes()+":" +today.getSeconds(),
        File_delete_flag:req.body.File_delete_flag,
        File_deleted_time:today.toDateString()+" "+today.getHours() +":"+today.getMinutes()+":" +today.getSeconds(),
        File_Update_flag:req.body.File_Update_flag
    };
  
    FileUserDetails.create(userfileData)
    .then(user => {
      res.json({ status: user.email + "File Info Saved!" });
    })
    .catch(err => {
      res.send("error: " + err);
    });
  });

  

  module.exports = userfiledetials;