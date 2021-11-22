import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Form } from "react-bootstrap";
import AuthButton from "../StyledComponent/AuthButton/AuthButton";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./Booking.css";
import Loader from "../Loader/Loader";
const Booking = () => {
  const { id } = useParams();
  const [singleService, setSingleService] = useState({});
  const [myBookings, setMyBookings] = useState([]);
  const {
    currentUser: { displayName, email },
  } = useAuth();
  useEffect(() => {
    axios
      .get(`https://vast-plains-88495.herokuapp.com/services/${id}`)
      .then((res) => setSingleService(res.data));
  }, [id]);

  //getting the user bookings
  useEffect(() => {
    axios
      .get(`https://vast-plains-88495.herokuapp.com/booking/${email}`)
      .then((res) => setMyBookings(res.data));
  }, [email]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.status = "Pending";
    data.service = singleService;
    const exist = myBookings.find(
      (myBooking) => myBooking.title === data.title
    );
    if (!exist) {
      axios
        .post("https://vast-plains-88495.herokuapp.com/booking", data)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire(
              "Good job!",
              `You have booked for ${singleService.title}`,
              "success"
            );
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: `You have already booked for ${singleService.title}`,
      });
    }
  };
  return (
    <div className="text-black my-5  w-50 mx-auto">
      {singleService.title ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              disabled
              {...register("name")}
              className="fw-bold"
              type="text"
              defaultValue={displayName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              required
              disabled
              {...register("email")}
              defaultValue={email}
              className="fw-bold"
              type="email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              required
              disabled
              {...register("service")}
              className="fw-bold"
              type="text"
              defaultValue={singleService.title}
            />
          </Form.Group>
          <div className="mb-3">
            <p className="fw-bold">
              Your service charge will be ${singleService.price}
            </p>
          </div>
          <AuthButton variant="primary" type="submit">
            Submit
          </AuthButton>
        </Form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Booking;
