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
          <div className="col">
            <p> Total Users : {this.state.totalUser} </p>
            <p> Total Rooms : {this.state.totalRooms} </p>
            <p>Users Created Today : {this.state.usersCreatedToday}</p>
            <p>Rooms Added Today : {this.state.roomsCreatedToday}</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Index;
