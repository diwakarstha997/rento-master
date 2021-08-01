import React, { Component } from "react";
import room from "../../../services/roomService";

class OwnerRoomDetail extends Component {
  state = {
    roomData: "",
  };

  async componentDidMount() {
    const { data: roomData } = await room.getOwnerRoomDetail(
      this.props.match.params.id
    );
    this.setState({ roomData });
  }

  render() {
    const { roomData } = this.state;
    console.log(roomData);
    if (!roomData) return <h3>Loading</h3>;
    return (
      <div className="d-flex justify-content-center">
        <h3>Room Detail of Room No.: {roomData.roomTag}</h3>
      </div>
    );
  }
}

export default OwnerRoomDetail;
