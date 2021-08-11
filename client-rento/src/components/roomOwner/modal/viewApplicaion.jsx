import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import Joi from "joi-browser";
import application from "../../../services/applicationService";

class ViewApplicationModal extends Form {
  state = {
    show: false,
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

  handleClose = () => this.setState({ show: false });

  modalPress = async () => {
    const { edit } = this.props;

    let data = this.state.data;
    data.occupation = edit.occupation;
    data.monthlyIncome = edit.monthlyIncome;
    data.emergencyContact = edit.emergencyContact;
    data.previousLocation = edit.previousLocation;
    data.reasonToLeavePreviousLocation = edit.reasonToLeavePreviousLocation;
    data.additionalComments = edit.additionalComments;
    if (edit.viewed === "submitted") {
      try {
        await application.applicationView2(edit._id);
        this.props.handleView(this.props.lable);
      } catch (e) {}
    }
    this.setState({ show: true, data });
  };

  doSubmit = async () => {};

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn-primary  btn-sm ml-2"
          onClick={this.modalPress}
        >
          View
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Title>View Application</Modal.Title>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="mt-3">
              <React.Fragment>
                {this.renderDisabledInput("occupation", "Occupation")}
                {this.renderDisabledInput("monthlyIncome", "Monthly Income")}
                {this.renderDisabledInput(
                  "emergencyContact",
                  "Emergency Contact"
                )}
                {this.renderDisabledInput(
                  "previousLocation",
                  "Previous Location"
                )}
                {this.renderDisabledInput(
                  "reasonToLeavePreviousLocation",
                  "Reason To Leave Previous Location"
                )}
                {this.renderDisabledInput(
                  "additionalComments",
                  "Additional Comments"
                )}
                <div className="text-center">
                  {this.renderModalButton(
                    "OK",
                    "btn-secondary",
                    this.handleClose
                  )}
                </div>
              </React.Fragment>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewApplicationModal;
