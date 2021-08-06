import React from "react";
import Joi from "joi-browser";
import { Modal } from "react-bootstrap";
import Forms from "../../common/form";
import application from "../../../services/applicationService";

class ApplicationForm extends Forms {
  state = {
    roomId: this.props.roomId,
    data: {
      occupation: "",
      monthlyIncome: "",
      emergencyContact: "",
      previousLocation: "",
      reasonToLeavePreviousLocation: "",
      additionalComments: "",
    },
    errors: {},
  };

  schema = {
    occupation: Joi.string().required().label("Occupation"),
    monthlyIncome: Joi.number().required().label("Monthly Income"),
    emergencyContact: Joi.string()
      .min(10)
      .max(10)
      .required()
      .label("Emergency Contact"),
    previousLocation: Joi.string().required().label("Previous Location"),
    reasonToLeavePreviousLocation: Joi.string()
      .min(20)
      .max(500)
      .required()
      .label("Reason to Leave"),
    additionalComments: Joi.string()
      .min(20)
      .max(500)
      .required()
      .label("Additional Comments"),
  };

  componentDidMount() {}

  doSubmit = async () => {
    try {
      await application.save(this.state.data, this.state.roomId);
      window.location = "/MyApplications";
    } catch (ex) {
      console.log("we are here", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.exception = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { show, handleClose } = this.props;
    // const applicationData = checkExistingApplication(this.state.roomId);
    // // const applicationData = true;
    // console.log(applicationData);

    // if (applicationData === true)
    //   return (
    //     <Modal show={show} onHide={handleClose}>
    //       <Modal.Header closeButton></Modal.Header>
    //       <Modal.Body className="text-center">
    //         Application Already Submitted!!!
    //       </Modal.Body>
    //     </Modal>
    //   );

    return (
      <React.Fragment>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Room Application Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderInput("occupation", "Occupation")}
            {this.renderNumberInput("monthlyIncome", "Monthly Income")}
            {this.renderNumberInput(
              "emergencyContact",
              "Emergency Contact",
              false,
              9
            )}
            {this.renderInput("previousLocation", "Previous Location")}
            {this.renderTextArea(
              "reasonToLeavePreviousLocation",
              "Reason To Leave Previous Location"
            )}
            {this.renderTextArea("additionalComments", "Additional Comments")}
            {this.state.errors.exception && (
              <div className="alert alert-danger">
                {this.state.errors.exception}
              </div>
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
              onClick={handleClose}
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
