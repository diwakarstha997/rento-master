import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { getRoomById } from "../../../services/roomService";
import Map from "../../common/map";
import application from "../../../services/applicationService";

class Contact extends Component {
  state = {
    show: false,
    // mapData: "",
  };

  async componentDidMount() {}

  handleOpen = async () => {
    try {
      if (this.props.viewed === "false") {
        await application.applicationView(this.props.id);
        if (this.props.handleView) {
          this.props.handleView();
        }
      }

      const { data: roomData } = await getRoomById(this.props.roomId);
      // const mapData = {
      //   lng: roomData.lng,
      //   lat: roomData.lat,
      //   zoom: roomData.zoom,
      //   marker: roomData.marker,
      // };
      // this.setState({ mapData });

      this.setState({ show: true });
    } catch (error) {}
  };

  handleClose = () => this.setState({ show: false });

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className={
            this.props.handleView
              ? "btn-success  btn-sm ml-2"
              : "btn-success  btn mr-2"
          }
          onClick={this.handleOpen}
        >
          Contact
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Title>Contact RoomOwner</Modal.Title>
          <Modal.Body>
            <div className="p-3 mb-2">
              <label forhtml="contact">Contact: </label>{" "}
              <a name="contact" href={`tel:+977-${this.props.contact}`}>
                +977-{this.props.contact}
              </a>
            </div>
            {/* <div className="border border-dark">
              <Map mapData={this.state.mapData} editDisabled={true} />
            </div> */}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Contact;
