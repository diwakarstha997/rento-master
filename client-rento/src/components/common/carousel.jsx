import React from "react";
import { Carousel } from "react-bootstrap";

const imageServer = process.env.REACT_APP_IMAGE_SERVER;

const ModifiedCarousel = ({ items }) => {
  return (
    <Carousel>
      {!items ||
        items.map((item) => (
          <Carousel.Item key={item}>
            <img
              className="d-block w-100"
              src={`${imageServer}/${item}`}
              style={{ height: 600 }}
              alt="Rento_Room_Image"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ModifiedCarousel;
