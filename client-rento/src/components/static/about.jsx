import React from "react";

const About = () => {
  return (
    <React.Fragment>
      <div className="container-fluid   " style={{ textAlign: "center" }}>
        <div className="container px-5 mx-6 pt-5 pb-5 ">
          <div className="container px-5 mx-6 pt-4 pb-4 ">
            <h2 className=" display-4 mb-4" mt-3 mb-4>
              About Us
            </h2>

            <div
              className="my-5"
              style={{
                margin: "auto",
                textAlign: "center",
                maxWidth: "400px",
                minWidth: "100px",
              }}
            >
              <p className="h6 mb-3">
                “Rento” is a website for providing a platform to rent rooms or
                search available rooms which will create an online platform for
                house owners of different places. The idea of “Rento'' is to
                provide an online platform for room owners and room seekers.
              </p>
            </div>
            <hr />
            <div className="my-5">
              <h2 className="mb-4" mt-3 mb-4>
                ADD ROOM AND RENT YOUR ROOM TODAY
              </h2>
              <h2 className="mb-4" mt-3 mb-4>
                SEARCH ROOM, ENQUIRE AND GET YOUR ROOM TODAY
              </h2>
            </div>
            <hr />
            <h5 className=" display-6 mt-2 mb-4">Our Social Medias</h5>

            <div className="container py-5 text-center">
              <div className="row">
                <div className="col">
                  <svg
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    role="img"
                    aria-label="Placeholder: 140x140"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#777" />
                    <image href="" width="145" /> {/* image */}
                  </svg>

                  <h2>Diwakar Shrestha</h2>
                  <p>diwakarshrestha@kcc.edu.np</p>
                  <p>
                    <a
                      className="btn btn-primary"
                      href="https://www.facebook.com/diwakar.shrestha.3979"
                      role="button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact &raquo;
                    </a>
                  </p>
                </div>
                <div className="col">
                  <svg
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    role="img"
                    aria-label="Placeholder: 140x140"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#777" />
                    <image href="" width="145" /> {/* image */}
                  </svg>

                  <h2>Mani Maharjan</h2>
                  <p>manimaharjan@kcc.edu.np</p>
                  <p>
                    <a
                      className="btn btn-primary"
                      href="https://www.facebook.com/mAni.mrj"
                      role="button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact &raquo;
                    </a>
                  </p>
                </div>
                <div className="col">
                  <svg
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    role="img"
                    aria-label="Placeholder: 140x140"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#777" />
                    <image href="" width="145" /> {/* image */}
                  </svg>

                  <h2>Mausam Shrestha</h2>
                  <p>mausamshrestha@kcc.edu.np</p>
                  <p>
                    <a
                      className="btn btn-primary"
                      href="https://www.facebook.com/climate.weathe13"
                      role="button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact &raquo;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
