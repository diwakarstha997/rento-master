import React, { Component } from "react";

import TagFilter from "./../common/tagFilter";

class Filter extends Component {
  handleKeyPressNumber = (e, max) => {
    if (!(e.nativeEvent.charCode >= 48 && e.nativeEvent.charCode <= 57)) {
      e.preventDefault();
    }
    if (!(e.currentTarget.value >= 0 && e.currentTarget.value <= 1000000))
      e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="my-4 text-center">Filter Rooms</h4>
        <hr />
        <div className="form-group mt-2" data-role="tagsinput">
          <label htmlFor="facility">Facility:</label>
          <TagFilter
            tags={this.props.items}
            handleSelect={this.props.handleSelect}
          />
        </div>
        <hr />
        <label htmlFor="maxPrice">Max Price:</label>

        <div className="form-group mt-2 ">
          <input
            name="maxPrice"
            id="maxPrice"
            className="form-control"
            onKeyPress={(e) => this.handleKeyPressNumber(e)}
            onChange={this.props.handlePriceChange}
          ></input>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default Filter;
