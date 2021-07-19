import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    errorChildRef: {
      password: "confirm_password",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).max(255).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().min(10).max(10).required().label("Phone"),
    password: Joi.string().min(5).max(255).required().label("Password"),
    confirm_password: Joi.string().required().label("Confirm Password"),
  };

  childValidation = (name, value) => {
    const { confirm_password } = this.state.data;

    if (name === "password") {
      if (confirm_password && confirm_password !== value) {
        return "Confirm Password doesnot match Password";
      } else {
        return false;
      }
    }
  };

  customValidate = (input) => {
    let error = { details: [] };

    const { confirm_password, password } = this.state.data;
    if (input && input.confirm_password) {
      if (password !== input.confirm_password) {
        error.details.push({
          path: ["confirm_password"],
          message: "Confirm Password doesnot match Password",
        });
      } else {
        return false;
      }
    } else if (input && !input.confirm_password) {
      return false;
    } else {
      if (confirm_password && confirm_password !== password) {
        error.details.push({
          path: ["confirm_password"],
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
      const response = await userService.register(this.state.data);
      console.log("we are here", response.headers);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/rento/rooms";
    } catch (ex) {
      console.log("we are here", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
        <div className="py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12">
          <div className="my-5 mx-xl-5 mx-lg-3 mx-md-3 mx-2">
            <div className="mt-3">
              <h5 className="text-center">
                <strong>Create an account.</strong>
              </h5>
            </div>

            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput("name", "Name", "mb-3")}
              {this.renderInput("email", "Email", "mb-3")}
              {this.renderInput("phone", "Phone", "mb-3")}
              {this.renderInput("password", "Password", "mb-3")}
              {this.renderInput("confirm_password", "Confirm Password", "mb-4")}
              {this.renderButton("Register")}
            </form>

            <div className="mt-3">
              <p className="text-center">
                Already have an account
                <br />
                &nbsp;<a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
