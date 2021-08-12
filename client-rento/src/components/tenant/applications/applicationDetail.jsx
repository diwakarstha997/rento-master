import React, { Component } from "react";
import application from "../../../services/applicationService";

class ApplicationDetail extends Component {
  state = {
    applicationData: "",
  };

  async componentDidMount() {
    document.title = "Rento | Application Detail";
    try {
      const { data: applicationData } = await application.findApplication(
        this.props.match.params.id
      );
      this.setState({ applicationData });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        window.location = "/not-found";
      }
    }
  }

  render() {
    const { applicationData } = this.state;
    if (!applicationData) return null;
    return (
      <div className="d-flex justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h3 className="text-center">
            Application Detail to Room{" "}
            {applicationData.room && (
              <a href={"/rooms/" + applicationData.room._id}>
                {applicationData.room.roomTag}
              </a>
            )}
          </h3>
          <div
            className="card shadow mt-3 px-5"
            style={{ backgroundColor: "rgb(227, 238, 255)" }}
          >
            <div className="card-body">
              <div className="row mt-4">
                <div className="col-lg col-md">
                  <label htmlFor="dateSubmitted">Date Submitted:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.dateSubmitted.substring(0, 10)}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="occupation">Occupation:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.occupation}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="emergencyContact">Emergency Contact:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.emergencyContact}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="monthlyIncome">Monthly Income:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.monthlyIncome}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="monthlyIncome">Monthly Income:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.monthlyIncome}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="previousLocation">Previous Location:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.previousLocation}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="reasonToLeavePreviousLocation">
                    Reason To Leave Previous Location:
                  </label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.reasonToLeavePreviousLocation}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="status">Status:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{applicationData.status}</p>
                </div>
              </div>

              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationDetail;
