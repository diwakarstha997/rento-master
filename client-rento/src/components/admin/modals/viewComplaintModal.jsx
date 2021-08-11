import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../../common/form";
import facility from "../../../services/facilityService";
import Joi from "joi-browser";
import city from "../../../services/locationService";
import Complaint from "../dashboard/complaints";
import complaint from "../../../services/complaintService";

class ViewComplaintModal extends Form {
  state = {
    show: false,
    data: {
      dateSubmitted: "",
      userName: "",
      roomId: "",
      reportType: "",
      reportDescription: "",
    },
    errors: {},
  };

  handleClose = () => this.setState({ show: false });

  modalPress = () => {
    const { data: complaints } = this.props;
    let data = this.state.data;
    data.dateSubmitted = complaints.dateSubmitted.slice(0, 10);
    data.userName = complaints.userName;
    data.roomId = complaints.roomId;
    data.reportType = complaints.reportType;
    data.reportDescription = complaints.reportDescription;
    this.setState({ show: true, data });
  };

  handleApprove = async () => {
    const { data } = await complaint.approve(this.props.data._id);
    this.props.setMessage(data);
    this.setState({ show: false });
  };

  handleReject = async () => {
    const { data } = await complaint.reject(this.props.data._id);
    this.props.setMessage(data);
    this.setState({ show: false });
  };

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn-sm btn-success float-right mx-3 mb-2"
          onClick={this.modalPress}
        >
          View
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleClose} className="mt-3">
              {this.renderDisabledInput("dateSubmitted", "Date Submitted")}
              {this.renderDisabledInput("userName", "User Name")}
              <a
                href={`rooms/${data.room}`}
                role="button"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                {this.renderDisabledInput("roomId", "RoomId")}
              </a>

              {this.renderDisabledInput("reportType", "Report Type")}
              {this.renderDisabledInput(
                "reportDescription",
                "Report Description"
              )}
              <div className="text-center">
                {/* {this.renderModalButton(
                  "Approve",
                  "btn-primary",
                  this.handleSubmits
                )}
                {this.renderModalButton(
                  "Reject",
                  "btn-danger",
                  this.handleClose
                )} */}
              </div>
            </form>
            <button
              className="btn btn-danger btn mx-1"
              onClick={this.handleApprove}
            >
              Approve
            </button>
            <button
              className="btn btn-secondary btn mx-1"
              onClick={this.handleReject}
            >
              Reject
            </button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewComplaintModal;
