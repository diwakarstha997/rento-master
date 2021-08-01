import React, { Component } from "react";
import application from "../../../services/applicationService";

class ApplicationDetail extends Component {
  state = {
    applicationData: "",
  };

  async componentDidMount() {
    const { data: applicationData } = await application.findApplication(
      this.props.match.params.id
    );
    this.setState({ applicationData });
  }

  render() {
    const { applicationData } = this.state;
    console.log(applicationData);
    if (!applicationData) return <h3>Loading</h3>;
    return (
      <div className="d-flex justify-content-center">
        <h3>Your Application Detail to Room{applicationData.room.roomTag}</h3>
      </div>
    );
  }
}

export default ApplicationDetail;
