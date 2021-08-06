import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import Joi from "joi-browser";

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

  modalPress = () => {
    const { edit } = this.props;
    console.log(edit);
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
    console.log("call services");
    //   try {
    //   pull state data
    //   call backend service
    //   send message to props
    //     const { data } = this.state;
    //     const { edit } = this.props;
    //     if (edit.icon) {
    //       const message = await facility.editFacility(
    //         edit._id,
    //         data.name,
    //         data.value
    //       );
    //       this.props.message(message.data);
    //     }
    //     if (edit.totalWard) {
    //       const message = await city.editCity(edit._id, data.name, data.value);
    //       this.props.message(message.data);
    //     }
    //     this.props.status(200);
    //     this.setState({ show: false });

    //     this.setState((prevState) => {
    //       let data = Object.assign({}, prevState.data);
    //       data.name = "";
    //       data.value = "";
    //       return { data };
    //     });
    //   } catch (ex) {}
  };

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
