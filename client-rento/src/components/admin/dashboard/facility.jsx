import React, { Component } from "react";
import AddFacilityModal from "../modals/addFacilityModal";
import facility from "../../../services/facilityService";
import Message from "./message";
import EditModal from "../modals/editModal";
import ConfirmDelete from "../../common/confirmDelete";
import Joi from "joi-browser";

class Facility extends Component {
  state = {
    facilities: [],
    message: "",
    status: "",
    undo: [],
  };

  async componentDidMount() {
    this.updateTable();
  }
  async updateTable() {
    const { data: facilities } = await facility.getFacilities();
    this.setState({ facilities });
  }

  doDelete = async (e) => {
    try {
      const { status, data } = await facility.deleteFacility(e.target.value);
      const message = data.name + " Facility was sucessefully deleted ";
      this.setState({ message, undo: data, status });
      this.updateTable();
    } catch (ex) {}
  };
  undoDelete = async () => {
    try {
      const { undo } = this.state;
      await facility.addFacility(undo.name, undo.icon);
      this.updateTable();
      this.setState({ undo: [], message: "" });
    } catch (ex) {}
  };

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
        {this.props.sidebarSelect === "facility" && (
          <div className="col">
            <AddFacilityModal
              message={this.setMessage}
              status={this.setStatus}
            />
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
                  <th> Icon</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.facilities.map((f) => (
                  <tr key={f._id}>
                    <td>{f._id}</td>
                    <td>{f.name}</td>
                    <td>
                      <i className={`fa ${f.icon}`}></i>
                    </td>
                    <td>
                      <ConfirmDelete
                        className="btn-danger btn-sm ml-2 float-right"
                        value={f._id}
                        onClick={this.doDelete}
                      />
                      <EditModal
                        edit={f}
                        message={this.setMessage}
                        status={this.setStatus}
                        nTag={"Facility"}
                        vTag={"Icon"}
                        schema={Joi.string().label("Icon")}
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

export default Facility;
