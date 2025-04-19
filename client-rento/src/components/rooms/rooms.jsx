import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./../common/pagination";
import Search from "./../common/search";
import RoomCard from "./roomCard";
import Sort from "./../common/sort";
import { getRooms } from "../../services/roomService";
import { getFacilities } from "../../services/facilityService";
import Filter from "./filter";
import { paginate } from "../../utils/paginate";
// import RoomCard from "./roomCard";

class Rooms extends Component {
  state = {
    facilities: [],
    rooms: [],
    searchedLocation: "",
    selectedFacilities: [],
    maxPrice: 10000000,
    sortColumn: { sortPath: "None", sortOrder: "" },
    pageSize: 8,
    currentPage: 1,
  };

  async componentDidMount() {
    document.title = "Rento | Find Rooms";
    const { data: facilities } = await getFacilities();
    const { data: rooms } = await getRooms();
    this.setState({ facilities, rooms });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (e) => {
    this.setState({
      searchedLocation: e.currentTarget.value,
    });
  };

  handlePriceChange = (e) => {
    this.setState({ maxPrice: e.currentTarget.value });
  };

  handleFacilitySelect = (f) => {
    const selectedFacility = this.state.selectedFacilities.find(
      (facility) => facility.name === f.name
    );
    if (selectedFacility) {
      const selectedFacilities = this.state.selectedFacilities.filter(
        (facility) => facility.name !== f.name
      );
      this.setState({ selectedFacilities });
    } else {
      const selectedFacilities = [...this.state.selectedFacilities, f];
      this.setState({ selectedFacilities });
    }

    // this.getPageData();
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  matchFacilities = (searchedFacilities, roomFacilities) => {
    let count = 0;
      searchedFacilities.forEach((facility1) =>
        roomFacilities.forEach((facility2) => {
          if (facility2 === facility1.name) {
            count++;
          }
        })
      );
    return count;
  };

  roomFacilityFilter = (rooms) => {
    return this.state.selectedFacilities.length === 0
      ? rooms
      : (rooms = rooms.filter(
          (room) =>
          this.matchFacilities(this.state.selectedFacilities, room.facility) > 0
            
        ));
  };

  roomLocationFilter = () => {
    const { rooms: allRoom, searchedLocation } = this.state;

    return searchedLocation === ""
      ? allRoom
      : allRoom.filter(
          (r) =>
            r.location.match(new RegExp(`^${searchedLocation}`, "i")) ||
            r.city.match(new RegExp(`^${searchedLocation}`, "i"))
        );
  };

  roomPriceFilter = (rooms) => {
    if (!this.state.maxPrice) this.setState({ maxPrice: 10000000 });
    return (rooms = rooms.filter(
      (room) => room.monthlyRent <= this.state.maxPrice
    ));
  };

  getPageData = () => {
    const locationFilteredRooms = this.roomLocationFilter();
    const facilityFilteredRooms = this.roomFacilityFilter(
      locationFilteredRooms
    );

    const priceFilteredRooms = this.roomPriceFilter(facilityFilteredRooms);

    const filteredRoom = priceFilteredRooms;

    const sorted = _.orderBy(
      filteredRoom,
      [this.state.sortColumn.sortPath],
      [this.state.sortColumn.sortOrder]
    );

    const rooms = paginate(sorted, this.state.currentPage, this.state.pageSize);

    return { totalCount: sorted.length, data: rooms };
  };

  render() {
    const { totalCount, data } = this.getPageData();
    return (
      <React.Fragment>
        <div className="mx-5" autoComplete="off">
          <hr />
          <div className="d-flex mx-auto justify-content-center">
            <h5>
              <strong>Location</strong>
            </h5>
          </div>
          <div className="dropdown d-xl-flex m-auto justify-content-xl-center input-group mb-3 col-lg-5 col-md-7">
            <Search
              value={this.state.searchedLocation}
              onChange={this.handleSearch}
              placeHolder="Enter City/ Location"
            />
          </div>
          <hr />
        </div>

        <div
          className="row d-lg-flex justify-content-lg-center"
          style={{ margin: "0 1% 0 1%" }}
        >
          <div className="filter-box col-lg-2 mb-3">
            <Filter
              items={this.state.facilities}
              maxPrice={this.state.maxPrice}
              handleSelect={this.handleFacilitySelect}
              handlePriceChange={this.handlePriceChange}
            />
          </div>
          <div className="room-box col-lg-8 mb-3">
            <div className="row p-2">
              <div className="col d-flex mr-auto justify-content-start">
                {(totalCount === 0 &&
                  `There are ${totalCount} rooms ${
                    this.state.searchedLocation
                      ? 'at "' + this.state.searchedLocation + '"'
                      : ""
                  } !!!`) ||
                  `Showing ${data.length} of ${totalCount} rooms ${
                    this.state.searchedLocation
                      ? 'at "' + this.state.searchedLocation + '"'
                      : ""
                  }`}
              </div>
              <Sort
                items={[
                  { name: "None", value: "None" },
                  { name: "Price", value: "monthlyRent" },
                ]}
                onSort={this.handleSort}
              />
            </div>
            <hr />
            <RoomCard items={data} />
            <div className=" mx-auto d-lg-flex justify-content-lg-center d-md-flex justify-content-md-center ">
              <Pagination
                itemsCount={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Rooms;
