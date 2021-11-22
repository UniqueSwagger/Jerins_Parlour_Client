import React from "react";
import HandleSkin from "../HandleSkin/HandleSkin";
import HeroSection from "../HeroSection/HeroSection";
import Services from "../Services/Services";
import PinkButton from "../StyledComponent/PinkButton/PinkButton";
import { Link } from "react-router-dom";
import Testimonials from "../Testimonials/Testimonials";
import ContactUs from "../ContactUs/ContactUs";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <div>
        <Services />
        <Link className="text-decoration-none" to="/services">
          <PinkButton className="d-block mx-auto my-5">Explore More</PinkButton>
        </Link>
      </div>
      <HandleSkin />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
