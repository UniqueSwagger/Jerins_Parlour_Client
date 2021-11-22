import React from "react";
import "./HandleSkin.css";
import handleSkinImage from "../../images/handleSkin.png";
import CountUp from "react-countup";
import { Container } from "react-bootstrap";
const HandleSkin = () => {
  return (
    <div>
      <div className="py-5 my-5" style={{ backgroundColor: "#FFF8F5" }}>
        <Container className="py-5 my-5">
          <div className="row align-items-center justify-content-between mx-3 mx-lg-0">
            <div className="col-md-12 col-lg-6">
              <img
                style={{ width: "100%" }}
                src={handleSkinImage}
                alt="teeth"
              />
            </div>
            <div className="col-md-12 col-lg-5 mx-auto my-4 my-lg-0">
              <h1>
                Let us handle your screen{" "}
                <span style={{ color: "#f63e7b" }}>professionally</span>.
              </h1>
              <p className="fs-5 text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, inventore recusandae! Deserunt ea labore accusantium,
                ipsa molestiae porro dolor laboriosam. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Suscipit, distinctio.
              </p>
              <div className="mt-5 d-flex align-items-center ">
                <div className="me-5">
                  <h1 style={{ color: "#f63e7b" }}>
                    <CountUp end={500} duration={2} />+
                  </h1>
                  <h6> Happy Customer </h6>
                </div>
                <div className="ms-3">
                  <h1 style={{ color: "#f63e7b" }}>
                    <CountUp end={16} duration={2} />+
                  </h1>
                  <h6> Total Service </h6>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HandleSkin;
