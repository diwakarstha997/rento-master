import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class ApplicationTable extends Component {
  columns = [
    {
      path: "applicationNumber",
      label: "Application No.",
      visibility: true,
      content: (application) => (
        <Link to={`/applications/${application._id}`}>
          {application.applicationTag}
        </Link>
      ),
    },
    {
      path: "room.roomTag",
      label: "Room No.",
      visibility: true,
    },
    {
      path: "occupation",
      label: "Occupation",
      visibility: true,
    },
    {
      path: "monthlyIncome",
      label: "Monthly Income",
      visibility: true,
    },
    {
      key: "delete",
      visibility: true,
      content: (application) => (
        <React.Fragment>
          <div className="text-center">
            <button
              onClick={() => this.props.onDelete(application._id)}
              className="btn btn-primary btn-sm"
            >
              Approve
            </button>
            <button
              onClick={() => this.props.onDelete(application._id)}
              className="btn btn-danger btn-sm ml-2"
            >
              Reject
            </button>
          </div>
        </React.Fragment>
      ),
      label: "Action",
    },
    {
      key: "status",
      content: (application) => application.status,
      visibility: true,
      label: "Status",
    },
  ];

  render() {
    const { applications, sortColumn, onSort } = this.props;
    console.log(applications);
    return (
      <Table
        columns={this.columns}
        data={applications}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ApplicationTable;
