import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";

class EditProfile extends Form {
  state = { data: { name: "" }, errors: {} };

  schema = {
    name: Joi.string().min(3).max(255).required().label("Name"),
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h3 className="text-center">Edit Profile</h3>
          <div
            className="card shadow mt-3 px-5"
            style={{ backgroundColor: "rgb(227, 238, 255)" }}
          >
            <div className="card-body">
              <form>
                {this.renderInput("name", "Name")}

                <div className="text-right">
                  <button className="btn rento-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
