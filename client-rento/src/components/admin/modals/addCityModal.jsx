import { Button, Modal } from "react-bootstrap";
import Forms from "../../common/form";
import Joi from "joi-browser";
import city from "../../../services/locationService";
import Map from "../../common/map";

class AddCityModal extends Forms {
  state = {
    message: "",
    show: false,
    data: {
      name: "",
      totalWard: "",
      // lat: "",
      // lng: "",
      // zoom: "",
      // marker: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    totalWard: Joi.number()
      .integer()
      .min(25)
      .max(200)
      .required()
      .label("TotalWard"),
    // lat: Joi.string().required().label("Map"),
    // lng: Joi.string().required().label("Map"),
    // zoom: Joi.string().required().label("Map"),
    // marker: Joi.array().required().label("Map"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      const message = await city.addCity(
        data.name,
        data.totalWard,
        // data.lng,
        // data.lat,
        // data.zoom,
        // data.marker
      );
      this.props.message(message.data);
      this.props.status(200);
      this.setState({ show: false });

      this.setState((prevState) => {
        let data = Object.assign({}, prevState.data);
        data.name = "";
        data.totalWard = "";
        data.lng = "";
        data.lat = "";
        data.zoom = "";
        data.marker = "";
        return { data };
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ message: ex.response.data });
      }
    }
  };

  reset = () => {
    this.setState({
      message: "",
      show: false,
      data: {
        name: "",
        totalWard: "",
        lat: "",
        lng: "",
        zoom: "",
        marker: "",
      },
      errors: {},
    });
  };

  handleClose = () => this.reset();

  handleShow = () => {
    this.setState({ show: true });
  };

  handleMapClick = (lng, lat, zoom, marker) => {
    const { data } = this.state;
    data.lng = lng;
    data.lat = lat;
    data.zoom = zoom;
    data.marker = [marker.lng, marker.lat];
    this.setState({ data });
  };

  render() {
    const { show } = this.state;

    return (
      <>
        <Button
          type="button"
          className="btn-sm btn-primary float-right mx-2 mb-1 mt-2"
          onClick={this.handleShow}
        >
          Add City
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add City</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.message && (
              <p className="text-danger alert-danger rounded p-2">
                {this.state.message}
              </p>
            )}
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput("name", "City Name", "text", "autoFocus")}
              {this.renderNumberInput("totalWard", "TotalWard", true)}
              <p style={{ fontSize: "12px" }}>
                * Find ward info for cities at{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wards_and_electoral_divisions_of_Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wikipedia wardinfo
                </a>
              </p>
              {/* <Map handleMapData={this.handleMapClick} />
              {this.state.errors.lat && (
                <div className="alert alert-danger">
                  {this.state.errors.lat}
                </div>
              )} */}
              <div className="text-center">
                {this.renderModalButton(
                  "Add",
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

export default AddCityModal;
