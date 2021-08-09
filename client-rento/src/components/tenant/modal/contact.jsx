import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import application from "../../../services/applicationService";

class Contact extends Component {
  state = {
    show: false,
  };

  handleOpen = async () => {
    if (this.props.viewed === "false") {
      await application.applicationView(this.props.id);
      if (this.props.handleView) {
        this.props.handleView();
      }
    }
    this.setState({ show: true });
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
            <div className="p-3 mb-2 bg-success text-white">
              {this.props.contact}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Contact;
