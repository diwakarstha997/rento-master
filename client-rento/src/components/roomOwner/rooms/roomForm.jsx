import React from "react";
import Joi from "joi-browser";
import { getCities } from "../../../services/locationService";
import { getFacilities } from "../../../services/facilityService";
import { saveRoom } from "../../../services/roomService";
// import { getAllLocations } from "../../../services/location";
// import { getAllFacilities } from "../../../services/facility";
import Form from "../../common/form";
import Map from "../../common/map";
// import Input from "./../../common/input";

class RoomForm extends Form {
  state = {
    cities: [],
    facilities: [],
    dataChildRef: {
      city: "wardNumber",
    },
    mapData: {
      lng: 83.8532,
      lat: 28.5168,
      zoom: 5.93,
      marker: "",
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
      lat: "",
      lng: "",
      zoom: "",
      marker: "",
      imagePath: [],
    },
    errors: {},
  };

  async componentDidMount() {
    const { data } = await getCities();
    const { data: facilities } = await getFacilities();
    const cities = [
      {
        _id: "",
        name: "",
        default: "Select City",
        map: { lng: 83.8532, lat: 28.5168, zoom: 5.93 },
      },
      ...data,
    ];
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
    description: Joi.string().max(500).required().label("Description"),
    image: Joi.label("Image"),
    lat: Joi.string().required().label("Map"),
    lng: Joi.string().required().label("Map"),
    zoom: Joi.string().required().label("Map"),
    marker: Joi.array().required().label("Map"),
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
      window.location = "/RoomOwner/MyRooms";
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

    const data = { ...this.state.data };

    for (let i = 0; i < fileCount; i++) {
      if (data["image"].length > 9) break;
      if (
        e.currentTarget.files[i].type === "image/jpeg" ||
        e.currentTarget.files[i].type === "image/png"
      ) {
        data["image"] = [...data["image"], e.currentTarget.files[i]];
      }
      console.log(e.currentTarget.files[i]);
    }

    if (fileCount === 1 || data["image"].length < 3) {
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors["image"] = errorMessage;
      else delete errors["image"];
    } else delete errors["image"];

    this.setState({ data, errors });
  };

  handleFileDelete = (imageName) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["image"] = data["image"].filter((img) => img.name !== imageName);

    if (data["image"].length < 3) {
      errors["image"] = "Please upload at least 3 image";
    } else delete errors["image"];

    this.setState({ data, errors });
  };

  handleSelect = () => {
    const location = this.state.cities.filter(
      (city) => city.name === this.state.data.city
    );
    console.log(location);
    const mapData = { ...this.state.mapData };
    mapData.lng = location[0]["map"].lng;
    mapData.lat = location[0]["map"].lat;
    mapData.zoom = location[0]["map"].zoom;
    mapData.marker = "";

    this.setState({ mapData });
    this.setState({ mapRender: true });
  };

  handleMapClick = (lng, lat, zoom, marker) => {
    console.log(lng, lat, zoom, marker);
    const { data } = this.state;
    data.lng = lng;
    data.lat = lat;
    data.zoom = zoom;
    data.marker = [marker.lng, marker.lat];
    this.setState({ data });
  };

  handleRenderControl = () => {
    this.setState({ mapRender: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div style={{ margin: "0 5% 0 5%" }}>
              {this.renderSelect(
                "city",
                "City",
                this.state.cities,
                this.handleSelect
              )}
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
                <br />
                <label className="text-danger" htmlFor="image">
                  *Image must be JPG / PNG, *Only 10 image can be uploaded
                </label>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={(e) => this.inputElement.click()}
                    className="mr-2"
                  >
                    Choose File
                  </button>
                  <input
                    ref={(input) => (this.inputElement = input)}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
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
              <div className="row">
                {this.state.data.image.map((img) => (
                  <div
                    className="m-2 p-2 rounded shadow col-lg-2 col-md-2 col-8"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={img.name}
                      className="room-form-img img-fluid"
                      style={{ position: "block" }}
                    />
                    <i
                      className="room-form-img-trash text-danger fa fa-trash pt-3"
                      style={{
                        position: "absolute",
                        left: "86%",
                        bottom: "70%",
                      }}
                      onClick={() => this.handleFileDelete(img.name)}
                    ></i>
                  </div>
                ))}
              </div>
              <div className="border border-dark">
                <Map
                  mapData={this.state.mapData}
                  handleMapData={this.handleMapClick}
                  renderControl={this.state.mapRender}
                  handleRenderControl={this.handleRenderControl}
                />
              </div>
              {this.state.errors.lat && (
                <div className="alert alert-danger">
                  {this.state.errors.lat}
                </div>
              )}

              <button className="btn rento-btn btn-primary">Save</button>
              <button
                type="button"
                className="btn rento-btn-danger btn-danger ml-2"
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
