import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ApproveModal extends Component {
  state = {
    show: false,
  };

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className=" btn-success  btn-sm ml-2"
          onClick={this.handleShow}
        >
          Approve
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Approve ? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger">
              Are you sure you wint to approve this appilcation
            </p>
            <p className="text-danger">
              Your contact details will be shared with tennant
            </p>
            <Button
              type="button"
              className="btn-sm btn-danger  mx-2 "
              value={this.props.value}
              onClick={this.props.onClick}
            >
              Approve
            </Button>
            <Button
              type="button"
              className="btn-sm btn-secondary  mx-2 "
              onClick={this.handleClose}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ApproveModal;
