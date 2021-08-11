import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";

class AdminLogin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    document.title = "Rento | Admin Login";
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.adminLogin(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/admin/dashboard";
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
        <div className="py-3 mx-auto justify-content-center bg-light col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12">
          <div className="my-5 mx-xl-5 mx-lg-3 mx-md-3 mx-2">
            <h4 className="text-center">Admin Login</h4>
            <i className="fa fa-lock d-flex justify-content-center m-auto fa-3x mt-4 rento-text text-center"></i>
            {this.props.location.state && (
              <p
                className="text-center p-2"
                style={{
                  background: "rgba(255, 0, 0, 0.3)",
                  borderRadius: "5px",
                }}
              >
                {this.props.location.state.message}
              </p>
            )}
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput("email", "Email", true, "text", "autoFocus")}
              {this.renderInput("password", "Password", true, "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
