import React from "react";
import { Container } from "react-bootstrap";
import HeroImage from "../../images/HeroImage.png";
import PinkButton from "../StyledComponent/PinkButton/PinkButton";
import "./HeroSection.css";
const HeroSection = () => {
  return (
    <div style={{ backgroundColor: "#FFF8F5" }}>
      <Container className="mx-auto row align-items-center justify-content-center py-5">
        <div className="col-lg-7  hero-text mb-5 mb-lg-0">
          <h1 style={{ color: "##ebebeb" }} className="display-5 fw-bold ">
            BEAUTY SALON <br /> FOR EVERY WOMEN
          </h1>
          <p className="text-muted w-75 fs-4 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            ducimus sapiente esse recusandae libero, voluptatem harum saepe
            dolorem provident
          </p>
          <PinkButton>Get Appointment</PinkButton>
        </div>
        <div className=" col-lg-5 hero-image">
          <img
            className="img-fluid w-100 "
            loading="lazy"
            src={HeroImage}
            alt="HeroImage"
          />
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
