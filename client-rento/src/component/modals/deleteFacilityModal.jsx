import { Button, Modal } from "react-bootstrap";
import Forms from "../common/form";
import facility from "../../services/facilityService";

//NOT USED

class DeleteFacilityModal extends Forms {
  state = {
    show: false,
    facilities: [],
    message: "",
    undo: [],
  };

  async componentDidMount() {
    const { data: facilities } = await facility.getFacilities();
    this.setState({ facilities });
  }

  async componentDidUpdate() {
    const { data: facilities } = await facility.getFacilities();
    this.setState({ facilities });
  }

  doSubmit = async (e) => {
    try {
      const { data } = await facility.deleteFacility(e.target.value);
      const message = data.name + " Facility was sucessefully deleted ";
      this.setState({ message, undo: data });
      console.log(this.state.undo);
    } catch (ex) {}
  };

  UndoSubmit = async () => {
    try {
      const { undo } = this.state;
      await facility.addFacility(undo.name, undo.icon);

      this.setState({ undo: [], message: "" });
    } catch (ex) {}
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  render() {
    const { show } = this.state;

    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Delete Facility
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Delete Facility
              {this.state.message && (
                <div className="alert alert-success" role="alert">
                  {this.state.message}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm float-right"
                    onClick={this.UndoSubmit}
                  >
                    Undo
                  </button>
                  /
                </div>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.facilities.map((facility) => (
              <div key={facility._id} className="form-group">
                <div>
                  {facility.name}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm float-right"
                    value={facility._id}
                    onClick={this.doSubmit}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DeleteFacilityModal;
