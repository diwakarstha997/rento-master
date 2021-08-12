import React, { Component } from "react";
import { activateEmail } from "../../services/userService";

class EmailActivate extends Component {
  state = {
    message: "",
    status: "",
  };
  componentDidMount = async () => {
    document.title = "Rento | Email Activation";
    try {
      const { data: message } = await activateEmail(this.props.match.params.id);
      this.setState({ message, status: 200 });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ message: ex.response.data, status: 400 });
      }
    }
  };
  render() {
    return (
      <h3
        className={`text-center rounded p-4 ${
          this.state.status === 200 ? "alert-success" : "alert-danger"
        }`}
      >
        {this.state.message}
      </h3>
    );
  }
}

export default EmailActivate;
