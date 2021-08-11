import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class HandleComplaint extends Component {
  state = {
    show: false,
    value: 7,
  };

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });
  render() {
    {
      return (
        <React.Fragment>
          <Button
            type="button"
            className={this.props.button}
            onClick={this.handleShow}
          >
            {this.props.title}
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm {this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <a
                className="btn btn-danger btn ml-4"
                onClick={this.props.onClick}
                href={`/Admin/dashboard/${this.state.value}`}
              >
                {this.props.title}
              </a>
              <Button
                type="button"
                className="btn btn-secondary  ml-2 "
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
}

export default HandleComplaint;
