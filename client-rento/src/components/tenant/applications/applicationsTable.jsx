import React, { Component } from "react";
import ConfirmDelete from "../../common/confirmDelete";
import Table from "../../common/table";
import Contact from "../modal/contact";
import EditModal from "../modal/editModal";

class ApplicationTable extends Component {
  columns = [
    {
      path: "applicationNumber",
      label: "Application No.",
      visibility: true,
      content: (application) => (
        <React.Fragment>
          <div href={`/MyApplications/${application._id}`}>
            {application.applicationTag}
          </div>
        </React.Fragment>
      ),
    },
    {
      path: "viewed",
      visibility: true,
      content: (application) => (
        <React.Fragment>
          {application.viewed === "false" ? (
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
            {application.contactNo && (
              <Contact
                id={application._id}
                handleView={this.props.handleView}
                viewed={application.viewed}
                contact={application.contactNo}
              />
            )}
            <EditModal
              edit={application}
              lable={application.status}
              handleView={this.props.handleView}
              tab={this.props.tab}
              handleMessage={this.props.handleMessage}
            />
            {application.status === "Submitted" ? (
              <ConfirmDelete
                cancel={"cancel"}
                onClick={this.props.handleCancel}
                lable={this.props.tab}
                value={application._id}
              />
            ) : (
              ""
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
