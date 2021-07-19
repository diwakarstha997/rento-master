import React, { Component } from "react";

import "./tagInput.css";

class TagInput extends Component {
  state = { tags: [], size: 5 };

  deleteTags = (tagToDelete) => {
    const tags = this.state.tags.filter((tag) => tag !== tagToDelete);
    this.setState({ tags });
  };

  addTags = (e) => {
    const tag = this.state.tags.find((tag) => tag === e.currentTarget.value);
    if (tag) {
      e.currentTarget.style = "color: red";
    } else {
      e.currentTarget.style = "color: black";
    }
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const tags = [...this.state.tags, e.currentTarget.value];
      this.setState({ tags, size: 1 });
      e.currentTarget.value = "";
    }
  };

  render() {
    return (
      <div className="bootstrap-tagsinput">
        {this.state.tags.map((tag) => (
          <span className="tag badge badge-primary">
            {tag}
            <span
              data-role="remove"
              onClick={() => this.deleteTags(tag)}
            ></span>
          </span>
        ))}

        <input
          type="text"
          placeholder=""
          size={this.state.size}
          onKeyUp={this.addTags}
        />
      </div>
    );
  }
}

export default TagInput;
