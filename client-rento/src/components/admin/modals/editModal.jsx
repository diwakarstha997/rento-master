import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import facility from "../../../services/facilityService";
import Joi from "joi-browser";
import city from "../../../services/locationService";

class EditModal extends Form {
  state = {
    show: false,
    data: {
      name: "",
      value: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    value: this.props.schema,
  };

  handleClose = () => this.setState({ show: false });

  modalPress = () => {
    const { edit } = this.props;
    let data = this.state.data;
    data.name = edit.name;
    if (edit.icon) data.value = edit.icon;
    if (edit.totalWard) data.value = edit.totalWard;
    this.setState({ show: true, data });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { edit } = this.props;
      if (edit.icon) {
        const message = await facility.editFacility(
          edit._id,
          data.name,
          data.value
        );
        this.props.message(message.data);
      }
      if (edit.totalWard) {
        const message = await city.editCity(edit._id, data.name, data.value);
        this.props.message(message.data);
      }
      this.props.status(200);
      this.setState({ show: false });

      this.setState((prevState) => {
        let data = Object.assign({}, prevState.data);
        data.name = "";
        data.value = "";
        return { data };
      });
    } catch (ex) {}
  };

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn-sm btn-success float-right mx-3 mb-2"
          onClick={this.modalPress}
        >
          Edit
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`Edit ${this.props.tag}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput(
                "name",
                `${this.props.nTag} Name`,
                "text",
                "autoFocus"
              )}
              {this.renderInput("value", `${this.props.vTag}`)}
              <div className="text-center">
                {this.props.nTag === "Facility" ||
                this.props.nTag === "City" ? (
                  <React.Fragment>
                    {this.renderModalButton(
                      "Edit",
                      "btn-primary",
                      this.handleSubmits
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.renderModalButton(
                      "Add",
                      "btn-primary",
                      this.handleSubmits
                    )}
                  </React.Fragment>
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

export default EditModal;
