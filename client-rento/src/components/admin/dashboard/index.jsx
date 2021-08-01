import React, { Component } from "react";
import user from "../../../services/userService";
import rooms from "../../../services/roomService";

class Index extends Component {
  state = {
    totalUser: "",
    totalRooms: "",
    usersCreatedToday: "",
    roomsCreatedToday: "",
  };

  async componentDidMount() {
    const { data: totalUser } = await user.getTotalUsers();
    const { data: totalRooms } = await rooms.getTotalRooms();
    const { data: usersCreatedToday } = await user.usersCreatedToday();
    const { data: roomsCreatedToday } = await rooms.roomsCreatedToday();
    this.setState({
      totalUser,
      totalRooms,
      usersCreatedToday,
      roomsCreatedToday,
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.props.sidebarSelect === "index" && (
          <React.Fragment>
            <div className="row m-auto">
              <div className="card shadow  m-2 col-xl col-lg col-md col-sm">
                <div className="card-body">
                  <span>
                    <i className="fa fa-user fa-2x"></i>
                  </span>
                  <p> Total Users : {this.state.totalUser} </p>
                </div>
              </div>
              <div className="card shadow m-2 col-xl col-lg col-md col-sm">
                <div className=" card-body">
                  <span>
                    <i className="fa fa-home fa-2x"></i>
                  </span>
                  <p> Total Rooms : {this.state.totalRooms} </p>
                </div>
              </div>
              <div className="card shadow m-2 col-xl col-lg col-md col-sm">
                <div className="card-body">
                  <span>
                    <i className="fa fa-user fa-2x"></i>
                    <i className="fa fa-calendar-check-o"></i>
                  </span>
                  <p>Users Created Today : {this.state.usersCreatedToday}</p>
                </div>
              </div>
              <div className="card shadow m-2 col-xl col-lg col-md col-sm">
                <div className="card-body">
                  <span>
                    <i className="fa fa-home fa-2x"></i>
                    <i className="fa fa-calendar-check-o"></i>
                  </span>
                  <p>Rooms Added Today : {this.state.roomsCreatedToday}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Index;
