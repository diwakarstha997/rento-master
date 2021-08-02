import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";

class ChangePassword extends Form {
  state = {
    data: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
    errors: {},
  };

  schema = {
    currentPassword: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Current Password"),
    newPassword: Joi.string().min(5).max(255).required().label("New Password"),
    confirmNewPassword: Joi.string().required().label("Confirm New Password"),
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h3 className="text-center">Change Password</h3>
          <div
            className="card shadow mt-3 px-5"
            style={{ backgroundColor: "rgb(227, 238, 255)" }}
          >
            <div className="card-body">
              {this.renderInput("currentPassword", "Current Password")}
              {this.renderInput("newPassword", "New Password")}
              {this.renderInput("confirmNewPassword", "Confirm New Password")}

              <div className="text-right">
                <button className="btn rento-btn">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
