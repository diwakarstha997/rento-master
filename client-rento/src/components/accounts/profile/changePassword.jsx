import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import user from "../../../services/userService";

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

  async componentDidMount() {
    const { data } = await user.getProfileData();
    this.setState({ userRole: data.userRole, id: data._id });
  }

  doSubmit = async () => {
    try {
      const { data, id, userRole } = this.state;
      const value = await user.changePassword(
        id,
        userRole,
        data.currentPassword,
        data.newPassword,
        data.confirmNewPassword
      );
      this.props.handleActive("preview");
      this.props.message(value.data);
    } catch (ex) {
      console.log(ex);
    }
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
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("currentPassword", "Current Password")}
                {this.renderInput("newPassword", "New Password")}
                {this.renderInput("confirmNewPassword", "Confirm New Password")}

                <div className="text-right">
                  <button className="btn rento-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
