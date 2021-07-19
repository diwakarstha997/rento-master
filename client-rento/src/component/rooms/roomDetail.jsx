import React, { Component } from "react";
import ModifiedCarousel from "../common/carousel";
import Card from "../common/card";
import { getRoomById, getRooms } from "../../services/roomService";
import { getFacilities } from "../../services/facilityService";
import Breadcrumb from "../common/breadcrumb";

class RoomDetail extends Component {
  state = { room: "", rooms: [], facilities: [] };

  async componentDidMount() {
    try {
      const { data: room } = await getRoomById(this.props.match.params.id);
      const { data: facilities } = await getFacilities();
      const { data: rooms } = await getRooms();
      this.setState({ room, rooms, facilities });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        window.location = "/not-found";
    }
  }

  render() {
    const path = this.props.location.pathname;
    const { room } = this.state;
    console.log(room);
    if (!room) return <h1 className="text-center">Loading</h1>;
    else
      return (
        <React.Fragment>
          <Breadcrumb path={path} base="rooms" />
          <div className="container">
            <div>
              <ModifiedCarousel items={room.image} />
            </div>
            <div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  <div>
                    <h1 style={{ display: "inline" }}>
                      RS {room.monthlyRent}{" "}
                    </h1>
                    | {room.squareFeet} sqft.
                  </div>
                  <p style={{ textTransform: "uppercase" }}>
                    {room.city}-{room.wardNumber} {room.location}
                  </p>
                  <p style={{ textTransform: "uppercase" }}>
                    LISTED BY: {room.userName}
                  </p>
                  <button className="btn btn-primary mr-2">Apply</button>
                  <button className="btn btn-danger">Report</button>
                </div>
                <div className="col-lg-8 ">
                  <h1>Overview</h1>
                  <p>{room.description}</p>
                </div>
              </div>
              <hr />
              <div>
                <h1>Features</h1>
                <div
                  className="row"
                  style={{ marginRight: "50%", textTransform: "uppercase" }}
                >
                  {this.state.facilities.map((f) => (
                    <div className="col-6 my-2" key={f.name}>
                      <div>
                        <p style={{ display: "inline-block" }}>
                          <i className={`fa ${f.icon}`}></i>{" "}
                          <strong>{f.name}: </strong>
                        </p>{" "}
                        {!room.facility.find((rf) => f.name === rf) ? (
                          <p
                            className="text-danger"
                            style={{ display: "inline-block" }}
                          >
                            Not Available
                          </p>
                        ) : (
                          <p
                            className="text-success"
                            style={{ display: "inline-block" }}
                          >
                            Available
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr />
              <h1>Similar Rooms</h1>
              <Card items={this.state.rooms} onClick={this.handleRoomClick} />
              <hr />
              <h1>Nearby Rooms</h1>
              <Card items={this.state.rooms} onClick={this.handleRoomClick} />
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default RoomDetail;
