import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import facility from "../../services/facilityService";

class FacilityAdd extends Form {
  state = {
    data: {
      name: "",
      icon: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    icon: Joi.string().label("Icon"),
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await facility.addFacility(data.name, data.icon);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {}
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
          <div className="py-3 mx-auto justify-content-center bg-light col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12">
            <div className="my-5 mx-xl-5 mx-lg-3 mx-md-3 mx-2">
              <h3>Add New Facility</h3>
              {this.props.location.state && (
                <p
                  className="text-center p-2"
                  style={{
                    background: "rgba(255, 0, 0, 0.3)",
                    borderRadius: "5px",
                  }}
                >
                  {this.props.location.state.message}
                </p>
              )}
              <form onSubmit={this.handleSubmit} className="mt-3">
                {this.renderInput("name", "Facility Name", "text", "autoFocus")}
                {this.renderInput("icon", "Icon")}
                {this.renderButton("Add")}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FacilityAdd;
