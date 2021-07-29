import React, { Component } from "react";

class SideBar extends Component {
  render() {
    return (
      <div className="col-3 ">
        <ul className="list-group">
          <li
            style={{ cursor: "pointer" }}
            className="list-group-item"
            onClick={() => this.props.onSidebarSelect("index")}
          >
            Dashboard
          </li>
          <li
            style={{ cursor: "pointer" }}
            className="list-group-item"
            onClick={() => this.props.onSidebarSelect("location")}
          >
            Location
          </li>
          <li
            style={{ cursor: "pointer" }}
            className="list-group-item"
            onClick={() => this.props.onSidebarSelect("facility")}
          >
            Facility
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
