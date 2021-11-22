import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import Service from "../Service/Service";
import Loader from "../Loader/Loader";
import { useRouteMatch } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    axios
      .get("https://vast-plains-88495.herokuapp.com/services")
      .then((res) => setServices(res.data));
  }, [services.length]);
  return (
    <Container id="services" className="mb-5">
      <h3 className="text-center fw-bold display-6 my-3 mt-5 ">
        Our Awesome <span style={{ color: "#f63e7b" }}>Services</span>
      </h3>
      {services.length ? (
        <Row xs={1} md={2} lg={3} className="g-5 my-1">
          {path === "/home" || path === "/"
            ? services
                .slice(0, 3)
                .map((service) => (
                  <Service service={service} key={service._id} />
                ))
            : services.map((service) => (
                <Service service={service} key={service._id} />
              ))}
        </Row>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Services;
