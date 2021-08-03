import React, { Component } from "react";
import _ from "lodash";
import Search from "./../common/search";
// import Pagination from "../common/pagination";
import rooms from "../../services/roomService";
// import { getRoomsByUser } from "../../services/roomService";
import RoomTable from "./rooms/roomsTable";
import Message from "../admin/dashboard/message";

class Dashboard extends Component {
  state = {
    rooms: [],
    message: "",
    status: "",
    searchQuery: "",
    sortColumn: { path: "roomNumber", order: "asc" },
  };

  async componentDidMount() {
    const { data: userRooms } = await rooms.getRoomsByUser();
    this.setState({ rooms: userRooms });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  };

  handleMessage = async (m) => {
    const { data: userRooms } = await rooms.getRoomsByUser();
    this.setState({ message: m.data, status: m.status, rooms: userRooms });
  };

  doDelete = async (e) => {
    try {
      const { status, data } = await rooms.deleteRoom(e.target.value);

      const { data: userRooms } = await rooms.getRoomsByUser();
      this.setState({ rooms: userRooms });

      this.setState({ message: data, status });
    } catch (ex) {}
  };

  onPublish = async (v) => {
    try {
      const { status, data } = await rooms.publishRoom(v);

      const { data: userRooms } = await rooms.getRoomsByUser();
      this.setState({ rooms: userRooms });

      this.setState({ message: data, status });
    } catch (ex) {}
  };

  render() {
    const { rooms, searchQuery, sortColumn } = this.state;
    const sortedRooms = _.orderBy(rooms, [sortColumn.path], [sortColumn.order]);
    return (
      <div>
        <div className="row" style={{ margin: "0 5% 0 5%" }}>
          <div className="col ">
            <h2>Rooms</h2>
          </div>
          <div className="col my-auto d-flex justify-content-end ">
            <span>
              <i className="fa fa-plus mr-2"></i>
              <a className="text-dark" href="/RoomOwner/rooms/new">
                Add Room
              </a>
            </span>
          </div>
        </div>
        <div
          className="row bg-light shadow-sm p-3 mb-5 rounded"
          style={{ margin: "0 5% 0 5%" }}
        >
          <div className="my-2 col-lg col-md d-flex justify-content-lg-start justify-content-md-start justify-content-center">
            <ul className="nav" style={{ listStyleType: "none" }}>
              <li className=" mx-2">
                <a className="text-dark" href="/">
                  All
                </a>
              </li>
              <li className="text-dark mx-2">
                <a className="text-dark" href="/">
                  For Rent
                </a>
              </li>
              <li className="text-dark mx-2">
                <a className="text-dark" href="/">
                  Inactive
                </a>
              </li>
            </ul>
          </div>
          <div className="my-2 col-lg col-md d-flex justify-content-lg-start justify-content-md-start justify-content-center">
            <Search
              value={searchQuery}
              placeHolder="Enter City/Location"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div style={{ margin: "0 5% 0 5%" }}>
          <div className=" d-flex justify-content-center">
            <Message message={this.state.message} status={this.state.status} />
          </div>
          {(sortedRooms.length === 0 && (
            <h5 className="ml-4 mb-5 ">There are no rooms to show</h5>
          )) || (
            <React.Fragment>
              <p className="ml-4 mb-3 ">Showing {sortedRooms.length} Rooms</p>
              <RoomTable
                rooms={sortedRooms}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                doDelete={this.doDelete}
                onPublish={this.onPublish}
                handleMessage={this.handleMessage}
              />
              {/* <div className=" mx-auto d-lg-flex justify-content-lg-center d-md-flex justify-content-md-center ">
                  <Pagination
                    itemsCount="100"
                    pageSize="10"
                    currentPage="1"
                    onPageChange={this.handlePageChange}
                  />
                </div> */}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
