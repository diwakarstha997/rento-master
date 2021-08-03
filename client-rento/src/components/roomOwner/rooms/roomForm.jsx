import React from "react";
import Joi from "joi-browser";
import { getCities } from "../../../services/locationService";
import { getFacilities } from "../../../services/facilityService";
import { saveRoom } from "../../../services/roomService";
// import { getAllLocations } from "../../../services/location";
// import { getAllFacilities } from "../../../services/facility";
import Form from "../../common/form";
// import Input from "./../../common/input";

class RoomForm extends Form {
  state = {
    cities: [],
    facilities: [],
    dataChildRef: {
      city: "wardNumber",
    },
    data: {
      city: "",
      wardNumber: "",
      location: "",
      // floor: "",
      facility: [],
      monthlyRent: "",
      squareFeet: "",
      description: "",
      image: [],
      imagePath: [],
    },
    errors: {},
  };

  async componentDidMount() {
    const { data } = await getCities();
    const { data: facilities } = await getFacilities();
    const cities = [{ _id: "", name: "", default: "Select City" }, ...data];
    this.setState({ cities, facilities });
  }

  schema = {
    city: Joi.string().required().label("City"),
    wardNumber: Joi.number().required().label("Ward No."),
    location: Joi.string().min(3).max(255).required().label("Location"),
    // floor: Joi.number().min(1).max(100).required().label("Floor"),
    facility: Joi.label("Facility"),
    monthlyRent: Joi.number()
      .min(100)
      .max(10000000)
      .required()
      .label("Monthly Rent"),
    squareFeet: Joi.number()
      .min(100)
      .max(10000000)
      .required()
      .label("Square Feet"),
    description: Joi.string().min(150).max(500).required().label("Description"),
    image: Joi.label("Image"),
    imagePath: Joi,
  };

  customValidate = (input) => {
    let error = { details: [] };

    let checkWardNumber = false;
    let checkInputImage = false;

    //wardNumber custom validation initilization
    const city = this.state.cities.find((c) => c.name === this.state.data.city);
    let wardNumber = this.state.data.wardNumber;

    //image upload validation initilization
    let numberOfImage = this.state.data.image.length;

    if (input && input.wardNumber) {
      checkWardNumber = true;
      wardNumber = input.wardNumber; //wardNumber custom validation initilization
    } else if (input && input.image) {
      checkInputImage = true;
      numberOfImage = this.state.data.image.length + 1; //image upload validation initilization
    } else if (input) {
      return false;
    } else {
      checkWardNumber = true;
      checkInputImage = true;
    }

    //wardNumber custom validation
    if (checkWardNumber && (wardNumber < 0 || wardNumber > city.totalWard)) {
      error.details.push({
        path: ["wardNumber"],
        message: `There are only ${city.totalWard} wards in ${this.state.data.city}`,
      });
    }

    //image upload validation
    if (checkInputImage && numberOfImage < 3) {
      error.details.push({
        path: ["image"],
        message: `Please upload at least 3 image `,
      });
    }

    if (error.details.length === 0) return false;

    return error;
  };

  handleFacilityClick = (e) => {
    const data = { ...this.state.data };
    const facility = [...data.facility];
    const checkFacility = facility.filter((f) => f === e.currentTarget.value);
    if (checkFacility.length === 0) {
      data.facility = [...data.facility, e.currentTarget.value];
      console.log(`${e.currentTarget.value} is added`);
    } else {
      data.facility = facility.filter((f) => f !== e.currentTarget.value);
      console.log(`${e.currentTarget.value} is removed`);
      console.log(data.facility);
    }

    this.setState({ data });
  };

  doSubmit = async () => {
    try {
      await saveRoom(this.state.data);
      window.location.replace("/RoomOwner/MyRooms");
    } catch (ex) {
      console.log("we are here", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleFileChange = (e) => {
    const fileCount = e.currentTarget.files.length;

    if (!e.currentTarget.files[0]) return;
    const { currentTarget: input } = e;
    const errors = { ...this.state.errors };

    if (fileCount < 3) {
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors["image"] = errorMessage;
      else delete errors["image"];
    }

    const data = { ...this.state.data };

    for (let i = 0; i < fileCount; i++) {
      data["image"] = [...data["image"], e.currentTarget.files[i]];
    }

    this.setState({ data, errors });
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div style={{ margin: "0 5% 0 5%" }}>
              {this.renderSelect("city", "City", this.state.cities)}
              {this.renderNumberInput(
                "wardNumber",
                "Ward No.",
                this.state.data.city ? false : true
              )}
              {this.renderInput("location", "Location")}
              {this.renderNumberInput("squareFeet", "Square Feet")}
              {this.renderNumberInput("monthlyRent", "Monthly Rent")}
              {this.renderTextArea("description", "Description")}

              <div className="form-group">
                <label htmlFor="facility">Facility</label>
                {this.state.facilities.map((facility) => (
                  <div key={facility._id} className="form-group">
                    <input
                      type="checkbox"
                      id={facility._id}
                      name={facility.name}
                      value={facility.name}
                      onClick={this.handleFacilityClick}
                    />
                    <label htmlFor="water">{facility.name}</label>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={(e) => this.inputElement.click()}
                  >
                    Choose File
                  </button>
                  <input
                    ref={(input) => (this.inputElement = input)}
                    type="file"
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={this.handleFileChange}
                    className="img-upload-btn"
                    multiple
                  />
                  <label id="fileLabel">
                    {this.state.data.image.length > 0
                      ? `${this.state.data.image.length} Image`
                      : "Choose Image"}
                  </label>
                  {this.state.errors["image"] && (
                    <div className="alert alert-danger">
                      {this.state.errors["image"]}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {this.state.data.image.map((img) => (
                  <li key={img.name}>{img.name}</li>
                ))}
              </div>

              <button className="btn rento-btn btn-primary">Save</button>
              <button
                type="button"
                className="btn rento-btn-danger btn-danger"
                onClick={() => this.props.history.replace("/RoomOwner/MyRooms")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomForm;
