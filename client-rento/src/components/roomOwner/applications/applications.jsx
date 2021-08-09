import React, { Component } from "react";
import ApplicationTable from "./applicationsTable";
import { getRoomOwnerApplications } from "./../../../services/applicationService";
import { getCurrentUser } from "./../../../services/authService";
import application from "./../../../services/applicationService";
import _ from "lodash";

class Applications extends Component {
  state = {
    active: "all",
    applications: [],
    tableData: [],
    searchQuery: "",
    sortColumn: { path: "applicationNumber", order: "asc" },
    submitted: "",
    rejected: "",
    approved: "",
    message: "",
    count: 0,
  };

  async componentDidMount() {
    this.renderTableData("all");
  }

  renderTableData = async (tab) => {
    console.log("renderTableData");
    const user = getCurrentUser();
    if (user.verified === true) {
      const { data: applications } = await getRoomOwnerApplications();
      const submitted = applications.filter(
        (d) => d.status === "Submitted"
      ).length;
      const rejected = applications.filter(
        (d) => d.status === "Rejected"
      ).length;
      const approved = applications.filter(
        (d) => d.status === "Approved"
      ).length; ///pending approved cancel
      const count = applications.filter((d) => d.viewed === "submitted").length;
      if (tab === "all") this.setState({ tableData: applications });
      if (tab === "pending")
        this.setState({
          tableData: applications.filter((d) => d.status === "Submitted"),
        });
      if (tab === "approved")
        this.setState({
          tableData: applications.filter((d) => d.status === "Approved"),
        });
      if (tab === "cancel")
        this.setState({
          tableData: applications.filter((d) => d.status === "Rejected"),
        });
      this.setState({
        applications,
        submitted,
        rejected,
        approved,
        count,
      });
    }
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

  handleSelect = (v) => {
    if (v === "all") {
      this.setState({ active: v });
      this.renderTableData("all");
    }
    if (v === "pending") {
      this.setState({ active: v });
      this.renderTableData("pending");
    }
    if (v === "approved") {
      this.setState({ active: v });
      this.renderTableData("approved");
    }
    if (v === "cancel") {
      this.setState({ active: v });
      this.renderTableData("cancel");
    }

    console.log(this.state.active);
  };

  handleApprove = async (e, lable) => {
    console.log(lable);
    const { data } = await application.applicationApprove(e);
    this.renderTableData(lable);
    this.setState({ message: data });
  };

  handleReject = async (e, lable) => {
    console.log(lable);
    const { data } = await application.applicationReject(e);
    this.renderTableData(lable);
    this.setState({ message: data });
  };

  handleView = (lable) => {
    this.renderTableData(lable);
  };

  render() {
    console.log("yes");
    const { tableData, searchQuery, sortColumn } = this.state;
    const sortedRooms = _.orderBy(
      tableData,
      [sortColumn.path],
      [sortColumn.order]
    );
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
                  <div
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.active === "all"
                        ? "text-dark font-weight-bold application-button"
                        : "text-dark application-button"
                    }
                    onClick={() => this.handleSelect("all")}
                  >
                    All({this.state.applications.length})
                    {this.state.count ? (
                      <span className="badge badge-pill badge-danger ">
                        {this.state.count}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li className="text-dark mx-2">
                  <div
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.active === "pending"
                        ? "text-dark font-weight-bold application-button"
                        : "text-dark application-button"
                    }
                    onClick={() => this.handleSelect("pending")}
                  >
                    Pending({this.state.submitted})
                    {this.state.count ? (
                      <span className="badge badge-pill badge-danger ">
                        {this.state.count}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
                <li className="text-dark mx-2">
                  <div
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.active === "approved"
                        ? "text-dark font-weight-bold application-button"
                        : "text-dark application-button"
                    }
                    onClick={() => this.handleSelect("approved")}
                  >
                    Approved({this.state.approved})
                  </div>
                </li>
                <li className="text-dark mx-2">
                  <div
                    style={{ cursor: "pointer" }}
                    className={
                      this.state.active === "cancel"
                        ? "text-dark font-weight-bold application-button"
                        : "text-dark application-button"
                    }
                    onClick={() => this.handleSelect("cancel")}
                  >
                    Canceled/Rejected({this.state.rejected})
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ margin: "0 5% 0 5%" }}>
            {(sortedRooms.length === 0 && (
              <h5 className="ml-4 mb-5 ">There are no applications to show</h5>
            )) || (
              <React.Fragment>
                <p className="ml-4 mb-3 ">
                  Showing {sortedRooms.length} Applications
                </p>
                <ApplicationTable
                  applications={sortedRooms}
                  sortColumn={this.state.sortColumn}
                  onSort={this.handleSort}
                  handleApprove={this.handleApprove}
                  handleReject={this.handleReject}
                  lable={this.state.active}
                  handleView={this.handleView}
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
