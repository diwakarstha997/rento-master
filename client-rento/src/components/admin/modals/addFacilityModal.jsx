import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import Joi from "joi-browser";
import facility from "../../../services/facilityService";
import React from "react";

class AddFacilityModal extends Form {
  state = {
    message: "",
    show: false,
    data: {
      name: "",
      icon: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    icon: Joi.string().label("Icon"),
  };

  reset = () => {
    this.setState({
      message: "",
      show: false,
      data: {
        name: "",
        icon: "",
      },
      errors: {},
    });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const message = await facility.addFacility(data.name, data.icon);
      this.props.message(message.data);
      this.props.status(200);
      this.setState({ show: false });

      this.setState((prevState) => {
        let data = Object.assign({}, prevState.data);
        data.name = "";
        data.icon = "";
        return { data };
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ message: ex.response.data });
      }
    }
  };

  handleClose = () => this.reset();

  handleShow = () =>
    this.setState({
      show: true,
    });

  render() {
    const { show } = this.state;

    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn-sm btn-primary float-right mx-2 mb-1 mt-2"
          onClick={this.handleShow}
        >
          Add Facility
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Facility</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.message && (
              <p className="text-danger alert-danger rounded p-2">
                {this.state.message}
              </p>
            )}
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput(
                "name",
                "Facility Name",
                true,
                "text",
                "autoFocus"
              )}

              {this.renderInput("icon", "Icon", true)}
              <p style={{ fontSize: "12px" }}>
                * Find Icons at{" "}
                <a
                  href="https://fontawesome.com/v4.7/icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  fontawesome
                </a>
              </p>
              <div className="text-center">
                {this.renderModalButton(
                  "Add",
                  "btn-primary",
                  this.handleSubmits
                )}
                {this.renderModalButton(
                  "Cancel",
                  "btn-danger",
                  this.handleClose
                )}
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddFacilityModal;
