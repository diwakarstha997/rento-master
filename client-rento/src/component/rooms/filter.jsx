import React, { Component } from "react";
import { getFacilities } from "../../services/facilityService";
import TagFilter from "./../common/tagFilter";

class Filter extends Component {
  state = { facilities: [] };

  async componentDidMount() {
    const { data: facilities } = await getFacilities();
    this.setState({ facilities });
  }

  render() {
    return (
      <React.Fragment>
        <h4 className="my-4 text-center">Filter Rooms</h4>
        <hr />
        {/* <div className="form-group mt-2">
          <label htmlFor="location">Location:</label>
          <input name="location" id="location" className="form-control"></input>
        </div>
        <hr /> */}
        <div className="form-group mt-2" data-role="tagsinput">
          <label htmlFor="facility">Facility:</label>
          <TagFilter tags={this.state.facilities} />
        </div>
        <hr />
        <label htmlFor="location">Price:</label>
        <div className="form-group mt-2 row">
          <div className="col-6">
            <input name="price" id="minPrice" className="form-control"></input>
          </div>
          <div className="col-6">
            <input name="price" id="maxPrice" className="form-control"></input>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default Filter;
