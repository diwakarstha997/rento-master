import React from "react";

const Input = ({ name, label, error, optional = false, ...rest }) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor="username">
        {label}
        {optional && <i className="text-danger ">*</i>}
      </label>
      <br />
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
