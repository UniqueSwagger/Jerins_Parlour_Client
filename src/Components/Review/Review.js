import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import AuthButton from "../StyledComponent/AuthButton/AuthButton";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import Swal from "sweetalert2";

const Review = () => {
  const {
    currentUser: { displayName, photoURL },
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const onSubmit = (data, e) => {
    data.rating = value;
    data.image = photoURL;
    if (data.name === "") {
      data.name = displayName;
    }
    axios
      .post("https://vast-plains-88495.herokuapp.com/reviews", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            `Thanks ${displayName} for your feedback`,
            "We will try to improve according to your feedback",
            "success"
          );
          e.target.reset();
        }
      });
  };
  return (
    <div className="text-black my-5  w-50 mx-auto">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            required
            {...register("name")}
            placeholder="Your Name"
            className="fw-bold"
            type="text"
            defaultValue={displayName}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            {...register("company")}
            className="fw-bold"
            type="text"
            placeholder="Company Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            as="textarea"
            row={5}
            {...register("description", { maxLength: 200 })}
            className="fw-bold"
            placeholder="Description"
            type="text"
          />
          {errors.description && (
            <span className="text-danger">
              You can write maximum 200 characters long description
            </span>
          )}
        </Form.Group>

        <div className="mb-3">
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>

        <AuthButton variant="primary" type="submit">
          Submit
        </AuthButton>
      </Form>
    </div>
  );
};

export default Review;
