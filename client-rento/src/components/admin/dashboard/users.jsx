import React, { Component } from "react";
import Message from "./message";
import user from "../../../services/userService";
import ViewVerify from "../modals/viewVerify";

class Users extends Component {
  state = {
    users: [],
    message: "",
    status: "",
  };

  async componentDidMount() {
    this.updateTable();
  }
  async updateTable() {
    const { data: users } = await user.getVerifyUser();
    this.setState({ users });
  }

  setMessage = (m) => {
    this.setState({ message: m });
    this.updateTable();
  };
  setStatus = (s) => {
    this.setState({ status: s });
  };

  handleDecline = async (e) => {
    const { data } = await user.declineUser(e.target.value);
    this.updateTable();
    this.setState({ message: data });
  };

  handleVerify = async (e) => {
    const { data } = await user.verifyUser(e.target.value);
    this.updateTable();
    this.setState({ message: data });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.sidebarSelect === "users" && (
          <div className="col ">
            <Message
              message={this.state.message}
              undoDelete={this.undoDelete}
              status={this.state.status}
            />
            <table className="table">
              <thead>
                <tr>
                  <th> Id</th>
                  <th> Name</th>
                  <th> Date Created</th>
                  <th>User Role</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.length !== 0 ? (
                  <React.Fragment>
                    {this.state.users.map((u) => (
                      <tr key={u._id}>
                        <td>{u._id}</td>
                        <td>{u.name}</td>
                        <td>{u.dateCreated.slice(0, 10)}</td>
                        <td>{u.userRole}</td>
                        <td>
                          <ViewVerify
                            data={u.documentImagePath}
                            id={u._id}
                            handleDecline={this.handleDecline}
                            handleVerify={this.handleVerify}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : (
                  "No user verify request"
                )}
              </tbody>
            </table>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Users;
