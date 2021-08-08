import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { getRoomById } from "../../../services/roomService";
import Map from "../../common/map";

class Contact extends Component {
  state = {
    show: false,
    mapData: "",
  };

  async componentDidMount() {}

  handleOpen = async () => {
    console.log(this.props.roomId);
    const { data: roomData } = await getRoomById(this.props.roomId);
    const mapData = {
      lng: roomData.lng,
      lat: roomData.lat,
      zoom: roomData.zoom,
      marker: roomData.marker,
    };
    this.setState({ mapData });
    console.log(mapData);
    this.setState({ show: true });
  };

  handleClose = () => this.setState({ show: false });

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn-success  btn-sm ml-2"
          onClick={this.handleOpen}
        >
          Contact
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Title>Contact RoomOwner</Modal.Title>
          <Modal.Body>
            <div class="p-3 mb-2">
              <label forHtml="contact">Contact: </label>{" "}
              <a name="contact" href={`tel:+977-${this.props.contact}`}>
                +977-{this.props.contact}
              </a>
            </div>
            <div className="border border-dark">
              <Map mapData={this.state.mapData} editDisabled={true} />
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Contact;
