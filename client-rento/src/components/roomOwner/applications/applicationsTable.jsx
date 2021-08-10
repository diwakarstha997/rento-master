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
      path: "viewed",
      visibility: true,
      content: (application) => (
        <React.Fragment>
          {application.viewed === "submitted" ? (
            <span className="badge badge-pill badge-danger ">NEW</span>
          ) : (
            ""
          )}
        </React.Fragment>
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
                <ViewApplicationModal
                  edit={application}
                  handleView={this.props.handleView}
                  lable={this.props.lable}
                />
                <ApproveModal
                  value={application._id}
                  onClick={this.props.handleApprove}
                  lable={this.props.lable}
                />
                <ConfirmDelete
                  reject={"reject"}
                  value={application._id}
                  onClick={this.props.handleReject}
                  lable={this.props.lable}
                />
              </div>
            ) : (
              <ViewApplicationModal
                edit={application}
                handleView={this.props.handleView}
                lable={this.props.lable}
              />
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
