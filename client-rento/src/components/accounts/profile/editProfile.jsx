import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import user from "../../../services/userService";

class EditProfile extends Form {
  state = {
    message: "",
    data: {
      name: "",
      email: "",
      phone: "",
    },
    id: "",
    errors: {},
  };
  schema = {
    name: Joi.string().min(3).max(255).required().label("Name"),
    email: Joi.string().min(5).max(255).required().email().label("Email"),
    phone: Joi.string().min(10).max(10).required().label("Phone Number"),
  };

  async componentDidMount() {
    const { data: users } = await user.getProfileData();
    let data = this.state.data;
    data.name = users.name;
    data.email = users.email;
    data.phone = users.phone;

    this.setState({ data, id: users._id });
  }

  doSubmit = async () => {
    try {
      const { data, id } = this.state;
      const value = await user.editProfileData(
        id,
        data.name,
        data.email,
        data.phone
      );
      console.log(value.data);
      this.props.handleActive("preview");
      this.props.message(value.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const message = ex.response.data;
        this.setState({ message });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {
          <div
            className={`d-flex justify-content-center mx-auto my-3 ${
              this.state.message && "alert alert-danger"
            } text-center admin-alert`}
          >
            {this.state.message}
          </div>
        }
        <div className="d-flex justify-content-center">
          <div className="col-lg-6 col-md-8">
            <h3 className="text-center">Edit Profile</h3>
            <div
              className="card shadow mt-3 px-5"
              style={{ backgroundColor: "rgb(227, 238, 255)" }}
            >
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("name", "Name")}
                  {this.renderInput("email", "Email")}
                  {this.renderInput("phone", "Phone Number")}

                  <div className="text-right">
                    <button className="btn rento-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;
