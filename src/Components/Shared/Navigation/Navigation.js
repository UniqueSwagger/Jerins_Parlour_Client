import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useHistory, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo.png";
import AuthButton from "../../StyledComponent/AuthButton/AuthButton";
import "./Navigation.css";

const Navigation = () => {
  const history = useHistory();
  const {
    currentUser: { displayName, photoURL, email },
    admin,
    handleLogout,
  } = useAuth();
  return (
    <Navbar variant="light" style={{ backgroundColor: "#FFF8F5" }} expand="lg">
      <Container>
        <NavLink style={{ width: "15%" }} className="nav-link logo" to="/">
          <Navbar.Brand className="d-flex align-items-center w-100">
            <img className="logo me-1 img-fluid " src={logo} alt="logoImg" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex align-items-center "
            navbarScroll
          >
            <NavLink className="nav-link fw-bold me-2 " to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link fw-bold me-2 " to="/services">
              Services
            </NavLink>
            {email && admin && (
              <NavLink className="nav-link fw-bold me-2 " to="/admin">
                Admin
              </NavLink>
            )}
            <div>
              {photoURL && (
                <img
                  referrerPolicy="no-referrer"
                  style={{ width: "40px", borderRadius: "50%" }}
                  src={photoURL}
                  loading="lazy"
                  alt="img"
                />
              )}
            </div>
            {displayName && (
              <span className="fw-bold text-muted me-2 px-1 py-2 ms-2">
                {displayName}
              </span>
            )}
            {!displayName ? (
              <Link to="/login">
                <AuthButton className="shadow-none " variant="primary">
                  Login
                </AuthButton>
              </Link>
            ) : (
              <AuthButton
                className="shadow-none"
                variant="primary"
                onClick={() => [handleLogout(), history.push("/")]}
              >
                Log out
              </AuthButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
