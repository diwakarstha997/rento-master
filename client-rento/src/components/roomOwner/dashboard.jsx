import React, { Component } from "react";
import _ from "lodash";
import Search from "./../common/search";
import Pagination from "../common/pagination";
import rooms from "../../services/roomService";
// import { getRoomsByUser } from "../../services/roomService";
import RoomTable from "./rooms/roomsTable";
import Message from "../admin/dashboard/message";
import { getCurrentUser } from "./../../services/authService";
import { getUserVerificationData } from "../../services/userService";
import { paginate } from "../../utils/paginate";

class Dashboard extends Component {
  state = {
    active: "all",
    forRent: "",
    inactive: "",
    tableData: "",
    rooms: [],
    message: "",
    status: "",
    searchQuery: "",
    sortColumn: { path: "roomNumber", order: "asc" },
    pageSize: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    document.title = "Rento | My Rooms";
    this.renderTableData("all");
  }

  renderTableData = async (tab) => {
    const user = getCurrentUser();
    let uv_data;
    if (user) uv_data = getUserVerificationData();

    if (uv_data.verified === true) {
      const { data: userRooms } = await rooms.getRoomsByUser();
      const forRent = userRooms.filter((d) => d.status === "Active").length;
      const inactive = userRooms.filter((d) => d.status === "Inactive").length;
      if (tab === "all") this.setState({ tableData: userRooms });
      if (tab === "inactive")
        this.setState({
          tableData: userRooms.filter((d) => d.status === "Inactive"),
        });
      if (tab === "active")
        this.setState({
          tableData: userRooms.filter((d) => d.status === "Active"),
        });
      this.setState({
        rooms: userRooms,
        inactive,
        forRent,
      });
    }
  };

  handleSelect = (v) => {
    if (v === "all") {
      this.setState({ active: v });
      this.setState({ tableData: this.state.rooms });
    }
    if (v === "active") {
      this.setState({ active: v });
      let data = this.state.rooms;
      data = data.filter((d) => d.status === "Active");
      this.setState({ tableData: data });
    }
    if (v === "inactive") {
      this.setState({ active: v });
      let data = this.state.rooms;
      data = data.filter((d) => d.status === "Inactive");
      this.setState({ tableData: data });
    }
    console.log(this.state.active);
  };

  handlePageChange = (page) => {
    console.log("Set this page number as current:", page);
    this.setState({ currentPage: page });
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
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ rooms: "" });

        const { data: userRooms } = await rooms.getRoomsByUser();
        this.setState({ rooms: userRooms });
        this.setState({
          message: ex.response.data,
          status: 202,
        });
      }
    }
  };

  onPublish = async (v, lable) => {
    try {
      const user = await getCurrentUser();
      let uv_data;
      if (user) uv_data = getUserVerificationData();
      console.log(user, uv_data);
      if (uv_data.verified === true) {
        const { status, data } = await rooms.publishRoom(v);

        this.renderTableData(lable);

        this.setState({ message: data, status });
      } else {
        this.setState({
          message: "Please Verify Identity to Publish Room",
          status: 202,
        });
      }
    } catch (ex) {}
  };

  getPageData = () => {
    const { tableData, sortColumn } = this.state;
    const sortedRooms = _.orderBy(
      tableData,
      [sortColumn.path],
      [sortColumn.order]
    );
    const roomData = paginate(
      sortedRooms,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: sortedRooms.length, data: roomData };
  };

  render() {
    const { searchQuery, sortColumn } = this.state;
    const { totalCount, data } = this.getPageData();
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
                <div
                  style={{ cursor: "pointer" }}
                  className={
                    this.state.active === "all"
                      ? "text-dark font-weight-bold application-button"
                      : "text-dark application-button"
                  }
                  onClick={() => this.handleSelect("all")}
                >
                  All({this.state.rooms.length})
                </div>
              </li>
              <li className="text-dark mx-2">
                <div
                  style={{ cursor: "pointer" }}
                  className={
                    this.state.active === "active"
                      ? "text-dark font-weight-bold application-button"
                      : "text-dark application-button"
                  }
                  onClick={() => this.handleSelect("active")}
                >
                  For Rent({this.state.forRent})
                </div>
              </li>
              <li className="text-dark mx-2">
                <div
                  style={{ cursor: "pointer" }}
                  className={
                    this.state.active === "inactive"
                      ? "text-dark font-weight-bold application-button"
                      : "text-dark application-button"
                  }
                  onClick={() => this.handleSelect("inactive")}
                >
                  Inactive({this.state.inactive})
                </div>
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
          {(totalCount === 0 && (
            <h5 className="ml-4 mb-5 ">There are no rooms to show</h5>
          )) || (
            <React.Fragment>
              <p className="ml-4 mb-3 ">
                Showing {data.length} of {totalCount} Rooms
              </p>
              <RoomTable
                rooms={data}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                doDelete={this.doDelete}
                onPublish={this.onPublish}
                handleMessage={this.handleMessage}
                lable={this.state.active}
              />
              <div className=" mx-auto d-lg-flex justify-content-lg-center d-md-flex justify-content-md-center ">
                <Pagination
                  itemsCount={totalCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
