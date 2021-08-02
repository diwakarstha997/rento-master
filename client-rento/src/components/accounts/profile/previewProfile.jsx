import React, { Component } from "react";
import { getProfileData } from "../../../services/userService";

class PreviewProfile extends Component {
  state = {
    profileData: "",
  };

  async componentDidMount() {
    const { data: profileData } = await getProfileData();
    this.setState({ profileData });
  }

  render() {
    const { profileData } = this.state;
    const { handleActive } = this.props;
    if (!profileData) return <h1 className="text-center">Loading</h1>;
    return (
      <div className="d-flex justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h3 className="text-center">{profileData.name}'s Profile</h3>
          <div
            className="card shadow mt-3 px-5"
            style={{ backgroundColor: "rgb(227, 238, 255)" }}
          >
            <div className="card-body">
              <div className="row mt-4">
                <div className="col-lg col-md">
                  <label htmlFor="name">Name:</label>
                </div>
                <div className="col-lg col-md">{profileData.name}</div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="email">Email:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{profileData.email}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-lg col-md">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                </div>
                <div className="col-lg col-md">
                  <p>{profileData.phone}</p>
                </div>
              </div>

              <hr />

              <div className="text-right">
                <button
                  className="btn rento-btn"
                  onClick={() => handleActive("edit")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewProfile;
