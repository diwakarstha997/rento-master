import React from "react";
import { Carousel } from "react-bootstrap";
import img from "../../assets/images/rento-resize.png";

const ModifiedCarousel = ({ items }) => {
  return (
    <Carousel>
      {!items ||
        items.map((item) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`/${item}`}
              style={{ height: 600 }}
              alt="Rento_Room_Image"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ModifiedCarousel;
