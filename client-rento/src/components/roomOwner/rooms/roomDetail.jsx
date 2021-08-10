import React, { Component } from "react";
import room, { optionalImageDelete } from "../../../services/roomService";
import ModifiedCarousel from "../../common/carousel";
import { getFacilities } from "./../../../services/facilityService";
import { optionalImageUpload } from "./../../../services/roomService";
import rooms from "../../../services/roomService";
import { getCurrentUser } from "./../../../services/authService";
import Message from "../../admin/dashboard/message";
import EditRoom from "../modal/editRoomModal";
import Map from "../../common/map";
import { getUserVerificationData } from "../../../services/userService";

class OwnerRoomDetail extends Component {
  state = {
    roomData: "",
    facilities: [],
    message: "",
    editModalState: false,
    mapData: "",
    applicationCount: "",
  };

  async componentDidMount() {
    document.title = "Rento | Room Detail";
    const { data: roomData } = await room.getOwnerRoomDetail(
      this.props.match.params.id
    );

    const { data: count } = await room.getApplicationsForRoom(
      this.props.match.params.id
    );
    const mapData = {
      lng: roomData.lng,
      lat: roomData.lat,
      zoom: roomData.zoom,
      marker: roomData.marker,
    };
    const { data: facilities } = await getFacilities();
    this.setState({ mapData, roomData, facilities, applicationCount: count });
  }

  handleImageUpload = async (e) => {
    if (!e.currentTarget.files) return;
    let imageData = [];
    for (let i = 0; i < e.currentTarget.files.length; i++) {
      if (this.state.roomData.image.length + imageData.length > 9) break;
      if (
        e.currentTarget.files[i].type === "image/jpeg" ||
        e.currentTarget.files[i].type === "image/png"
      ) {
        imageData.push(e.currentTarget.files[i]);
      }
    }
    const { data: roomData } = await optionalImageUpload(
      imageData,
      this.state.roomData._id
    );
    this.setState({ roomData });
  };

  handleImageDelete = async (imagePath) => {
    if (this.state.roomData.image.length < 4) return;
    const { data: roomData } = await optionalImageDelete(
      imagePath,
      this.state.roomData._id
    );
    this.setState({ roomData });
  };

  handleOnPublish = async (roomId) => {
    try {
      const user = await getCurrentUser();
      let uv_data;
      if (user) uv_data = getUserVerificationData();
      console.log(user, uv_data);

      if (uv_data.verified === true) {
        const { status, data } = await rooms.publishRoom(roomId);

        const { data: roomData } = await rooms.getOwnerRoomDetail(roomId);
        this.setState({ roomData });

        this.setState({ message: data, status });
      } else {
        this.setState({
          message: "Please Verify Identity to Publish Room",
          status: 202,
        });
      }
    } catch (ex) {}
  };

  handleModalChange = (state) => {
    if (!state) {
      this.setState({ editModalState: false });
    } else {
      this.setState({ editModalState: true });
    }
  };

  render() {
    const { roomData } = this.state;
    console.log(roomData);
    if (!roomData) return <h3>Loading</h3>;
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
            <h3>Reports: </h3>
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
                    </p>
                  </div>
                  <div className="col-2 my-auto mx-auto">
                    {roomData.status === "Active" ? (
                      <i
                        className="fa fa-toggle-on fa-2x text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handleOnPublish(roomData._id)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-toggle-off fa-2x text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handleOnPublish(roomData._id)}
                      ></i>
                    )}
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
                <a
                  className=" card-body"
                  style={{ color: "black" }}
                  href={"/RoomOwner/applications/"}
                >
                  <span>
                    <i className="fa fa-envelope fa-2x"></i>
                  </span>
                  <p> Total Applications : {this.state.applicationCount} </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-center" style={{ position: "relative" }}>
          <h3 className="" style={{ display: "inline-block" }}>
            Room Details:
          </h3>

          <i
            className="fa fa-pencil-square-o pt-2 room-detail-edit"
            style={{
              cursor: "pointer",
              position: "absolute",
              left: "90%",
              buttom: "90%",
            }}
            onClick={() => this.handleModalChange(true)}
          >
            {" "}
            Edit
          </i>
          <EditRoom
            data={roomData}
            show={this.state.editModalState}
            handleClose={() => this.handleModalChange(false)}
          />
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
                    onClick={() => this.handleImageDelete(img)}
                  ></i>
                )}
              </div>
            ))}
            {/* ADD Image */}
            {this.state.roomData.image.length < 10 && (
              <div
                className="room-detail-img-add m-2 p-2 rounded shadow col-lg-2 col-md-2 col-8"
                style={{ cursor: "pointer", position: "relative" }}
                onClick={(e) => this.inputElement.click()}
              >
                <img
                  alt=""
                  className="room-form-img img-fluid"
                  style={{ position: "block" }}
                />
                <i
                  className=" fa fa-plus"
                  style={{
                    position: "absolute",
                    left: "15%",
                    bottom: "50%",
                  }}
                >
                  Add Image
                </i>
                <input
                  ref={(input) => (this.inputElement = input)}
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={this.handleImageUpload}
                  className="img-upload-btn"
                  multiple
                />
              </div>
            )}
          </div>
        </div>
        <div className="border border-dark">
          <Map mapData={this.state.mapData} editDisabled={true} />
        </div>
      </div>
    );
  }
}

export default OwnerRoomDetail;
