import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.message && (
          <div className="alert alert-success admin-alert" role="alert">
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
