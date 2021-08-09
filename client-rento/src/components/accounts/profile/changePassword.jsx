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
    document.title = "Rento | Change Password";
    const { data } = await user.getProfileData();
    this.setState({ userRole: data.userRole, id: data._id });
  }

  childValidation = (name, value) => {
    const { confirmNewPassword } = this.state.data;

    if (name === "newPassword") {
      if (confirmNewPassword && confirmNewPassword !== value) {
        return "Confirm Password doesnot match Password";
      } else {
        return false;
      }
    }
  };

  customValidate = (input) => {
    let error = { details: [] };

    const { confirmNewPassword, newPassword } = this.state.data;
    if (input && input.confirmNewPassword) {
      if (newPassword !== input.confirmNewPassword) {
        error.details.push({
          path: ["confirmNewPassword"],
          message: "Confirm Password doesnot match Password",
        });
      } else {
        return false;
      }
    } else if (input && !input.confirmNewPassword) {
      return false;
    } else {
      if (confirmNewPassword && confirmNewPassword !== newPassword) {
        error.details.push({
          path: ["confirmNewPassword"],
          message: "Confirm Password doesnot match Password",
        });
      } else {
        return false;
      }
    }

    return error;
  };

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
      console.log(ex.response.data);
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.currentPassword = ex.response.data;
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        const errors = { ...this.state.errors };
        errors.newPassword = ex.response.data;
        this.setState({ errors });
      }
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
