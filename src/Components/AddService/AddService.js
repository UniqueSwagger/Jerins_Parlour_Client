import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import AuthButton from "../StyledComponent/AuthButton/AuthButton";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const AddService = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm(); // initialize the hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    if (!picture) {
      setError("Image is required");
      setLoading(false);
    } else {
      data.image = picture;
      axios
        .post("https://vast-plains-88495.herokuapp.com/services", data)
        .then(() => setLoading(false))
        .then(() => {
          Swal.fire(
            "Good job!",
            "Successfully added a new service!",
            "success"
          ).then(() => {
            window.scrollTo(0, 40);
            history.push("/services");
          });
        });
    }
  };
  const [picture, setPicture] = useState("");
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture(pictureDataURLs);
  };
  return (
    <Container style={{ borderRadius: "35px" }} className="p-5 bg-white my-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={2} sm={2} md={2}>
          <div className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Title</Form.Label>
              <Form.Control
                {...register("title")}
                required
                type="text"
                placeholder="Enter Service Name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Event description</Form.Label>
              <Form.Control
                required
                {...register("description")}
                as="textarea"
                placeholder="Enter description"
                rows={3}
              />
            </Form.Group>
            {loading ? (
              <AuthButton className="me-auto d-block my-5 w-75" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </AuthButton>
            ) : (
              <AuthButton className="me-auto d-block my-5 w-75" type="submit">
                Submit
              </AuthButton>
            )}
          </div>
          <div style={{ width: "45%" }} className="mx-auto">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Event description</Form.Label>
              <Form.Control
                required
                type="number"
                {...register("price")}
                placeholder="Enter Price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Banner</Form.Label>
              <div>
                {picture ? (
                  <img className="w-25" src={picture ? picture : ""} alt="" />
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  ""
                )}
                <ImageUploader
                  withIcon
                  className="shadow"
                  labelStyles={{ color: "black", width: "70%" }}
                  onChange={onDrop}
                  singleImage
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
            </Form.Group>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default AddService;
