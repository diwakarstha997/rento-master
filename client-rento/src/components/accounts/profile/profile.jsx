import React, { Component } from "react";
import { getCurrentUser } from "../../../services/authService";
import ChangePassword from "./changePassword";
import EditProfile from "./editProfile";
import Message from "./message";
import PreviewProfile from "./previewProfile";
import VerifyIdentity from "./verifyIdentity";

class Profile extends Component {
  state = {
    active: "preview",
    message: "",
  };

  componentDidMount() {
    if (this.props.active === "verifyIdentity")
      this.setState({ active: "verifyIdentity" });
  }

  handleActive = async (path) => {
    this.setState({ active: path });
    this.setState({ message: "" });
    const user = await getCurrentUser();
    this.props.history.push(
      (user.userRole === "RoomOwner" && "/RoomOwner/profile") ||
        (user.userRole === "Admin" && "/Admin/profile") ||
        (user.userRole === "Tenant" && "/profile")
    );
  };

  setMessage = (m) => {
    this.setState({ message: m });
  };

  render() {
    const user = getCurrentUser();
    if (this.state.profileData) console.log(this.state.profileData.name);
    return (
      <React.Fragment>
        <div>
          <div className="row" style={{ margin: "0 5% 0 5%" }}>
            <div className="col ">
              <h2>Profile</h2>
            </div>
          </div>
          <div
            className="row bg-light shadow-sm p-3 mb-5 rounded"
            style={{ margin: "0 5% 0 5%" }}
          >
            <div className="my-2 col-lg col-md d-flex justify-content-lg-start justify-content-md-start justify-content-center">
              <ul className="nav" style={{ listStyleType: "none" }}>
                <li className="m-1">
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
                <li className="text-dark m-1">
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
                <li className="text-dark m-1">
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
                {user.userRole !== "Admin" && (
                  <li className="text-dark m-1">
                    <a
                      className={`btn btn-sm ${
                        this.state.active === "verifyIdentity"
                          ? "rento-color-active"
                          : "rento-color"
                      }`}
                      href={
                        user.userRole === "RoomOwner"
                          ? "/RoomOwner/profile/verify"
                          : "/profile/verify"
                      }
                      // onClick={() => this.handleActive("verifyIdentity")}
                    >
                      Verify Identity
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className=" d-flex justify-content-center">
            <Message message={this.state.message} status="200" />
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
              )) ||
              (user.userRole !== "Admin" &&
                this.state.active === "verifyIdentity" && <VerifyIdentity />)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
