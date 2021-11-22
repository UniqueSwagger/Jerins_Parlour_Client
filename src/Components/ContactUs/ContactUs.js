import React from "react";
import AuthButton from "../StyledComponent/AuthButton/AuthButton";
import "./ContactUs.css";
const ContactUs = () => {
  return (
    <div className="contact">
      <form
        className="form py-5"
        action="mailto:https://rahmanmahi02@gmail.com"
        style={{ borderRadius: "35px" }}
      >
        <div>
          <h2 style={{ textAlign: "center" }}>
            Let Us Handle Your Project Professionally
          </h2>
        </div>
        <div className=" input-container">
          <div>
            <div className="styled-input wide">
              <input type="text" required />
              <label>Name</label>
            </div>
          </div>
          <div>
            <div className="styled-input">
              <input type="text" required />
              <label>Email</label>
            </div>
          </div>
          <div>
            <div className="styled-input" style={{ float: "right" }}>
              <input type="text" required />
              <label>Phone Number</label>
            </div>
          </div>
          <div>
            <div className="styled-input wide">
              <textarea required></textarea>
              <label>Message</label>
            </div>
          </div>
          <div>
            <AuthButton type="submit">Send Message</AuthButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
