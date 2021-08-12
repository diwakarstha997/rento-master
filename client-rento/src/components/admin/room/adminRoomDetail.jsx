import React, { Component } from "react";
import room from "../../../services/roomService";
import ModifiedCarousel from "../../common/carousel";
import { getFacilities } from "./../../../services/facilityService";
import Message from "../../admin/dashboard/message";
import Map from "../../common/map";
import complaint from "../../../services/complaintService";
import HandleComplaint from "../modals/complaintHandleModal";

class AdminRoomDetail extends Component {
  state = {
    roomData: "",
    facilities: "",
    message: "",
    mapData: "",
    reportCount: 3,
    value: 7,
    complaints: "",
  };

  async componentDidMount() {
    document.title = "Admin | Room Detail";
    const { data: roomcomplaint } = await complaint.getComplaintbyId(
      this.props.match.params.id
    );

    const { data: roomData } = await room.getOwnerRoomDetail(
      roomcomplaint.room
    );

    const { data: count } = await room.getReportsForRoom(roomcomplaint.room);
    const mapData = {
      lng: roomData.lng,
      lat: roomData.lat,
      zoom: roomData.zoom,
      marker: roomData.marker,
    };
    const { data: facilities } = await getFacilities();
    this.setState({
      mapData,
      roomData,
      facilities,
      reportCount: count,
      complaints: roomcomplaint,
    });
  }

  handleApprove = async () => {
    await complaint.approve(this.props.match.params.id);
  };
  handleReject = async () => {
    await complaint.reject(this.props.match.params.id);
  };

  handleDelete = async () => {
    await room.adminRoomDelete(this.state.complaints.room);
  };

  render() {
    const { roomData, complaints } = this.state;
    if (!roomData)
      return (
        <React.Fragment>
          <h3>Room Already Deleted</h3>
          <a
            className="btn btn-danger btn ml-4"
            onClick={this.handleReject}
            href={`/Admin/dashboard/${this.state.value}`}
          >
            Dismiss
          </a>
        </React.Fragment>
      );
    return (
      <div className="container">
        <div>
          <hr />
          <div className="d-flex justify-content-center">
            <h3>Room Number: {roomData.roomTag}</h3>
          </div>
          <hr />
          <div>
            <ModifiedCarousel items={roomData.image} />
          </div>
          <div className=" d-flex justify-content-center">
            <Message message={this.state.message} status={this.state.status} />
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <h3>Report: </h3>{" "}
            <HandleComplaint
              title="Approve"
              button="btn btn-danger btn ml-4"
              onClick={this.handleApprove}
            />
            <HandleComplaint
              title="Reject"
              button="btn btn-secondary btn ml-4"
              onClick={this.handleReject}
            />
          </div>

          <hr />
          <div className="row m-auto">
            <div className="card shadow m-2 col-xl col-lg col-md">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <span>
                      <i className="fa fa-list fa-2x"></i>
                    </span>
                    <p>
                      Room Status :{" "}
                      {roomData.status === "Active" ? (
                        <React.Fragment>
                          <i className="fa fa-check-circle">
                            {" "}
                            {roomData.status}{" "}
                          </i>{" "}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <i className="fa fa-times-circle">
                            {" "}
                            {roomData.status}{" "}
                          </i>{" "}
                        </React.Fragment>
                      )}
                      {/* <button onClick={this.handleDelete}>delete</button> */}
                      <HandleComplaint
                        title="Delete Room"
                        button="btn btn-danger btn mt-2"
                        onClick={this.handleDelete}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow  m-2 col-xl col-lg">
              <div className="card-body">
                <span>
                  <i className="fa fa-eye fa-2x"></i>
                </span>
                <p> Total Views : {roomData.views} </p>
              </div>
            </div>
            <div
              className="card shadow m-2 col-xl col-lg"
              style={{ cursor: "pointer" }}
            >
              <div className=" card-body">
                <span>
                  <i className="fa fa-envelope fa-2x"></i>
                </span>
                <p> Total Report : {this.state.reportCount} </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center" style={{ position: "relative" }}>
          <h3 className="" style={{ display: "inline-block" }}>
            Complaint Details:
          </h3>
        </div>
        <hr />
        <div className="card shadow p-2 m-2">
          <div className="p-4">
            <p>Date Submitted :{complaints.dateSubmitted.slice(0, 10)}</p>
            <p>Report Type : {complaints.reportType}</p>
            <p>Room OwnerName : {complaints.userName}</p>
            <p>Room Tag : {complaints.roomId}</p>
            <p>Report Description : {complaints.reportDescription}</p>
          </div>
        </div>

        <hr />
        <div className="text-center" style={{ position: "relative" }}>
          <h3 className="" style={{ display: "inline-block" }}>
            Room Details:
          </h3>
        </div>

        <hr />
        <div className="row m-auto">
          <div className="card shadow p-4 m-2 col-lg-3">
            <div>
              <h1 style={{ display: "inline" }}>RS {roomData.monthlyRent} </h1>|{" "}
              {roomData.squareFeet} sqft.
            </div>
            <p style={{ textTransform: "uppercase" }}>
              {roomData.city}-{roomData.wardNumber} {roomData.location}
            </p>
          </div>

          <div
            className="card shadow p-4 m-2 col-lg col-md"
            style={{
              overflowWrap: "break-word",
            }}
          >
            <h1>Overview</h1>
            {roomData.description}
          </div>
        </div>
        <div className="card shadow p-2 m-2">
          <div className="p-4">
            <h1>Features</h1>
            <div
              className="row"
              style={{ marginRight: "0%", textTransform: "uppercase" }}
            >
              {this.state.facilities.map((f) => (
                <div className="col-6 my-2" key={f.name}>
                  <div>
                    <p style={{ display: "inline-block" }}>
                      <i className={`fa ${f.icon}`}></i>{" "}
                      <strong>{f.name}:</strong>
                    </p>{" "}
                    {!roomData.facility.find((rf) => f.name === rf) ? (
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
        </div>
        <div className="card shadow p-2 m-2">
          <h1 className="ml-4 mt-4">Photos</h1>
          <div className="row m-2">
            {this.state.roomData.image && (
              <React.Fragment>
                {this.state.roomData.image.map((img) => (
                  <div
                    className="m-2 p-2 rounded shadow col-lg-2 col-md-2 col-8"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={"/" + img}
                      alt={img}
                      className="room-form-img img-fluid"
                      style={{ position: "block" }}
                    />
                    {this.state.roomData.image.length > 3 && (
                      <i
                        className="room-form-img-trash text-danger fa fa-trash pt-3"
                        style={{
                          position: "absolute",
                          left: "86%",
                          bottom: "70%",
                        }}
                      ></i>
                    )}
                  </div>
                ))}
              </React.Fragment>
            )}

            {/* ADD Image */}
          </div>
        </div>
        <div className="border border-dark">
          <Map mapData={this.state.mapData} editDisabled={true} />
        </div>
      </div>
    );
  }
}

export default AdminRoomDetail;
