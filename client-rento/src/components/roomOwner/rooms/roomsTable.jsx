import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import ConfirmDelete from "../../common/confirmDelete";
// import EditRoom from "../modal/editRoomModal";
import EditRoom from "../modal/editRoomModal";

class RoomTable extends Component {
  state = {
    path: "",
    editModalState: false,
  };

  handleModalChange = (state, path = "") => {
    if (!state) {
      this.setState({ path, editModalState: false });
    } else {
      this.setState({ path, editModalState: true });
    }
  };

  handleEditClick = (room) => {
    this.setState({ room });
    this.handleModalChange(true);
  };
  columns = [
    {
      path: "roomNumber",
      label: "Room No.",
      visibility: true,
      content: (room) => (
        <Link to={`/Roomowner/room/${room._id}`}>{room.roomTag}</Link>
      ),
    },
    { path: "city", visibility: true, label: "City" },
    { path: "location", visibility: true, label: "Location" },
    { path: "monthlyRent", visibility: true, label: "Monthly Rent" },
    {
      key: "delete",
      visibility: true,
      content: (room) => (
        <React.Fragment>
          <div className="text-center">
            <i
              className="fa fa-pencil-square-o pt-2 btn btn-primary"
              style={{
                cursor: "pointer",
              }}
              onClick={() => this.handleModalChange(true, room._id)}
            >
              {" "}
              Edit
            </i>
            <EditRoom
              data={room}
              show={this.state.editModalState && this.state.path === room._id}
              handleClose={() => this.handleModalChange(false)}
            />
            {/* <EditRoom edit={room} /> */}
            <ConfirmDelete
              value={room._id}
              onClick={this.props.doDelete}
              className="btn btn-danger btn-sm ml-2"
            />
            {room.status === "Inactive" ? (
              <button
                onClick={() => this.props.onPublish(room._id)}
                className="btn btn-success btn-sm ml-2"
              >
                Publish
              </button>
            ) : (
              <button
                onClick={() => this.props.onPublish(room._id)}
                className="btn btn-danger btn-sm ml-2"
              >
                Hide
              </button>
            )}
          </div>
        </React.Fragment>
      ),
      label: "Action",
    },
    {
      key: "status",
      content: (room) => room.status,
      visibility: true,
      label: "Status",
    },
  ];

  render() {
    const { rooms, sortColumn, onSort } = this.props;
    console.log(rooms);
    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          data={rooms}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        {/* {this.state.editModalState && (
          <EditRoom
            data={this.state.room}
            show={this.state.editModalState}
            handleClose={() => this.handleModalChange(false)}
          />
        )} */}
      </React.Fragment>
    );
  }
}

export default RoomTable;
