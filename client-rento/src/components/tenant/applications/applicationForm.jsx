import React from "react";
import Joi from "joi-browser";
import { Modal } from "react-bootstrap";
import Forms from "../../common/form";
import application from "../../../services/applicationService";

class ApplicationForm extends Forms {
  state = {
    roomId: this.props.roomId,
    message: "",
    data: {
      occupation: "",
      monthlyIncome: "",
      emergencyContact: "",
      previousLocation: "",
      reasonToLeavePreviousLocation: "",
      additionalComments: "",
      pets: "",
      noOfRoomMates: "",
      noOfChildrens: "",
    },
    errors: {},
  };

  schema = {
    occupation: Joi.string().required().label("Occupation"),
    monthlyIncome: Joi.number().required().label("Monthly Income"),
    pets: Joi.string().allow("").optional().label("Pets"),
    noOfRoomMates: Joi.number()
      .allow("")
      .optional()
      .label("Number of Roomates"),
    noOfChildrens: Joi.number()
      .allow("")
      .optional()
      .label("Number of Childrens"),
    emergencyContact: Joi.string()
      .min(10)
      .max(10)
      .required()
      .label("Emergency Contact"),
    previousLocation: Joi.string().required().label("Previous Location"),
    reasonToLeavePreviousLocation: Joi.string()
      .max(500)
      .required()
      .label("Reason to Leave"),
    additionalComments: Joi.string()
      .max(500)
      .allow("")
      .optional()
      .label("Additional Comments"),
  };

  componentDidMount() {}

  handleModalClose = () => {
    const data = { ...this.state.data };
    data.occupation = "";
    data.monthlyIncome = "";
    data.emergencyContact = "";
    data.previousLocation = "";
    data.reasonToLeavePreviousLocation = "";
    data.additionalComments = "";
    data.pets = "";
    data.noOfRoomMates = "";
    data.noOfChildrens = "";
    this.setState({
      roomId: this.props.roomId,
      message: "",
      data,
      errors: {},
    });
    this.props.handleClose();
  };

  doSubmit = async () => {
    try {
      await application.save(this.state.data, this.state.roomId);
      window.location = "/MyApplications";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const message = ex.response.data;
        this.setState({ message });
      }
    }
  };

  render() {
    const { show } = this.props;
    return (
      <React.Fragment>
        <Modal show={show} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Room Application Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderInput("occupation", "Occupation", true)}
            {this.renderNumberInput("monthlyIncome", "Monthly Income", true)}
            {this.renderNumberInput(
              "emergencyContact",
              "Emergency Contact",
              true,
              false,
              9
            )}
            {this.renderInput("previousLocation", "Previous Location", true)}
            {this.renderTextArea(
              "reasonToLeavePreviousLocation",
              "Reason To Leave Previous Location",
              true
            )}

            {this.renderInput("noOfRoomMates", "Number of Roomates")}
            {this.renderInput("noOfChildrens", "Any Childrens ? If so mention")}
            {this.renderInput("pets", "Any Pets ? If so mention")}
            {this.renderTextArea("additionalComments", "Additional Comments")}
            {this.state.message && (
              <div className="alert alert-danger">{this.state.message}</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn rento-btn btn-primary"
              onClick={this.handleSubmit}
            >
              Apply
            </button>
            <button
              type="button"
              className="btn rento-btn-danger btn-danger"
              onClick={this.handleModalClose}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ApplicationForm;
