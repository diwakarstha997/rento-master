import React, { Component } from "react";

import TagFilter from "./../common/tagFilter";

class Filter extends Component {
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
          <TagFilter
            tags={this.props.items}
            handleSelect={this.props.handleSelect}
          />
        </div>
        {/* <hr />
        <label htmlFor="location">Price:</label>
        <div className="form-group mt-2 row">
          <div className="col-6">
            <input name="price" id="minPrice" className="form-control"></input>
          </div>
          <div className="col-6">
            <input name="price" id="maxPrice" className="form-control"></input>
          </div>
        </div> */}
        <hr />
      </React.Fragment>
    );
  }
}

export default Filter;
