import React from "react";
import Joi from "joi-browser";
import { Modal } from "react-bootstrap";
import Forms from "../../common/form";
import complaint from "../../../services/complaintService";

class ComplaintForm extends Forms {
  state = {
    roomId: this.props.roomId,
    reportOptions: [
      { _id: "", name: "", default: "Select Report Type" },
      { _id: 1, name: "Misleading Pictures" },
      { _id: 2, name: "Fake Rooms" },
      { _id: 3, name: "Other" },
    ],
    data: {
      reportType: "",
      reportDescription: "",
    },
    errors: {},
  };

  schema = {
    reportType: Joi.string().required().label("Report Type"),
    reportDescription: Joi.string()
      .max(150)
      .required()
      .label("Report Description"),
  };

  doSubmit = async () => {
    try {
      await complaint.save(this.state.data, this.state.roomId);
      window.location = "/rooms/" + this.props.roomId;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.exception = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSelect = (e) => {
    let data = this.state.data;
    data.reportType = e.currentTarget.value;
    this.setState({ data });
  };

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
              {/* {this.renderSelect("reportType", "Report Type", [
                { _id: "", name: "", default: "Select Report Type" },
                { _id: 1, name: "Misleading Pictures" },
                { _id: 2, name: "Fake Rooms" },
              ])} */}
              <div className="form-group mt-2">
                <label htmlFor="username">
                  Report Type <i className="text-danger">*</i>
                </label>
                <select
                  name="reportType"
                  className="form-control"
                  onChange={this.handleSelect}
                >
                  {this.state.reportOptions.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name || option.default}
                    </option>
                  ))}
                </select>
                {this.state.errors.reportType && (
                  <div className="alert alert-danger">
                    {this.state.errors.reportType}
                  </div>
                )}
              </div>
              {this.renderTextArea(
                "reportDescription",
                "Report Description",
                true
              )}
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
