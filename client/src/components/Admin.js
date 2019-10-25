import React, { Component } from "react";
import { returnAdminfiles } from "./UserFunctions";
import { deletefile } from "./UserFunctions";
import { deletefilefromdatabase } from "./UserFunctions";
import "./sh.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      allretuenfiles: [],
      count: ""
    };
    //this.onChange = this.onChange.bind(this);
    //this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    returnAdminfiles().then(res => {
      console.log(res);
      if (res) {
        this.setState({
          allretuenfiles: res.data.rows,
          count: res.data.count
        });
      } else {
        console.log("err");
      }
    });
  }

  ondeleteclick = event => {
    let eventfor = event.target;
    deletefile(event.target.parentElement.parentElement.id).then(res => {
      if (res) {
        //console.log(eventfor.id);
        deletefilefromdatabase(eventfor.id).then(res => {
          if (res) {
            console.log("File deleted successfully");
          } else {
            console.log(
              "please check the upload file delete from database info function"
            );
          }
        });
        window.location.reload();
      } else {
        console.log("please check the delete function");
      }
    });

    //console.log(event.target.parentElement.parentElement.id);
  };

  render() {
    return (
      <div className="container" className="text_center">
        <h2 className="count_pad">Total Files Count: {this.state.count}</h2>
        <div className="col-md-12 admin_box">
          <div
            
            className="disply_p"
           
          >
            <div className="col-md-3">
              <b>File Description</b>
            </div>
            <div className="col-md-2">
              <b>Email id</b>
            </div>

            <div className="col-md-2">
              <b             
              >
                Download
              </b>
            </div>
            <div className="col-md-1">
              <b>
                Delete
              </b>
            </div>
            <div className="col-md-2 padding_upload">
              <b>File Upload time</b>
            </div>
            <div className="col-md-2 padding_upload">
              <b>File Update time</b>
            </div>
          </div>

          {this.state.allretuenfiles.map(response => (
            <div
              id={response.File_description}
              className="disply_p"
              key={response.idUser_file_details}
            >
              <div className="col-md-3">
                <b>{response.File_description}</b>
              </div>
              <div className="col-md-2">
                <b>{response.Email_id}</b>
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
              <div className="col-md-1">
                <a
                  id={response.idUser_file_details}
                  className="btn btn-danger color_text"
                  onClick={this.ondeleteclick}
                >
                  Delete
                </a>
              </div>
              <div className="col-md-2 padding_upload">
                <b>{response.File_upload_time}</b>
              </div>
              <div className="col-md-2 padding_upload">
                <b>{response.File_updated_time}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Admin;
