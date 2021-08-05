import React, { Component } from "react";
import ApplicationTable from "./applicationsTable";
import { getTenantApplications } from "./../../../services/applicationService";
import { getCurrentUser } from "./../../../services/authService";

class Applications extends Component {
  state = {
    applications: [],
    searchQuery: "",
    sortColumn: { path: "applicationNumber", order: "asc" },
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
    const user = getCurrentUser();
    if (user.verified === true) {
      const { data: applications } = await getTenantApplications();
      console.log(applications);
      this.setState({ applications });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="row" style={{ margin: "0 5% 0 5%" }}>
            <div className="col ">
              <h2>Applications</h2>
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
                    Pending
                  </a>
                </li>
                <li className="text-dark mx-2">
                  <a className="text-dark" href="/">
                    Approved
                  </a>
                </li>
                <li className="text-dark mx-2">
                  <a className="text-dark" href="/">
                    Canceled/Rejected
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ margin: "0 5% 0 5%" }}>
            {(this.state.applications.length === 0 && (
              <h5 className="ml-4 mb-5 ">There are no applications to show</h5>
            )) || (
              <React.Fragment>
                <p className="ml-4 mb-3 ">
                  Showing {this.state.applications.length} Applications
                </p>
                <ApplicationTable
                  applications={this.state.applications}
                  sortColumn={this.state.sortColumn}
                  onSort={this.handleSort}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Applications;
