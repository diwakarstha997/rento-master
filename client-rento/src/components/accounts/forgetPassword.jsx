import React from "react";
import {
  changePasswordByToken,
  changePasswordTokenCheck,
} from "../../services/userService";
import Form from "../common/form";
import Joi from "joi-browser";

class ForgotPassword extends Form {
  state = {
    isValidToken: false,
    data: { newPassword: "", confirmNewPassword: "" },
    errors: {},
  };

  schema = {
    newPassword: Joi.string().min(5).max(255).required().label("New Password"),
    confirmNewPassword: Joi.string().required().label("Confirm New Password"),
  };

  async componentDidMount() {
    document.title = "Rento | Change Password";
    try {
      const { data } = await changePasswordTokenCheck(
        this.props.match.params.id
      );
      if (data) this.setState({ isValidToken: true });
    } catch (ex) {
      console.log(ex.response.data);
      window.location = "/not-confirmed";
    }
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
      const { data } = this.state;
      await changePasswordByToken(
        this.props.match.params.id,
        data.newPassword,
        data.confirmNewPassword
      );
      window.location = "/login";
    } catch (ex) {
      console.log(ex);
      console.log(ex.response.data);
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.currentPassword = ex.response.data;
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 402) {
        console.log(ex.response.data);
        const errors = { ...this.state.errors };
        errors.newPassword = ex.response.data;
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 400) {
        window.location = "/not-confirmed";
      }
    }
  };

  render() {
    if (!this.state.isValidToken) return null;
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
                {this.renderInput("newPassword", "New Password")}
                {this.renderInput("confirmNewPassword", "Confirm New Password")}

                <div className="text-right">
                  <button className="btn rento-btn">Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
