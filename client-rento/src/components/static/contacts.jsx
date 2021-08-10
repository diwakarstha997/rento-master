import React from "react";

const Contacts = () => {
  return (
    <div className="container-fluid " style={{ textAlign: "center" }}>
      <div className="container px-5 mx-6 pt-5 pb-5 ">
        <div className="container px-5 mx-6 pt-4 pb-4 ">
          <h2 className=" display-4 mb-4" mt-3 mb-4>
            Contact Us
          </h2>
          <hr />
          <div className="my-5">
            <h5 className="font-weight-bold text-center mt-3 mb-4">
              Social Media
            </h5>
            <p className="h6 mb-3">
              For all enquiries, please contact us at below link's
            </p>
            <br />
            <ul className="list-unstyled list-inline text-center">
              <li className="list-inline-item">
                <a className="btn-floating btn-fb mx-1" href="/contact">
                  <i className="fa fa-2x fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-tw mx-1" href="/contact">
                  <i className="fa fa-2x fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-gplus mx-1" href="/contact">
                  <i className="fa fa-2x fa-linkedin"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a className="btn-floating btn-li mx-1" href="/contact">
                  <i className="fa fa-2x fa-google-plus"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <h5 className="display-5  mt-3 mb-4">Find Us At</h5>
          <div className="col text-center">
            <address>
              <strong>Rento</strong>
              <br />
              Chuchchepati, Kathmandu
              <br />
              ZipCode-44601 Bagmati Nepal
            </address>
            <p>
              <i className="icon-phone"></i> +977-9843151515 <br />
              <i className="icon-envelope-alt"></i> Rento@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
