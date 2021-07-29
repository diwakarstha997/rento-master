import React, { Component } from "react";

import "./tagFilter.css";

class TagFilter extends Component {
  state = { currentTags: [], className: "tag badge p-1 mx-2 badge-" };

  handleClick = (e, tag) => {
    const currentTag = this.state.currentTags.find((t) => t === tag);
    if (currentTag) {
      const currentTags = this.state.currentTags.filter((t) => t !== tag);
      this.setState({ currentTags });

      e.currentTarget.className = this.state.className + "secondary";
      this.props.handleSelect(tag);
    } else {
      const currentTags = [...this.state.currentTags, tag];
      this.setState({ currentTags });

      e.currentTarget.className = this.state.className + "primary";
      this.props.handleSelect(tag);
    }
  };

  render() {
    return (
      <div className="bootstrap-tagsfilter">
        {this.props.tags.map((tag) => (
          <span
            key={tag.name}
            style={{ cursor: "pointer" }}
            className={this.state.className + "secondary"}
            onClick={(e) => this.handleClick(e, tag)}
          >
            {!tag.icon ? "" : <i className={`fa ${tag.icon}`}></i>} {tag.name}
          </span>
        ))}
      </div>
    );
  }
}

export default TagFilter;
