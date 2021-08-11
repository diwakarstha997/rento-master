import React from "react";

const TextArea = ({
  name,
  label,
  error,
  divClass,
  optional = false,
  ...rest
}) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor={name}>
        {label}
        {optional && <i className="text-danger">*</i>}
      </label>
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
