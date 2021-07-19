import React from "react";

const TextArea = ({ name, label, error, divClass, ...rest }) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor="username">{label}</label>
      <textarea
        autoFocus
        {...rest}
        name={name}
        id={name}
        className="form-control"
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
