import React, { Component } from "react";
import ApplicationTable from "./applicationsTable";
import application from "./../../../services/applicationService";
import { getCurrentUser } from "./../../../services/authService";
import { getUserVerificationData } from "../../../services/userService";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import Message from "../../admin/dashboard/message";
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
    count: 0,
    message: "",
    pageSize: 5,
    currentPage: 1,
    status: 200,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tableData !== this.state.tableData)
      this.handleCountRerender();
  }

  async componentDidMount() {
    document.title = "Rento | Applications";

    this.renderTableData("all");
  }

  renderTableData = async (tab) => {
    const user = getCurrentUser();
    let uv_data;
    if (user) uv_data = getUserVerificationData();

    if (uv_data.verified === true) {
      const { data: applications } = await application.getTenantApplications();
      const submitted = applications.filter(
        (d) => d.status === "Submitted"
      ).length;
      const rejected = applications.filter(
        (d) => d.status === "Rejected" || d.status === "Cancelled"
      ).length;
      const approved = applications.filter(
        (d) => d.status === "Approved"
      ).length;
      const count = applications.filter((d) => d.viewed === "false").length;

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
          tableData: applications.filter(
            (d) => d.status === "Rejected" || d.status === "Cancelled"
          ),
        });
      this.setState({
        applications,
        submitted,
        rejected,
        count,
        approved,
      });
    }
  };

  handleCountRerender = async () => {
    const { data: applications } = await application.getTenantApplications();
    const submitted = applications.filter(
      (d) => d.status === "Submitted"
    ).length;
    const rejected = applications.filter(
      (d) => d.status === "Rejected" || d.status === "Cancelled"
    ).length;
    const approved = applications.filter((d) => d.status === "Approved").length;
    this.setState({
      submitted,
      rejected,
      approved,
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
  };

  handleCancel = async (v, tab) => {
    try {
      const { data } = await application.cancelApplication(v);
      this.setState({ message: data, status: 202 });
      this.renderTableData(tab);
    } catch (ex) {}
  };

  handleView = async () => {
    const { data: applications } = await application.getTenantApplications();
    const count = applications.filter((d) => d.viewed === "false").length;
    this.setState({
      applications,
      tableData: applications,
      count,
    });
  };

  handleMessage = async (m, tab) => {
    this.setState({ message: m, status: 200 });
    this.renderTableData(tab);
  };

  getPageData = () => {
    const { tableData, sortColumn } = this.state;
    const sortedApplications = _.orderBy(
      tableData,
      [sortColumn.path],
      [sortColumn.order]
    );
    const applicationData = paginate(
      sortedApplications,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: sortedApplications.length, data: applicationData };
  };

  render() {
    const { totalCount, data } = this.getPageData();
    return (
      <React.Fragment>
        <div>
          <div className="row" style={{ margin: "0 5% 0 5%" }}>
            <div className="col ">
              <h2>Applications </h2>
              <Message
                message={this.state.message}
                status={this.state.status}
              />
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
            {(totalCount === 0 && (
              <h5 className="ml-4 mb-5 ">There are no applications to show</h5>
            )) || (
              <React.Fragment>
                <p className="ml-4 mb-3 ">
                  Showing {data.length} of {totalCount} Applications
                </p>
                <ApplicationTable
                  applications={data}
                  sortColumn={this.state.sortColumn}
                  onSort={this.handleSort}
                  handleMessage={this.handleMessage}
                  handleCancel={this.handleCancel}
                  handleView={this.handleView}
                  tab={this.state.active}
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
      </React.Fragment>
    );
  }
}

export default Applications;
