import React from "react";
import Forms from "../../common/form";
import { Button, Modal } from "react-bootstrap";
import Joi from "joi-browser";
import { getCities } from "../../../services/locationService";
import { getFacilities } from "../../../services/facilityService";
import rooms from "../../../services/roomService";

class EditRoom extends Forms {
  state = {
    show: false,
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

  handleFacilityClick = (e) => {
    const data = { ...this.state.data };
    const facility = [...data.facility];
    const checkFacility = facility.filter((f) => f === e.currentTarget.value);
    if (checkFacility.length === 0) {
      data.facility = [...data.facility, e.currentTarget.value];
      console.log(`${e.currentTarget.value} is added`);
    } else {
      data.facility = facility.filter((f) => f.name !== e.currentTarget.value);
      console.log(`${e.currentTarget.value} is removed`);
    }

    this.setState({ data });
    console.log(this.state.data.facility);

    // const { facility } = this.state.data;

    // console.log(facility.filter((f) => f === e.currentTarget.value).length);
  };

  handleChecked = (e) => {
    const { facility } = this.state.data;

    const checked = facility.filter((f) => f === e);
    if (checked.length === 1) return true;
    else return false;
  };

  doSubmit = async () => {
    const { data: value } = this.state;
    const data = await rooms.updateRoom(
      this.props.edit._id,
      value.city,
      value.location,
      value.wardNumber,
      //   value.facility,
      value.monthlyRent,
      value.squareFeet,
      value.description
    );
    this.props.handleMessage(data);
    this.setState({ show: false });
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => {
    const { edit } = this.props;
    let data = this.state.data;
    data.city = edit.city;
    data.wardNumber = edit.wardNumber;
    data.location = edit.location;
    data.facility = edit.facility;
    data.monthlyRent = edit.monthlyRent;
    data.squareFeet = edit.squareFeet;
    data.description = edit.description;
    this.setState({ data, show: true });
  };

  render() {
    const { show } = this.state;

    return (
      <>
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleShow}
        >
          Edit
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} className="mt-3">
              <div className="text-center">
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
                        defaultChecked={this.handleChecked(facility.name)}
                      />
                      <label htmlFor="water">{facility.name}</label>
                    </div>
                  ))}
                </div>

                {this.renderModalButton(
                  "Edit",
                  "btn-primary",
                  this.handleSubmits
                )}
                {this.renderModalButton(
                  "Cancel",
                  "btn-danger",
                  this.handleClose
                )}
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditRoom;
