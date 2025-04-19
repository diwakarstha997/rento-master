import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

const imageServer = process.env.REACT_APP_IMAGE_SERVER;

class ViewVerify extends Component {
  state = {
    show: false,
  };

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });
  
  render() {
    console.log(imageServer);
    return (
      <React.Fragment>
        <Button
          type="button"
          className=" btn-primary btn-sm ml-2 "
          onClick={this.handleShow}
        >
          View
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="d-block w-100"
              src={`${imageServer}/${this.props.data}`}
              style={{ height: 600 }}
              alt="Document"
            />
            <Button
              type="button"
              className="btn-sm btn-success mt-3 mx-2 "
              value={this.props.id}
              onClick={this.props.handleVerify}
            >
              Verify
            </Button>
            <Button
              type="button"
              className="btn-sm btn-danger mt-3 mx-2 "
              value={this.props.id}
              onClick={this.props.handleDecline}
            >
              Decline
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewVerify;
