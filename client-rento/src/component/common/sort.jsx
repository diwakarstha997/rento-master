import React, { Component } from "react";

class Sort extends Component {
  state = {
    sortPath: "",
    sortOrder: "asc",
  };

  handleClick = (path) => {
    this.setState({ sortPath: path });
    if (this.state.sortOrder === "asc") {
      this.setState({ sortOrder: "desc" });
    } else {
      this.setState({ sortOrder: "asc" });
    }
  };

  renderSortIcon = (path) => {
    if (this.state.sortPath !== path) return null;
    if (this.state.sortOrder === "asc") {
      return <i className="fa fa-sort-asc ml-2"></i>;
    }
    return <i className="fa fa-sort-desc ml-2"></i>;
  };

  render() {
    // const { classes } = this.props;
    const { items } = this.props;
    return (
      <div className="col d-flex ml-auto justify-content-end">
        <label>Sort By: </label>
        {items.map((item) => (
          <button
            className="btn btn-light btn-sm ml-2"
            onClick={() => this.handleClick(item)}
          >
            {item}
            {this.renderSortIcon(item)}
            {/* <i className="fa fa-sort-asc ml-2"></i> */}
          </button>
        ))}
      </div>
    );
  }
}

export default Sort;
