import React, { Component } from "react";
import bgImg from "../../assets/images/Rento-BG-2.png";
import { NavLink } from "react-router-dom";
import { getRooms } from "./../../services/roomService";

class Home extends Component {
  state = { rooms: getRooms() };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" autoComplete="off">
          <img
            className="d-md-flex m-auto justify-content-md-center img-fluid"
            src={bgImg}
            alt="Rento"
            // style={{ width: "3000px" }}
          />
        </div>
        <hr />

        <div>
          <p className="lead text-center">
            <br /> We are happy to serve you,
            <br />
            Remeber us to find or rent room
            <br />
          </p>
        </div>

        <div className="container d-lg-flex m-auto row text-center">
          <div className="card shadow m-5 col-md col-lg">
            <div className="card-body">
              <i className="rento-text fa fa-search fa-2x"></i>
              <h4 className="card-title mt-2">I'm Searching Room</h4>
              <p className="card-text">
                We will help you to find your room.
                <br />
                Choose location, required facilities and prices to find your
                room.
                <br />
              </p>
              <NavLink className="btn btn-secondary rento-btn" to="/rooms">
                Find Room
              </NavLink>
            </div>
          </div>

          <div className="card shadow m-5 col-md col-lg">
            <div className="card-body">
              <i className="rento-text fa fa-home fa-2x"></i>
              <h4 className="card-title mt-2">I'm Renting Room</h4>
              <p className="card-text">
                We will help you to find your tenant.
                <br />
                Choose your location, list your rooms and find your tenants.
              </p>
              <NavLink
                className="btn btn-secondary rento-btn"
                to="/RoomOwner/MyRooms"
              >
                List Room
              </NavLink>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
