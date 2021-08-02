import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./textArea";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  customValidate = (input) => {
    return false;
  };

  validate = () => {
    const options = { abortEarly: false }; // to display all error at once abortEarly: false
    let { error } = Joi.validate(this.state.data, this.schema, options);

    const customErrors = this.customValidate();
    if (customErrors) error.details.push(...customErrors.details);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    let { error } = Joi.validate(obj, { [name]: this.schema[name] });

    const customErrors = this.customValidate({ [name]: value });
    if (customErrors) error = customErrors;

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const errorChildRef = { ...this.state.errorChildRef };
    if (errorChildRef[input.name]) {
      const childErrorMessage = this.childValidation(input.name, input.value);
      if (childErrorMessage)
        errors[errorChildRef[input.name]] = childErrorMessage;
      else delete errors[errorChildRef[input.name]];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    const dataChildRef = { ...this.state.dataChildRef };
    if (dataChildRef[input.name]) {
      data[dataChildRef[input.name]] = "";
      delete errors[dataChildRef[input.name]];
    }

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleKeyPressNumber = (e, max) => {
    if (!(e.nativeEvent.charCode >= 48 && e.nativeEvent.charCode <= 57)) {
      e.preventDefault();
    }
    if (e.currentTarget.value.length > max) e.preventDefault();
  };

  renderInput(name, label, type = "text", autoFocus = "") {
    const { data, errors } = this.state;
    // console.log(name);

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autoFocus}
      />
    );
  }
  renderNumberInput(name, label, disabled = false, max = 7) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onKeyPress={(e) => this.handleKeyPressNumber(e, max)}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  renderTextArea(name, label, divClass) {
    const { data, errors } = this.state;

    return (
      <TextArea
        name={name}
        label={label}
        divClass={divClass}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label, classes) {
    return (
      <button
        className={`btn d-flex d-xl-flex m-auto px-4 rento-btn ${classes}`}
      >
        {label}
      </button>
    );
  }

  renderModalButton(label, classes, onClick) {
    return (
      <button className={`btn px-4 mx-1 ${classes}`} onClick={onClick}>
        {label}
      </button>
    );
  }
}

export default Form;
