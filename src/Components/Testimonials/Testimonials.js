import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Rating } from "@mui/material";
import axios from "axios";
import "./Testimonial.css";
import Loader from "../Loader/Loader";
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://vast-plains-88495.herokuapp.com/reviews")
      .then((res) => setReviews(res.data));
  }, [reviews.length]);
  return (
    <div className="my-5">
      <h3 className="text-center">Testimonials</h3>
      {reviews.length ? (
        <Carousel>
          {reviews?.map((review) => {
            const { image, name, company, description, rating, _id } = review;
            return (
              <Carousel.Item key={_id} style={{ height: "100%" }}>
                <div className="text-black text-center my-5 py-5">
                  <div className="d-flex flex-column align-items-center justify-content-center my-3">
                    <div>
                      <img
                        referrerPolicy="no-referrer"
                        style={{ borderRadius: "50%" }}
                        className=" me-2"
                        src={
                          image
                            ? image
                            : "https://i.ibb.co/8cjgLxm/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-des.png"
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <h3>{name}</h3>
                      <h4>{company}</h4>
                    </div>
                  </div>
                  <p className="w-50 mx-auto text-muted fs-5">{description}</p>
                  <h5>
                    <Rating name="read-only" value={rating} readOnly />
                  </h5>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Testimonials;
