import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import ConfirmDelete from "../../common/confirmDelete";
import ApproveModal from "../modal/approveModal";
import ViewApplicationModal from "../modal/viewApplicaion";

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
            {application.status === "Submitted" ? (
              <div>
                <ViewApplicationModal edit={application} />
                <ApproveModal
                  value={application._id}
                  onClick={this.props.onClick}
                />
                <ConfirmDelete
                  reject={"reject"}
                  value={application._id}
                  onClick={this.props.handleReject}
                />
              </div>
            ) : (
              <ViewApplicationModal edit={application} />
            )}
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
