import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class Contact extends Component {
  state = {
    show: false,
  };

  handleOpen = () => this.setState({ show: true });

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
            <div class="p-3 mb-2 bg-success text-white">
              {this.props.contact}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Contact;
