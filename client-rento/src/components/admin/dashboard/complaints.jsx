import React, { Component } from "react";
import Message from "./message";
import complaint from "../../../services/complaintService";
class Complaint extends Component {
  state = {
    complaints: [],
    message: "",
    status: "",
    undo: [],
  };

  async componentDidMount() {
    this.updateTable();
  }
  async updateTable() {
    const { data: complaints } = await complaint.getComplaints();
    this.setState({ complaints });
  }

  setMessage = (m) => {
    this.setState({ message: m });
    this.updateTable();
  };
  setStatus = (s) => {
    this.setState({ status: s });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.sidebarSelect === "complaints" && (
          <div className="col">
            <Message
              message={this.state.message}
              undoDelete={this.undoDelete}
              status={this.state.status}
            />
            <table className="table">
              <thead>
                <tr>
                  <th> Id</th>
                  <th> User</th>
                  <th> Room</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.complaints.length === 0 && "No Complaints"}
                {this.state.complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c._id}</td>
                    <td>{c.userName}</td>
                    <td>{c.roomId}</td>
                    <td>
                      <a
                        className="btn btn-success btn-sm mx-1"
                        href={`/Admin/rooms/${c._id}`}
                        role="button"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Complaint;
