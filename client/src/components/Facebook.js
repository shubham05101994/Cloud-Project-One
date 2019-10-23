import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

import { Redirect } from "react-router";
//import PropTypes from 'prop-types';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    };
  }
  responseFacebook = response => {
    // console.log(response);
    if (response) {
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email
      });
      //   window.location.href = "/profile";
    //  localStorage.setItem("usertoken", response);
      localStorage.setItem("logintype", 'Facebook');
      localStorage.setItem("facebookresponeemail",response.email);
      localStorage.setItem("facebookresponename",response.name);
      this.props.history.push("/profile");
    } else {
      alert("delete");
    }
  };
  componentClicked = () => {
    // return <Redirect to="/profile" />;
  };
  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="428936474430258"
          //autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}

export default Facebook;
