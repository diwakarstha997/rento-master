import React from "react";
import { Carousel } from "react-bootstrap";

const ModifiedCarousel = ({ items }) => {
  return (
    <Carousel>
      {!items ||
        items.map((item) => (
          <Carousel.Item key={item}>
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
