import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/rento-resize-2.png";
import {
  getUserVerificationData,
  mailResend,
} from "../../services/userService";
import auth from "./../../services/authService";

class NavBar extends Component {
  state = {
    message: "",
  };

  handleMailResend = async () => {
    const { data } = await mailResend();
    this.setState({
      message: data ? "Mail send SuccessFully. Please Check your Mail" : "",
    });
  };

  render() {
    const user = auth.getCurrentUser();
    let uv_data;
    if (user) uv_data = getUserVerificationData();
    console.log(user, uv_data);
    const userType = this.props.userType;

    const path = this.props.location.pathname;
    const route = path.split("/");
    const routeLength = route.length;
    console.log(route[routeLength]);

    return (
      <React.Fragment>
        <div className="mx-lg-5 mx-md-4">
          {(((!userType && !user) || (user && user.userRole !== "Admin")) && (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
              <a
                className="remove-active navbar-brand"
                href={
                  user && user.userRole === "RoomOwner"
                    ? "/RoomOwner/MyRooms"
                    : "/"
                }
              >
                <img id="rento-logo" src={logo} alt="Rento" />
              </a>

              <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse d-lg-flex justify-content-lg-center"
                id="navcol-1"
              >
                <ul className="nav navbar-nav mr-auto">
                  {(user && user.userRole === "RoomOwner" && (
                    <React.Fragment>
                      <a
                        className="nav-item nav-menu nav-link"
                        exact
                        href="/RoomOwner/MyRooms"
                      >
                        My Rooms
                      </a>
                      <a
                        className="nav-item nav-menu nav-link"
                        href="/RoomOwner/applications"
                      >
                        APPLICATIONS
                      </a>
                    </React.Fragment>
                  )) ||
                    (user && user.userRole === "Tenant" && (
                      <React.Fragment>
                        <a
                          className="nav-item nav-menu nav-link "
                          href="/rooms"
                        >
                          FIND ROOM
                        </a>

                        <a
                          className="nav-item nav-menu nav-link"
                          href="/MyApplications"
                        >
                          APPLICATIONS
                        </a>
                      </React.Fragment>
                    )) || (
                      <React.Fragment>
                        <NavLink
                          className="nav-item nav-menu nav-link"
                          exact
                          to="/"
                        >
                          HOME
                        </NavLink>
                        <NavLink
                          className="nav-item nav-menu nav-link"
                          to="/rooms"
                        >
                          FIND ROOM
                        </NavLink>
                        <NavLink
                          className="nav-item nav-menu nav-link"
                          to="/about"
                        >
                          ABOUT
                        </NavLink>
                        <NavLink
                          className="nav-item nav-menu nav-link"
                          to="/contact"
                        >
                          CONTACT
                        </NavLink>
                      </React.Fragment>
                    )}
                </ul>
                <span className="navbar-nav">
                  {!user && (
                    <React.Fragment>
                      <Link
                        className="navbar-text remove-active"
                        to={{
                          pathname: "/login",
                          state: {
                            from: "/RoomOwner/MyRooms",
                            message: "Login to List Room",
                            role: "RoomOwner",
                          },
                        }}
                      >
                        LIST ROOM
                      </Link>
                      <NavLink
                        className="navbar-text margin-lg-left remove-active"
                        to="/login"
                      >
                        Log In
                      </NavLink>
                      <Link
                        className="navbar-text margin-lg-left btn text-light shadow-none rento-btn"
                        to="/register"
                      >
                        Sign Up
                      </Link>
                    </React.Fragment>
                  )}
                  {user && (
                    <React.Fragment>
                      <a
                        className="navbar-text margin-lg-left remove-active"
                        href={
                          user.userRole === "RoomOwner"
                            ? "/RoomOwner/profile"
                            : "/profile"
                        }
                      >
                        <span>
                          <i className="fa fa-user pr-2"></i>
                        </span>
                        {user.name}
                      </a>
                      <a
                        className="navbar-text margin-lg-left remove-active"
                        href="/logout"
                      >
                        <span>
                          <i className="fa fa-sign-out pr-2"></i>
                        </span>
                        Logout
                      </a>
                    </React.Fragment>
                  )}
                </span>
              </div>
            </nav>
          )) ||
            (userType === "Admin" && (
              <nav
                className={`navbar navbar-light navbar-expand-md navigation-clean-button
                  ${!user ? "d-flex justify-content-center" : ""}`}
              >
                {(!user && (
                  <NavLink
                    className="remove-active navbar-brand"
                    to="/Admin/login"
                  >
                    <img id="rento-logo" src={logo} alt="Rento" />
                  </NavLink>
                )) ||
                  (user && (
                    <React.Fragment>
                      <NavLink
                        className="remove-active navbar-brand"
                        to="/Admin/dashboard"
                      >
                        <img id="rento-logo" src={logo} alt="Rento" />
                      </NavLink>
                      <button
                        id="menu-toggle"
                        onClick={this.props.handleToggle}
                        className="mr-auto"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <button
                        data-toggle="collapse"
                        className="navbar-toggler"
                        data-target="#navcol-1"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div
                        className="collapse navbar-collapse d-lg-flex justify-content-lg-center"
                        id="navcol-1"
                      >
                        <span className="navbar-nav ml-auto">
                          <a
                            className="navbar-text margin-lg-left remove-active"
                            href="/Admin/profile"
                          >
                            <span>
                              <i className="fa fa-user pr-2"></i>
                            </span>
                            Admin
                          </a>
                          <a
                            className="navbar-text margin-lg-left remove-active"
                            href="/adminLogout"
                          >
                            <span>
                              <i className="fa fa-sign-out pr-2"></i>
                            </span>
                            Logout
                          </a>
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
              </nav>
            ))}
        </div>
        {user && user.userRole !== "Admin" && (
          <React.Fragment>
            {uv_data.isEmailActivated === false &&
              ((this.state.message && (
                <div className="d-flex justify-content-center mx-auto my-3 alert alert-success text-center admin-alert">
                  <p className="my-auto">{this.state.message}</p>
                </div>
              )) || (
                <div className="d-flex justify-content-center mx-auto my-3 alert alert-danger text-center admin-alert">
                  <p className="my-auto">
                    Please Activate Your Email Address{" "}
                    <button
                      className="btn btn-primary"
                      onClick={this.handleMailResend}
                    >
                      Resend
                    </button>{" "}
                    verification
                  </p>
                </div>
              ))}
            {uv_data.verified === false && (
              <div className="d-flex justify-content-center mx-auto my-3 alert alert-danger text-center admin-alert">
                <p className="my-auto">
                  Your identity is not verified. Please{" "}
                  <a
                    className="text-danger"
                    href={
                      user.userRole === "Tenant"
                        ? "/profile/verify"
                        : "/RoomOwner/profile/verify"
                    }
                  >
                    Click there
                  </a>{" "}
                  to verify
                </p>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
