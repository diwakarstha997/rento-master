import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/rento-resize-2.png";
import auth from "./../../services/authService";

class NavBar extends Component {
  render() {
    const user = auth.getCurrentUser();
    const userType = this.props.userType;
    return (
      <React.Fragment>
        <div className="mx-lg-5 mx-md-4">
          {(((!userType && !user) || (user && user.userRole !== "Admin")) && (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
              <NavLink
                className="remove-active navbar-brand"
                to={
                  user && user.userRole === "RoomOwner"
                    ? "/RoomOwner/MyRooms"
                    : "/"
                }
              >
                <img id="rento-logo" src={logo} alt="Rento" />
              </NavLink>

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
                      <NavLink
                        className="nav-item nav-menu nav-link"
                        exact
                        to="/RoomOwner/MyRooms"
                      >
                        My Rooms
                      </NavLink>
                      <NavLink
                        className="nav-item nav-menu nav-link"
                        to="/RoomOwner/applications"
                      >
                        APPLICATIONS
                      </NavLink>
                    </React.Fragment>
                  )) ||
                    (user && user.userRole === "Tenant" && (
                      <React.Fragment>
                        <NavLink
                          className="nav-item nav-menu nav-link"
                          to="/rooms"
                        >
                          FIND ROOM
                        </NavLink>

                        <NavLink
                          className="nav-item nav-menu nav-link"
                          to="/MyApplications"
                        >
                          APPLICATIONS
                        </NavLink>
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
        {user && user.userRole !== "Admin" && user.verified === false && (
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
                Click here
              </a>{" "}
              to verify
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
