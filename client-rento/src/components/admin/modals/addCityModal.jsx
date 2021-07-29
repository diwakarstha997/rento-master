import { Button, Modal } from "react-bootstrap";
import Forms from "../../common/form";
import Joi from "joi-browser";
import city from "../../../services/locationService";

class AddCityModal extends Forms {
  state = {
    show: false,
    data: {
      name: "",
      totalWard: "",
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
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const message = await city.addCity(data.name, data.totalWard);
      this.props.message(message.data);
      this.props.status(200);
      this.setState({ show: false });

      this.setState((prevState) => {
        let data = Object.assign({}, prevState.data);
        data.name = "";
        data.totalWard = "";
        return { data };
      });
    } catch (ex) {}
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

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
              {this.renderModalButton("Add", "", this.handleSubmits)}
              {this.renderModalButton("Cancel", "", this.handleClose)}
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddCityModal;
