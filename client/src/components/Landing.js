import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron color_back mt-4">
          <div className="col-sm-8 mx-auto">
          
            <h4 className="text-center">WELCOME TO</h4>
            <div>
            
            <h1 className="text-center name_app"><img src="flash.png" alt="Smiley face" height="42" width="42"></img>Flash File Uploader</h1>
            </div>
          </div>
        </div>
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <p>**NOTE:</p>
            <p className="">1. User Login</p>
            <p className="">2. Admin Login</p>
            <p className="">3. Social login (Facebook)</p>
            <p className="">4. Application performs file Uploading.</p>
            <p className="">5. Application performs file Downloading.</p>
            <p className="">6. Application performs file Deleting.</p>
            <p className="">7. Application performs file Updating.</p>
            <p className="">8. Application allows to upload file only Less than 10MB</p>
           



          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
