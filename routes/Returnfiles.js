const express = require("express");
const userfilereturn = express.Router();
const cors = require("cors");
const FileUserDetails = require("../models/Fileinfo");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-1" });
userfilereturn.use(cors());

userfilereturn.get("/", (req, res) => {
    
    //console.log( req.query.Email_id);
    FileUserDetails.findAll({
      where: {            
        Email_id: req.query.Email_id
      }
    })
      .then(user => {
        if (user) {
          
         res.send(user)
        } else {
          res.send("problem in fetching");
        }
      })
      .catch(err => {
        res.send("error: " + err);
      });
  });

//delete a file

userfilereturn.get("/delete", (req, res) => {

  var params = {
    Bucket: "", 
    Key: req.query.key
   };
   s3.deleteObject(params, function(err, data) {
     if (err)
     { console.log(err, err.stack); // an error occurred
     
      } else    { 
        

        console.log(data);
        res.send(data);

      }       
   });
});

userfilereturn.delete("/deletefromdatabase", (req, res) => {

  var params = {
    Key: req.query.id
   };
   
   FileUserDetails.destroy({
    where: {
      idUser_file_details: params.Key
    }
  }).then(res => {
    if (res) {
     console.log(res);
    } else {
     console.log("problem in deleteing");
    }
  })
  .catch(err => {
    console.log("error: " + err);
  });

});

userfilereturn.get("/admin", (req, res) => {
    
  console.log( 'in admin');
  FileUserDetails.findAndCountAll()
    .then(files => {
      if (files) {
        
       res.send(files)
      } else {
        res.send("problem in fetching");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});



userfilereturn.post("/updatedatabase", (req, res) => {
  const today = new Date();
  

   let sk=req.body.idUser_file_details;
   console.log(sk);
   FileUserDetails.update({
    File_updated_time: today.toDateString()+" "+today.getHours() +":"+today.getMinutes()+":" +today.getSeconds()
  }, {
    where: {
      idUser_file_details: sk
    }
  })
  .then(response => {
    if (response) {
     console.log(response);
    // response.send('fileupadate');
     
     res.send(response);
    } else {
     console.log("problem in deleteing");
    }
  })
  .catch(err => {
    console.log("error: " + err);
  });

});


module.exports = userfilereturn;
