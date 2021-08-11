import React from "react";
import Forms from "../../common/form";
import { Modal } from "react-bootstrap";
import Joi from "joi-browser";
import { getCities } from "../../../services/locationService";
import { getFacilities } from "../../../services/facilityService";
import rooms from "../../../services/roomService";

class EditRoom extends Forms {
  state = {
    data: {
      city: "",
      wardNumber: "",
      location: "",
      facility: [],
      monthlyRent: "",
      squareFeet: "",
      description: "",
    },
    errors: {},
    cities: [],
    facilities: [],
  };

  schema = {
    city: Joi.string().required().label("City"),
    wardNumber: Joi.number().required().label("Ward No."),
    location: Joi.string().min(3).max(255).required().label("Location"),
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
  };

  customValidate = (input) => {
    let error = { details: [] };

    let checkWardNumber = false;

    //wardNumber custom validation initilization
    const city = this.state.cities.find((c) => c.name === this.state.data.city);
    let wardNumber = this.state.data.wardNumber;

    if (input && input.wardNumber) {
      checkWardNumber = true;
      wardNumber = input.wardNumber; //wardNumber custom validation initilization
    } else if (input) {
      return false;
    } else {
      checkWardNumber = true;
    }

    //wardNumber custom validation
    if (checkWardNumber && (wardNumber < 0 || wardNumber > city.totalWard)) {
      error.details.push({
        path: ["wardNumber"],
        message: `There are only ${city.totalWard} wards in ${this.state.data.city}`,
      });
    }

    if (error.details.length === 0) return false;

    return error;
  };

  async componentDidMount() {
    const { data } = await getCities();
    const { data: facilities } = await getFacilities();
    const cities = [{ _id: "", name: "", default: "Select City" }, ...data];
    if (!this.populateRoom()) this.props.handleClose();
    this.setState({ cities, facilities });
  }

  populateRoom = () => {
    const { data: roomData } = this.props;
    if (!roomData) return false;
    const data = { ...this.state.data };
    data.city = roomData.city;
    data.wardNumber = roomData.wardNumber;
    data.location = roomData.location;
    data.facility = roomData.facility;
    data.monthlyRent = roomData.monthlyRent;
    data.squareFeet = roomData.squareFeet;
    data.description = roomData.description;
    this.setState({ data });
  };

  handleFacilityClick = (e) => {
    const data = { ...this.state.data };
    const facility = [...data.facility];
    const checkFacility = facility.filter((f) => f === e.currentTarget.value);
    if (checkFacility.length === 0) {
      data.facility = [...data.facility, e.currentTarget.value];
    } else {
      data.facility = facility.filter((f) => f !== e.currentTarget.value);
    }

    this.setState({ data });
  };

  handleChecked = (e) => {
    const { facility } = this.state.data;

    const checked = facility.filter((f) => f === e);
    if (checked.length === 1) return true;
    else return false;
  };

  doSubmit = async () => {
    const { data: roomData } = this.state;
    await rooms.updateRoom(
      this.props.data._id,
      roomData.city,
      roomData.location,
      roomData.wardNumber,
      roomData.facility,
      roomData.monthlyRent,
      roomData.squareFeet,
      roomData.description
    );
    this.props.handleClose();
  };

  handleModalClose = () => {
    this.componentDidMount();
    this.props.handleClose();
  };

  render() {
    const { show } = this.props;
    if (!this.state.data) return "";
    return (
      <React.Fragment>
        <Modal show={show} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="mt-3">
              <div>
                {this.renderSelect("city", "City", this.state.cities, true)}
                {this.renderNumberInput(
                  "wardNumber",
                  "Ward No.",
                  true,
                  this.state.data.city ? false : true
                )}
                {this.renderInput("location", "Location", true)}
                {this.renderNumberInput("squareFeet", "Square Feet", true)}
                {this.renderNumberInput("monthlyRent", "Monthly Rent", true)}
                {this.renderTextArea("description", "Description", true)}

                <div className="form-group">
                  <label htmlFor="facility">
                    Facility <i className="text-danger">*</i>
                  </label>
                  {this.state.facilities.map((facility) => (
                    <div key={facility._id} className="form-group">
                      <input
                        type="checkbox"
                        id={facility._id}
                        name={facility.name}
                        value={facility.name}
                        onClick={this.handleFacilityClick}
                        defaultChecked={this.handleChecked(facility.name)}
                      />
                      <label htmlFor="water">{facility.name}</label>
                    </div>
                  ))}
                </div>

                <button className="btn rento-btn btn-primary">Save</button>
                <button
                  type="button"
                  className="btn rento-btn-danger btn-danger"
                  onClick={this.handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditRoom;
