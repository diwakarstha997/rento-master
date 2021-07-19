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
                {(userType && (
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
                      to="/RoomOwner/messages"
                    >
                      Messages
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
                    <NavLink className="nav-item nav-menu nav-link" to="/rooms">
                      FIND ROOM
                    </NavLink>
                    <NavLink className="nav-item nav-menu nav-link" to="/about">
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
                      to="/RoomOwner/MyRooms"
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
                    {(userType && (
                      <a
                        className="navbar-text remove-active"
                        href="/"
                        style={{ cursor: "pointer" }}
                      >
                        Go to Tenant
                      </a>
                    )) || (
                      <a
                        className="navbar-text margin-lg-left remove-active"
                        href="/RoomOwner/MyRooms"
                        style={{ cursor: "pointer" }}
                      >
                        Go to RoomOwner
                      </a>
                    )}
                    <NavLink
                      className="navbar-text margin-lg-left remove-active"
                      to="/user/profile"
                    >
                      Name
                    </NavLink>
                    <NavLink
                      className="navbar-text margin-lg-left remove-active"
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </React.Fragment>
                )}
              </span>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
