import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class Register extends Form {
  state = {
    data: {
      userRole: "RoomOwner",
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
    userRole: Joi.required().label("User Role"),
    name: Joi.string().min(3).max(255).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().min(10).max(10).required().label("Phone"),
    password: Joi.string().min(5).max(255).required().label("Password"),
    confirm_password: Joi.string().required().label("Confirm Password"),
  };

  componentDidMount() {
    document.title = "Rento | Register";
  }

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

  handleUserRoleSelect = (e) => {
    const data = { ...this.state.data };
    data.userRole = e.currentTarget.value;
    this.setState({ data });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await userService.register(data);

      auth.loginWithJwt(
        response.headers["x-auth-token"],
        response.data.uv_token
      );

      let dest = "/";
      if (data.userRole === "Tenant") dest = "/";
      else if (data.userRole === "RoomOwner") dest = "/RoomOwner/MyRooms";

      window.location = dest;
    } catch (ex) {
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
        <div className="shadow py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12">
          <div className="my-5 mx-xl-5 mx-lg-3 mx-md-3 mx-2">
            <div className="mt-3">
              <h5 className="text-center">
                <strong>Create an account.</strong>
              </h5>
            </div>

            <form onSubmit={this.handleSubmit} className="mt-3">
              <label htmlFor="user-role">
                You are: <i className="text-danger ">*</i>
              </label>
              <br />
              <div className="row">
                <div className="col-lg d-lg-flex justify-content-lg-center">
                  <div className="my-auto">
                    <input
                      type="radio"
                      name="user-role"
                      id="RoomOwner"
                      value="RoomOwner"
                      onChange={this.handleUserRoleSelect}
                      checked={
                        !this.state.data.userRole ||
                        this.state.data.userRole === "RoomOwner"
                          ? "checked"
                          : ""
                      }
                    />{" "}
                    <label htmlFor="roomOwner">RoomOwner</label>
                  </div>
                </div>
                <div className="col-lg d-lg-flex justify-content-lg-center">
                  <div className="my-auto">
                    <input
                      className=""
                      type="radio"
                      name="user-role"
                      id="Tenant"
                      value="Tenant"
                      onChange={this.handleUserRoleSelect}
                      checked={
                        this.state.data.userRole === "Tenant" ? "checked" : ""
                      }
                    />{" "}
                    <label htmlFor="tenant">Tenant</label>
                  </div>
                </div>
              </div>
              {this.renderInput("name", "Name", true)}
              {this.renderInput("email", "Email", true)}
              {this.renderInput("phone", "Phone", true)}
              {this.renderInput("password", "Password", true)}
              {this.renderInput("confirm_password", "Confirm Password", true)}
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
