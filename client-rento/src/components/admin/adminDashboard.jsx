import React, { Component } from "react";
// import SideBar from "./dashboard/sidebar";
import Index from "./dashboard/index";
import Facility from "./dashboard/facility";
import Location from "./dashboard/location";
import Users from "./dashboard/users";
import Complaint from "./dashboard/complaints";

class AdminDashboard extends Component {
  state = {
    sidebarSelect: "index",
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    if (this.props.match.params.id === "7") this.onSidebarSelect("complaints");
    document.title = "Rento Admin | Dashboard";
  }

  onSidebarSelect = (s) => {
    if (s === "index") document.title = "Rento Admin | Dashboard";
    if (s === "location") document.title = "Rento Admin | Location";
    if (s === "facility") document.title = "Rento Admin | Facility";
    if (s === "users") document.title = "Rento Admin | User Verification";
    if (s === "complaints") document.title = "Rento Admin | Complaints";
    this.setState({ sidebarSelect: s });
  };

  render() {
    return (
      <React.Fragment>
        <div id="wrapper" className={`${this.props.toggled ? "toggled" : ""}`}>
          <div id="sidebar-wrapper">
            {/* <SideBar onSidebarSelect={this.onSidebarSelect} /> */}
            <ul className="list-group">
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item"
                onClick={() => this.onSidebarSelect("index")}
              >
                Dashboard
              </li>
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item"
                onClick={() => this.onSidebarSelect("location")}
              >
                Location
              </li>
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item"
                onClick={() => this.onSidebarSelect("facility")}
              >
                Facility
              </li>
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item"
                onClick={() => this.onSidebarSelect("users")}
              >
                Verify Users
              </li>
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item"
                onClick={() => this.onSidebarSelect("complaints")}
              >
                Complaint
              </li>
            </ul>
          </div>
          <div>
            <Index sidebarSelect={this.state.sidebarSelect} />
            <Location sidebarSelect={this.state.sidebarSelect} />
            <Facility sidebarSelect={this.state.sidebarSelect} />
            <Users sidebarSelect={this.state.sidebarSelect} />
            <Complaint sidebarSelect={this.state.sidebarSelect} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
