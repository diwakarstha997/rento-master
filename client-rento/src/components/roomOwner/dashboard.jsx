import React, { Component } from "react";
import _ from "lodash";
import Search from "./../common/search";
// import Pagination from "../common/pagination";
import { getRoomsByUser } from "../../services/roomService";
import RoomTable from "./rooms/roomsTable";

class Dashboard extends Component {
  state = {
    rooms: [],
    searchQuery: "",
    sortColumn: { path: "roomNumber", order: "asc" },
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  };

  async componentDidMount() {
    const { data: rooms } = await getRoomsByUser();
    console.log(rooms);
    this.setState({ rooms });
  }

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
            <Search value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <div style={{ margin: "0 5% 0 5%" }}>
          {(sortedRooms.length === 0 && (
            <h5 className="ml-4 mb-5 ">There are no rooms to show</h5>
          )) ||
            (`Showing ${sortedRooms.lenth} rooms` && (
              <React.Fragment>
                <RoomTable
                  rooms={sortedRooms}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
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
            ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
