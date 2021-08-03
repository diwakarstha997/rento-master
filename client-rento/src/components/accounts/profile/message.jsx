import React, { Component } from "react";

class Message extends Component {
  render() {
    console.log(this.props.message);
    return (
      <React.Fragment>
        {this.props.message && (
          <div
            className={`text-center ${
              this.props.status === 201 || this.props.status === 202
                ? "alert alert-danger admin-alert"
                : "alert alert-success admin-alert"
            }`}
            role="alert"
          >
            {this.props.message}
            {this.props.status === 201 && (
              <button
                type="button"
                className="btn btn-danger btn-sm float-right"
                onClick={this.props.undoDelete}
              >
                Undo
              </button>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Message;
