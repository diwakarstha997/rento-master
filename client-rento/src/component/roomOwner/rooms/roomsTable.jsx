import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class RoomTable extends Component {
  columns = [
    {
      path: "roomNumber",
      label: "Room No.",
      visibility: true,
      content: (room) => <Link to={`/movies/${room._id}`}>{room.roomTag}</Link>,
    },
    { path: "city", visibility: true, label: "City" },
    { path: "location", visibility: true, label: "Location" },
    { path: "monthlyRent", visibility: true, label: "Monthly Rent" },
    {
      key: "delete",
      visibility: true,
      content: (movie) => (
        <React.Fragment>
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm ml-2"
          >
            Delete
          </button>
        </React.Fragment>
      ),
      label: "Action",
    },
    { path: "status", visibility: true, label: "Status" },
  ];

  render() {
    const { rooms, sortColumn, onSort } = this.props;
    console.log(rooms);
    return (
      <Table
        columns={this.columns}
        data={rooms}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RoomTable;
