import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { uploadfileuserinfo } from "./UserFunctions";
import { returnallfiles } from "./UserFunctions";
import { deletefile } from "./UserFunctions";
import { deletefilefromdatabase } from "./UserFunctions";
import { sesmailfunctionality } from "./UserFunctions";
import { updatedatabase } from "./UserFunctions";
import ReactS3 from "react-s3";
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import "./sh.css";

const config = {
  bucketName: "",
  region: "",
  accessKeyId: "",
  secretAccessKey: ""
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      first_name: "",
      last_name: "",
      email: "",
      inputKey: Date.now(),
      errors: {},
      allretuenfiles: [],
      modalIsOpen : false,
      updated_file_id: ""
    };
    //this.onChange = this.onChange.bind(this);
    //this.onClick = this.onClick.bind(this);
    
    
  }


toggelModal=(event) =>{
  //let a=event.target.id;
  this.setState({
    modalIsOpen : !this.state.modalIsOpen,
    updated_file_id: event.target.id
  });
 // console.log('updated id ',a);
}

  componentDidMount() {
    //console.log("clicked");
    let email = '';
    let first_name = '';
    let last_name = '';
    if(localStorage.logintype == 'Facebook'){
      
     email = localStorage.facebookresponeemail;
     first_name = localStorage.facebookresponename;
     last_name = localStorage.facebookresponename;

    }
    else{
      const token = localStorage.getItem('usertoken');
      const decoded = jwt_decode(token);
      email = decoded.email;
      first_name = decoded.first_name;
      last_name = decoded.last_name;
    }
    
    returnallfiles(email).then(res => {
      console.log(res);
      if (res) {
        this.setState({
          allretuenfiles: res
        });
      } else {
        alert("please register");
      }
    });
    this.setState({
      first_name: first_name,
      last_name: last_name,
      email: email
    });
  }

  onChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    //console.log(this.state.selectedFile);
  };
  onClick = e => {
   // console.log('please check file info ',this.state.selectedFile.size);
    let size=this.state.selectedFile.size;
    if(size<10485760){
      ReactS3.uploadFile(this.state.selectedFile, config)
      .then(data => {
        console.log(data);
        var d = new Date();
       
        let savefileinfo = {
          Email_id: this.state.email,
          File_description: data.key,
          Download_link: "http://d1i5sdxfmrzbaf.cloudfront.net/" + data.key,
          File_upload_time: d.toUTCString(),
          File_updated_time: d.toUTCString(),
          File_delete_flag: 1,  
          File_deleted_time: d.toUTCString(),
          File_Update_flag: 1
        };
        console.log(savefileinfo);
       console.log(e.target);
        uploadfileuserinfo(savefileinfo).then(res => {
          if (res) {
            console.log("saved successfully");
          } else {
            console.log("please check the upload file user info function");
          }
        });

        alert("File Uploaded Successfully " + this.state.selectedFile.name);
        this.setState({
          inputKey: Date.now()
        });
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      });
    }
    else{
      alert("Please upload file less than 10MB");
    }



    
    this.setState({
      inputKey: Date.now()
    });
  };

  ondeleteclick = event => {
    let eventfor=event.target;
    deletefile(event.target.parentElement.parentElement.id).then(res => {
      if (res) {
        //console.log(eventfor.id);
        deletefilefromdatabase(eventfor.id)
        .then(res => {
          if (res) {
            console.log("File deleted successfully");
          } else {
            console.log("please check the upload file delete from database info function");
          }
        });
        console.log(this.state.email);
        sesmailfunctionality(this.state.email);
        console.log('in mail');
        window.location.reload();
      } else {
        console.log("please check the delete function");
      }
    });    

    //console.log(event.target.parentElement.parentElement.id);
  };

  onUpdateclick = () => {
   
    let updatefileid=this.state.updated_file_id;
    ReactS3.uploadFile(this.state.selectedFile, config)
    .then(response => {
      
      updatedatabase(updatefileid)
        .then(res => {
          if (res) {
            alert("update successful");
            window.location.reload(); 
          } else {
            console.log("please check the file update function");
          }
        });
     
    })
    .catch(err => {
      alert(err);
    });



  //     

    //console.log(event.target.parentElement.parentElement.id);
  };
  
  render() {
    return (
      <div className="container">
        <div>
       <div className="col-md-6 col-sm-6 jumbotron mt-5 mx-auto">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td className="table_font">{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td className="table_font">{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td className="table_font">{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      <Modal isOpen={this.state.modalIsOpen}>
        <ModalHeader toggle={this.toggelModal}>Upload file again</ModalHeader>
        <ModalBody>
        <div className="col-md-6 margin_left_upload">
          <div className="form-group files">
            <label>Upload Your File </label>
            <input
              type="file"
              name="file"
              onChange={this.onChange}
              key={this.state.inputKey}
            />
          </div>
          
        </div>  
          
        </ModalBody>                                        
        <ModalFooter>
          <button className="btn btn-primary" onClick={this.onUpdateclick}>Upload</button>
          <button className="btn btn-secondary" onClick={this.toggelModal}>Cancel</button>
        </ModalFooter>
      </Modal>
        <div className="pad_shift col-md-12 margin_left_upload_1">
          <div className="form-group files">
            <label className="padding_right">Upload Your File </label>
            <input className="btn-block"
              type="file"
              name="file"
              onChange={this.onChange}
              key={this.state.inputKey}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.onClick}
          >
            Upload
          </button>
        </div>
        <div className="col-md-12">
        <div className="disply_p adding_pad">
              <div className="col-md-3">
                <b>File Name</b>
              </div>
              <div className="col-md-2">
                <b>
                  Download
                </b>
              </div>
              <div className="col-md-2">
                <b >Update</b>
              </div>
              <div className="col-md-1">
                <b>
                  Delete
                </b>
              </div>
              <div className="col-md-2 padding_upload">
                <b>Upload File Time</b>
              </div>
              <div className="col-md-2 padding_upload">
                <b>Updated File Time</b>
              </div>
            </div>





          {this.state.allretuenfiles.map(response => (
            
            <div id={response.File_description} className="disply_p" key={response.idUser_file_details}>
              <div className="col-md-3 break">
                <b>{response.File_description}</b>
              </div>
              <div className="col-md-2">
                <a
                  className="btn btn-primary"
                  href={response.Download_link}
                  target="_blank"
                  download={response.File_description}
                >
                  Download
                </a>
              </div>
              <div className="col-md-2">
                <a id={response.idUser_file_details} className="btn btn-info color_text" onClick={this.toggelModal}>Update</a>
              </div>
              <div className="col-md-1">
                <a id={response.idUser_file_details}
                  className="btn btn-danger color_text"
                  onClick={this.ondeleteclick}
                >
                  Delete
                </a>
              </div>
              <div className="col-md-2 padding_upload break">
                <b>{response.File_upload_time}</b>
              </div>
              
              <div className="col-md-2 padding_upload break">
                <b>{response.File_updated_time}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
