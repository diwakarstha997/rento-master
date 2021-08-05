import React, { Component } from "react";
import Table from "../../common/table";

class ApplicationTable extends Component {
  columns = [
    {
      path: "applicationNumber",
      label: "Application No.",
      visibility: true,
      content: (application) => (
        <a href={`/MyApplications/${application._id}`}>
          {application.applicationTag}
        </a>
      ),
    },
    {
      path: "room.roomTag",
      label: "Room No.",
      visibility: true,
      content: (application) =>
        (application.room && (
          <a href={`/rooms/${application.room._id}`}>
            {application.room.roomTag}
          </a>
        )) ||
        "Room removed or unlisted",
    },
    {
      key: "emergencyContact",
      content: (application) => application.emergencyContact,
      visibility: true,
      label: "Emergency Contact",
    },
    {
      key: "occupation",
      content: (application) => application.occupation,
      visibility: true,
      label: "Occupation",
    },
    {
      path: "monthlyIncome",
      label: "Monthly Income",
      visibility: true,
    },
    {
      key: "action",
      visibility: true,
      content: (application) => (
        <React.Fragment>
          <div className="text-center">
            <button
              onClick={() => this.props.onDelete(application._id)}
              className="btn btn-primary btn-sm"
            >
              Edit
            </button>
            <button
              onClick={() => this.props.onDelete(application._id)}
              className="btn btn-danger btn-sm ml-2"
            >
              Cancel
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
