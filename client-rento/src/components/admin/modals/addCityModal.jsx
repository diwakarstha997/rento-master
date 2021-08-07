import { Button, Modal } from "react-bootstrap";
import Forms from "../../common/form";
import Joi, { errors } from "joi-browser";
import city from "../../../services/locationService";
import Map from "../../common/map";

class AddCityModal extends Forms {
  state = {
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
  };
  schema = {
    name: Joi.string().required().label("Name"),
    totalWard: Joi.number()
      .integer()
      .min(25)
      .max(200)
      .required()
      .label("TotalWard"),
    lat: Joi.string().required().label("Map"),
    lng: Joi.string().required().label("Map"),
    zoom: Joi.string().required().label("Map"),
    marker: Joi.array().required().label("Map"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data);
      const message = await city.addCity(
        data.name,
        data.totalWard,
        data.lng,
        data.lat,
        data.zoom,
        data.marker
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
    } catch (ex) {}
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => {
    this.setState({ show: true });
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
            <form onSubmit={this.handleSubmit} className="mt-3">
              {this.renderInput("name", "City Name", "text", "autoFocus")}
              {this.renderNumberInput("totalWard", "TotalWard")}
              <Map handleMapData={this.handleMapClick} />
              {this.state.errors.lat && (
                <div className="alert alert-danger">
                  {this.state.errors.lat}
                </div>
              )}
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
