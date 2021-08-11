import React, { Component } from "react";
// import img from "";

class RoomCard extends Component {
  state = { item: "", mouseHover: false };

  handleRoomClick = (roomId) => {
    window.location = `/rooms/${roomId}`;
  };

  render() {
    const { items } = this.props;
    return (
      <div className="row container mt-3 mx-auto">
        {items.map((item) => (
          <div key={item._id} className="col-lg-3 col-md-6 col-12 mb-5">
            <div
              id="roomCard"
              className={`card ${
                this.state.item === item._id && this.state.mouseHover
                  ? "shadow"
                  : ""
              }`}
              onClick={() => this.handleRoomClick(item._id)}
              style={{ cursor: "pointer" }}
              onMouseEnter={() =>
                this.setState({ item: item._id, mouseHover: true })
              }
              onMouseLeave={() =>
                this.setState({ item: "", mouseHover: false })
              }
            >
              <img src={`/${item.image[0]}`} height="100px" alt="rento-room" />

              <div className="card-body">
                <p
                  className="card-title"
                  style={{
                    textTransform: "uppercase",
                    fontSize: "11px",
                    float: "right",
                  }}
                >
                  LISTED BY: {item.userName}
                </p>
                <hr />
                <p
                  className="card-text "
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Located at {item.city + ", " + item.location}
                </p>
                <hr />
                <div>
                  <h5 style={{ display: "inline" }}>RS {item.monthlyRent} </h5>{" "}
                  | {item.squareFeet} sqft.
                </div>
                <hr />
                <p className="card-text">
                  Facilities:
                  <br />
                  {item.facility.map((f) => (
                    <span key={f} className="tag badge p-1 mx-1 badge-info">
                      {f}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RoomCard;
