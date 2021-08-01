import React, { Component } from "react";
// import SideBar from "./dashboard/sidebar";
import Index from "./dashboard/index";
import Facility from "./dashboard/facility";
import Location from "./dashboard/location";

class AdminDashboard extends Component {
  state = {
    sidebarSelect: "index",
  };

  onSidebarSelect = (s) => {
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
            </ul>
          </div>
          <div>
            <Index sidebarSelect={this.state.sidebarSelect} />
            <Location sidebarSelect={this.state.sidebarSelect} />
            <Facility sidebarSelect={this.state.sidebarSelect} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
