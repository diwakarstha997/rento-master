import React, { Component } from "react";

class Sort extends Component {
  state = {
    sortColumn: { sortPath: "None", sortOrder: "" },
  };

  handleClick = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    sortColumn.sortPath = path;

    if (sortColumn.sortOrder === "desc") {
      sortColumn.sortOrder = "asc";
    } else {
      sortColumn.sortOrder = "desc";
    }
    if (path === "None") sortColumn.sortOrder = "";
    this.setState({ sortColumn });
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (path) => {
    const { sortColumn } = this.state;
    if (path === "None") return;
    if (sortColumn.sortPath !== path) return null;
    if (sortColumn.sortOrder === "asc") {
      return <i className="fa fa-sort-asc ml-2"></i>;
    }
    return <i className="fa fa-sort-desc ml-2"></i>;
  };

  render() {
    // const { classes } = this.props;
    const { items } = this.props;
    const { sortColumn } = this.state;
    return (
      <div className="col d-flex ml-auto justify-content-end">
        <label>Sort By: </label>
        {items.map((item) => (
          <button
            key={item.name}
            className={`btn btn-sm ml-2 ${
              sortColumn.sortPath === item.value ? "btn-primary" : "btn-light"
            }`}
            onClick={() => this.handleClick(item.value)}
          >
            {item.name}
            {this.renderSortIcon(item.value)}
            {/* <i className="fa fa-sort-asc ml-2"></i> */}
          </button>
        ))}
      </div>
    );
  }
}

export default Sort;
