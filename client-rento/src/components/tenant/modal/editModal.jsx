import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import Joi from "joi-browser";
import application from "../../../services/applicationService";

class EditModal extends Form {
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

  handleClose = () => {
    console.log(this.props.lable);
    this.setState({ show: false });
  };

  modalPress = () => {
    const { edit } = this.props;
    let data = this.state.data;
    data.occupation = edit.occupation;
    data.monthlyIncome = edit.monthlyIncome;
    data.emergencyContact = edit.emergencyContact;
    data.previousLocation = edit.previousLocation;
    data.reasonToLeavePreviousLocation = edit.reasonToLeavePreviousLocation;
    data.additionalComments = edit.additionalComments;

    this.setState({ show: true, data });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { edit } = this.props;
      const message = await application.editApplication(
        edit._id,
        data.occupation,
        data.monthlyIncome,
        data.emergencyContact,
        data.previousLocation,
        data.reasonToLeavePreviousLocation,
        data.additionalComments
      );
      this.props.handleMessage(message.data, this.props.tab);
      console.log(message.data);
      // this.props.status(200);
      this.setState({ show: false });
    } catch (ex) {}
  };

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          className={
            this.props.lable === "Submitted"
              ? "btn-success  btn-sm ml-2"
              : "btn-primary  btn-sm ml-2"
          }
          onClick={this.modalPress}
        >
          {this.props.lable === "Submitted" ? "Edit" : "View"}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Title>
            {this.props.lable === "Submitted"
              ? " Edit Application"
              : " View Application"}
          </Modal.Title>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.props.lable === "Submitted" ||
              this.props.lable === "Cancelled" ? (
                <React.Fragment>
                  {this.renderInput("occupation", "Occupation")}
                  {this.renderInput("monthlyIncome", "Monthly Income")}
                  {this.renderInput("emergencyContact", "Emergency Contact")}
                  {this.renderInput("previousLocation", "Previous Location")}
                  {this.renderInput(
                    "reasonToLeavePreviousLocation",
                    "Reason To Leave Previous Location"
                  )}
                  {this.renderInput(
                    "additionalComments",
                    "Additional Comments"
                  )}
                  <div className="text-center">
                    {this.props.lable === "Cancelled" ? (
                      <React.Fragment>
                        {this.renderModalButton(
                          "Re-send",
                          "btn-success",
                          this.handleSubmits
                        )}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.renderModalButton(
                          "Edit",
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
                </React.Fragment>
              ) : (
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
                    {this.props.lable === "Submitted" ? (
                      this.renderModalButton(
                        "OK",
                        "btn-secondary",
                        this.handleClose
                      )
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.handleClose}
                      >
                        Ok
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditModal;
