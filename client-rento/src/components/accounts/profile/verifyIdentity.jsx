import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { documentUpload, getProfileData } from "../../../services/userService";

const imageServer = "http://localhost:3000";

class VerifyIdentity extends Form {
  state = {
    databaseImage: "no image",
    errorMessage: "",
    message: "",
    data: {
      image: "",
    },
    errors: {},
  };

  schema = {
    image: Joi.label("Image"),
  };

  async componentDidMount() {
    document.title = "Rento | Document Verification";
    try {
      const { data: userData } = await getProfileData();
      this.setState({
        databaseImage: userData.documentImagePath
          ? userData.documentImagePath
          : "",
      });
    } catch (ex) {}
  }

  customValidate = (input) => {
    let error = { details: [] };

    let checkInputImage = false;

    if (input) {
      return false;
    } else {
      checkInputImage = true;
    }

    //image upload validation
    if (checkInputImage && !this.state.data.image) {
      error.details.push({
        path: ["image"],
        message: `Document Image is required`,
      });
    }

    if (error.details.length === 0) return false;

    return error;
  };

  handleFileChange = (e) => {
    if (!e.currentTarget.files[0]) return;
    const { currentTarget: input } = e;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors["image"] = errorMessage;
    else delete errors["image"];

    const data = { ...this.state.data };

    data["image"] = e.currentTarget.files[0];

    this.setState({ data, errors });
  };

  handleImageUpload = async (e) => {
    e.preventDefault();
    if (!this.state.data.image) {
      this.setState({ errors: { image: "'Image' cannot be empty" } });
      return;
    }
    try {
      await documentUpload(this.state.data);
      this.setState({
        message:
          "Document Uploaded SuccessFully. Document will be reviewed and verified",
      });
      window.scrollTo(0, 0);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorMessage = ex.response.data;
        this.setState({ errorMessage });
        window.scrollTo(0, 0);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {
          <div
            className={`d-flex justify-content-center mx-auto my-3 ${
              this.state.message && "alert alert-success"
            } text-center admin-alert`}
          >
            {this.state.message}
          </div>
        }
        {this.state.errorMessage && (
          <div
            className={`d-flex justify-content-center mx-auto my-3 alert alert-danger`}
          >
            {this.state.errorMessage}
          </div>
        )}
        <div className="d-flex justify-content-center">
          <div className="col-lg-6 col-md-8">
            <h3 className="text-center">Verify Identity</h3>
            <div
              className="card shadow mt-3 px-5"
              style={{ backgroundColor: "rgb(227, 238, 255)" }}
            >
              <div className="card-body">
                <div className="form-group">
                  {/* <form onSubmit={this.handleSubmit}> */}
                  <div className="row">
                    <div className="col-lg mb-4">
                      <label htmlFor="image">Select Document Image:</label>
                    </div>
                    <div className="col-lg">
                      <input
                        type="file"
                        name="image"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={this.handleFileChange}
                      />
                    </div>
                  </div>

                  {this.state.errors["image"] && (
                    <div className="alert alert-danger">
                      {this.state.errors["image"]}
                    </div>
                  )}
                  <div>
                    {(this.state.data.image && (
                      <img
                        src={URL.createObjectURL(this.state.data.image)}
                        width="600px"
                        height="700px"
                        alt="Document Invalid"
                        className="img-fluid"
                      />
                    )) ||
                      (this.state.databaseImage && (
                        <img
                          src={imageServer + "/" + this.state.databaseImage}
                          width="600px"
                          height="700px"
                          alt="Document"
                          className="img-fluid"
                        />
                      )) || (
                        <p className="text-danger">
                          *Please Upload Document Image to get verified
                        </p>
                      )}
                  </div>
                  <div className="text-right my-4">
                    <button
                      className="btn rento-btn"
                      onClick={this.handleImageUpload}
                    >
                      Upload
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VerifyIdentity;
