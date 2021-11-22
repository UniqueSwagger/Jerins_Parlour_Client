import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="page_404 " style={{ color: "#111827" }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-offset-1 text-center">
              <div className="four_zero_four_bg w-75 mx-auto">
                <h1 className="text-center">404</h1>
              </div>

              <div className="content_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for is not available!</p>

                <NavLink to="/" className="link_404 text-decoration-none">
                  Go to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
