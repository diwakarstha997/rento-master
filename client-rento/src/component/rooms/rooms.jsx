import React, { Component } from "react";
// import Pagination from "./../common/pagination";
import Search from "./../common/search";
import Breadcrumb from "./../common/breadcrumb";
import Card from "./../common/card";
import Sort from "./../common/sort";
import { getRooms } from "../../services/roomService";
import Filter from "./filter";
// import RoomCard from "./roomCard";

class Rooms extends Component {
  state = { rooms: [], searchQuery: "" };

  async componentDidMount() {
    const { data: rooms } = await getRooms();
    this.setState({ rooms });
    console.log(this.state.rooms);
  }

  handleRoomClick = (roomId) => {
    console.log(roomId, " is clicked");
    window.location = `/rooms/${roomId}`;
  };

  handlePageChange = (page) => {
    console.log("Set this page number as current:", page);
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  };

  render() {
    const { searchQuery } = this.state;
    const { length: count } = this.state.rooms;
    const path = this.props.location.pathname;
    console.log(path);
    return (
      <React.Fragment>
        <Breadcrumb path={path} />

        <div className="mx-5" autoComplete="off">
          <hr />
          <div className="d-flex mx-auto justify-content-center">
            <h5>
              <strong>Location</strong>
            </h5>
          </div>
          <div className="dropdown d-xl-flex m-auto justify-content-xl-center input-group mb-3 col-lg-5 col-md-7">
            <Search value={searchQuery} onChange={this.handleSearch} />
          </div>
          <hr />
        </div>

        <div
          className="row d-lg-flex justify-content-lg-center"
          style={{ margin: "0 1% 0 1%" }}
        >
          <div className="filter-box col-lg-2 mb-3">
            <Filter />
          </div>
          <div className="room-box col-lg-8 mb-3">
            <div className="row p-2">
              <div className="col d-flex mr-auto justify-content-start">
                {(count === 0 && `There are ${count} rooms!!!`) ||
                  `Showing ${count} rooms`}
              </div>
              <Sort items={["Price"]} />
            </div>
            <hr />
            <Card items={this.state.rooms} onClick={this.handleRoomClick} />
            {/* <div className=" mx-auto d-lg-flex justify-content-lg-center d-md-flex justify-content-md-center ">
              <Pagination
                itemsCount="100"
                pageSize="10"
                currentPage="1"
                onPageChange={this.handlePageChange}
              />
            </div> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Rooms;
