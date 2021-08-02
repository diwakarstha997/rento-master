import React, { Component } from "react";
import ChangePassword from "./changePassword";
import EditProfile from "./editProfile";
import PreviewProfile from "./previewProfile";
import Message from "../../admin/dashboard/message";

class Profile extends Component {
  state = {
    active: "preview",
    message: "",
  };

  handleActive = (path) => {
    this.setState({ active: path });
    this.setState({ message: "" });
  };
  setMessage = (m) => {
    this.setState({ message: m });
  };

  render() {
    if (this.state.profileData) console.log(this.state.profileData.name);
    return (
      <React.Fragment>
        <div>
          <div className="row" style={{ margin: "0 5% 0 5%" }}>
            <div className="col ">
              <h2>Profile</h2>
            </div>
            <Message message={this.state.message} status="200" />
          </div>
          <div
            className="row bg-light shadow-sm p-3 mb-5 rounded"
            style={{ margin: "0 5% 0 5%" }}
          >
            <div className="my-2 col-lg col-md d-flex justify-content-lg-start justify-content-md-start justify-content-center">
              <ul className="nav" style={{ listStyleType: "none" }}>
                <li className="mx-1">
                  <button
                    className={`btn btn-sm ${
                      this.state.active === "preview"
                        ? "rento-color-active"
                        : "rento-color"
                    }`}
                    onClick={() => this.handleActive("preview")}
                  >
                    Preview
                  </button>
                </li>
                <li className="text-dark mx-1">
                  <button
                    className={`btn btn-sm ${
                      this.state.active === "edit"
                        ? "rento-color-active"
                        : "rento-color"
                    }`}
                    onClick={() => this.handleActive("edit")}
                  >
                    Edit
                  </button>
                </li>
                <li className="text-dark mx-1">
                  <button
                    className={`btn btn-sm ${
                      this.state.active === "changePassword"
                        ? "rento-color-active"
                        : "rento-color"
                    }`}
                    onClick={() => this.handleActive("changePassword")}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ margin: "0 5% 0 5%" }}>
            {(this.state.active === "preview" && (
              <PreviewProfile handleActive={this.handleActive} />
            )) ||
              (this.state.active === "edit" && (
                <EditProfile
                  handleActive={this.handleActive}
                  message={this.setMessage}
                />
              )) ||
              (this.state.active === "changePassword" && (
                <ChangePassword
                  handleActive={this.handleActive}
                  message={this.setMessage}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
