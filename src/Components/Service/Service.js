import React from "react";
import { Col, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Service.css";

const Service = ({ service: { title, image, description, price, _id } }) => {
  const history = useHistory();
  const handleBooking = (id) => {
    history.push(`/book/${id}`);
  };
  return (
    <Col>
      <Card
        onClick={() => handleBooking(_id)}
        className="border-0 py-4 h-100 service"
      >
        <Card.Img
          className="img-fluid w-25 mx-auto"
          src={
            image
              ? image
              : "https://icon-library.com/images/loading-gif-icon/loading-gif-icon-9.jpg"
          }
          loading="lazy"
          alt={title}
        />
        <Card.Body className="text-center">
          <Card.Title>
            <h5 className="fw-bold">{title}</h5>
          </Card.Title>
          <Card.Text style={{ color: "#f63e7b" }} className="fs-5 fw-bold">
            ${price}
          </Card.Text>
          <Card.Text className="text-muted">{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Service;
