import React, { Component } from "react";
import SideBar from "./dashboard/sidebar";
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
        <div className="row">
          <SideBar onSidebarSelect={this.onSidebarSelect} />
          <Index sidebarSelect={this.state.sidebarSelect} />
          <Location sidebarSelect={this.state.sidebarSelect} />
          <Facility sidebarSelect={this.state.sidebarSelect} />
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
