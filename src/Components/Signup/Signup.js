import React, { useRef, useState } from "react";
import { Card, Form, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Signup.css";
import Swal from "sweetalert2";
import AuthButton from "../StyledComponent/AuthButton/AuthButton";

const Signup = () => {
  const location = useLocation();
  const redirectURL = location.state?.from || "/";
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { handleSignup, handleGoogleSignIn, handleGithubSignIn } = useAuth();
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setSignupError("Password do not match");
    } else if (passwordRef.current.value.length < 6) {
      return setSignupError("password must be 6 characters long");
    }
    try {
      setSignupError("");
      setLoading(true);
      await handleSignup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      setSignupError("");
      history.push(redirectURL);
    } catch (error) {
      setSignupError(error.message);
    }
    setLoading(false);
  };
  signupError &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${signupError}`,
    });
  return (
    <>
      {window.scrollTo(0, 40)}
      <Container
        className="d-flex align-items-center justify-content-center my-4 pb-3"
        style={{ minHeight: "100%", height: "100vh" }}
      >
        <section className="w-100" style={{ maxWidth: "450px" }}>
          <Card className=" border-secondary">
            <Card.Body>
              <h2 style={{ color: "#f63e7b" }} className="text-center mb-4">
                Create account
              </h2>
              <div className="social-container text-center my-3">
                <i
                  onClick={() =>
                    handleGoogleSignIn()
                      .then((result) => {
                        history.push(redirectURL);
                      })
                      .catch((error) => {
                        setSignupError(error.message);
                      })
                  }
                  className="fab fa-google-plus-g"
                ></i>
                <i
                  onClick={() =>
                    handleGithubSignIn()
                      .then((result) => {
                        history.push(redirectURL);
                      })
                      .catch((error) => {
                        setSignupError(error.message);
                      })
                  }
                  className="fab fa-github"
                ></i>
              </div>
              <p className="text-center my-3">
                or use your email for registration
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    ref={nameRef}
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    ref={emailRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordConfirmRef}
                  ></Form.Control>
                </Form.Group>
                {loading ? (
                  <AuthButton
                    variant="primary"
                    className="w-100 my-4 shadow-none"
                    disabled
                  >
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
                  <AuthButton type="submit" className="w-100 my-4 shadow-none">
                    Sign up
                  </AuthButton>
                )}
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?
            <Link style={{ color: "#f63e7b" }} to="/login">
              Login
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Signup;
