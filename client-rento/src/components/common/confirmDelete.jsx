import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class ConfirmDelete extends Component {
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
          className={
            this.props.className
              ? this.props.className
              : " btn-danger btn-sm ml-2 "
          }
          onClick={this.handleShow}
        >
          {this.props.reject
            ? "Reject"
            : this.props.cancel
            ? "Cancel"
            : "Delete"}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Confirm{" "}
              {this.props.reject
                ? "Reject"
                : this.props.cancel
                ? "Cancel"
                : "Delete"}{" "}
              ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              type="button"
              className="btn-sm btn-danger  mx-2 "
              value={this.props.value}
              onClick={
                this.props.lable
                  ? () => this.props.onClick(this.props.value, this.props.lable)
                  : this.props.onClick
              }
            >
              {this.props.reject
                ? "Reject"
                : this.props.cancel
                ? "Cancel"
                : "Delete"}
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

export default ConfirmDelete;
