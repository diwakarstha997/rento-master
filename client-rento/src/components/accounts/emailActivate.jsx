import React, { Component } from "react";
import { activateEmail } from "../../services/userService";

class EmailActivate extends Component {
  state = {
    message: "",
    status: "",
  };
  componentDidMount = async () => {
    try {
      const { data: message } = await activateEmail(this.props.match.params.id);
      this.setState({ message, status: 200 });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ message: "Invalid Confirmation Link", status: 400 });
      }
    }
  };
  render() {
    return (
      <h1 className={this.state.status === 200 ? "bg-success" : "bg-danger"}>
        {this.state.message}
      </h1>
    );
  }
}

export default EmailActivate;
