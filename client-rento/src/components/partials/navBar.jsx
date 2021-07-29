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
          {((userType || !userType) && (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
              <NavLink
                className="remove-active navbar-brand"
                to={userType ? "/RoomOwner/MyRooms" : "/"}
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
                  {(userType === "RoomOwner" && (
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
                    (userType === "Tenant" && (
                      <React.Fragment>
                        <a className="nav-item nav-menu nav-link" href="/rooms">
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
                        <a
                          className="nav-item nav-menu nav-link"
                          exact
                          href="/"
                        >
                          HOME
                        </a>
                        <a className="nav-item nav-menu nav-link" href="/rooms">
                          FIND ROOM
                        </a>
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
                        href="/user/profile"
                      >
                        Name
                      </a>
                      <a
                        className="navbar-text margin-lg-left remove-active"
                        href="/logout"
                      >
                        Logout
                      </a>
                    </React.Fragment>
                  )}
                </span>
              </div>
            </nav>
          )) || (
            <nav className="navbar navbar-light navbar-expand-md navigation-clean-button d-flex justify-content-center">
              <NavLink
                className="remove-active navbar-brand"
                to={userType === "Admin" ? "/admin" : "/"}
              >
                <img id="rento-logo" src={logo} alt="Rento" />
              </NavLink>
            </nav>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
