import { Modal } from "react-bootstrap";
import Form from "../../common/form";
import Joi from "joi-browser";
import React from "react";
import { forgotPasswordEmail } from "../../../services/userService";

class SendForgetPasswordEmail extends Form {
  state = {
    show: false,
    message: "",
    errorMessage: "",
    data: {
      email: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
  };

  doSubmit = async () => {
    try {
      const { data: message } = await forgotPasswordEmail(this.state.data);
      this.setState({ message });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 404 || ex.response.status === 500)
      ) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleClose = () => {
    this.setState({ show: false });
    this.setState({
      errors: {},
      message: "",
      data: { email: "" },
    });
  };

  handleShow = () => this.setState({ show: true });

  render() {
    const { show } = this.state;

    return (
      <React.Fragment>
        <div
          className="d-flex d-xl-flex justify-content-center  text-center forgot-password"
          style={{ cursor: "pointer" }}
          onClick={this.handleShow}
        >
          <br />
          Forgot password?
        </div>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.message ? (
              <p className="my-3 text-center">
                Check Your Mail to Reset Password or <a href="/login">Login</a>
              </p>
            ) : (
              <form onSubmit={this.handleSubmit} className="mt-3">
                {this.renderInput("email", "Email", "text", "autoFocus")}
                <div className="text-center">
                  {this.renderModalButton(
                    "Send Email",
                    "btn-primary",
                    this.handleSubmits
                  )}
                </div>
                <p className="my-3 text-center">
                  Remembered Password <a href="/login">Login</a>
                </p>
              </form>
            )}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SendForgetPasswordEmail;
