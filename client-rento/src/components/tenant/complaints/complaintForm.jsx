import React from "react";
import Joi from "joi-browser";
import { Modal } from "react-bootstrap";
import Forms from "../../common/form";
import complaint from "../../../services/complaintService";

class ComplaintForm extends Forms {
  state = {
    roomId: this.props.roomId,
    data: {
      reportType: "",
      reportDescription: "",
    },
    errors: {},
  };

  schema = {
    reportType: Joi.string().required().label("Report Type"),
    reportDescription: Joi.string()
      .min(20)
      .max(150)
      .required()
      .label("Report Description"),
  };

  doSubmit = async () => {
    try {
      await complaint.save(this.state.data, this.state.roomId);
      window.location = "/rooms/" + this.props.roomId;
    } catch (ex) {
      console.log("we are here", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.exception = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSelect = () => {};

  render() {
    const { show, handleClose } = this.props;
    if (!this.state.roomId)
      return (
        <React.Fragment>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="text-center">
              Something Went Wrong !!!
            </Modal.Body>
          </Modal>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={this.handleSubmit} className="mt-3">
            <Modal.Header closeButton>
              <Modal.Title>Room Application Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.renderSelect("reportType", "Report Type", [
                { _id: "", name: "", default: "Select Report Type" },
                { _id: 1, name: "Misleading Pictures" },
                { _id: 2, name: "Fake Rooms" },
              ])}
              {this.renderTextArea("reportDescription", "Report Description")}
              {this.state.errors.exception && (
                <div className="alert alert-danger">
                  {this.state.errors.exception}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn rento-btn btn-primary">Report</button>
              <button
                type="button"
                className="btn rento-btn-danger btn-danger"
                onClick={handleClose}
              >
                Cancel
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ComplaintForm;
