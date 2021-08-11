import React, { Component } from "react";
import AddCityModal from "../modals/addCityModal";
import city from "../../../services/locationService";
import Message from "./message";
import ConfirmDelete from "../../common/confirmDelete";
import EditModal from "../modals/editModal";
import Joi from "joi-browser";

class Location extends Component {
  state = {
    location: [],
    message: "",
    status: "",
    undo: [],
  };

  async componentDidMount() {
    this.updateTable();
  }

  async updateTable() {
    const { data: location } = await city.getCities();
    this.setState({ location });
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
        {this.props.sidebarSelect === "location" && (
          <div className="col">
            <AddCityModal message={this.setMessage} status={this.setStatus} />
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
                  <th> Wards NO</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.location.map((l) => (
                  <tr key={l._id}>
                    <td>{l._id}</td>
                    <td>{l.name}</td>
                    <td>{l.totalWard}</td>
                    <td>
                      {/* <ConfirmDelete value={l._id} onClick={this.doDelete} /> */}
                      <EditModal
                        edit={l}
                        message={this.setMessage}
                        status={this.setStatus}
                        nTag={"City"}
                        vTag={"Total no of Wards"}
                        schema={Joi.number()
                          .integer()
                          .min(25)
                          .max(200)
                          .required()
                          .label("TotalWard")}
                      />
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

export default Location;
