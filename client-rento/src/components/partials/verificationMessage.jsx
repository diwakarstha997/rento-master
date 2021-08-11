import React, { Component } from "react";
import {
  checkUserVerification,
  getUserVerificationData,
} from "../../services/userService";
import { getCurrentUser } from "./../../services/authService";

class VerificationMessage extends Component {
  state = { time: Date.now() };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkVerify = async () => {
    const user = getCurrentUser();
    if (user) await checkUserVerification(user);
  };

  render() {
    this.checkVerify();

    const user = getCurrentUser();
    let uv_data;
    if (user) uv_data = getUserVerificationData();
    return (
      <React.Fragment>
        {uv_data.isEmailActivated === false &&
          ((this.state.message && (
            <div className="d-flex justify-content-center mx-auto my-3 alert alert-success text-center admin-alert">
              <p className="my-auto">{this.state.message}</p>
            </div>
          )) || (
            <div className="d-flex justify-content-center mx-auto my-3 alert alert-danger text-center admin-alert">
              <p className="my-auto">
                Please Activate Your Email Address{" "}
                <button
                  className="btn btn-primary"
                  onClick={this.handleMailResend}
                >
                  Resend
                </button>{" "}
                verification
              </p>
            </div>
          ))}
        {uv_data.verified === false && (
          <div className="d-flex justify-content-center mx-auto my-3 alert alert-danger text-center admin-alert">
            <p className="my-auto">
              {(uv_data.declined === true && "Your documents was declined.") ||
                "Your identity is not verified."}{" "}
              Please{" "}
              <a
                className="text-danger"
                href={
                  user.userRole === "Tenant"
                    ? "/profile/verify"
                    : "/RoomOwner/profile/verify"
                }
              >
                Click there
              </a>{" "}
              to verify
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default VerificationMessage;
