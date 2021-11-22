import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Jerin's Parlour</h1>

          <h2>Contact</h2>

          <address>
            115/1 North Kalimabad,Moulvibazar
            <br />
            <a className="footer__btn" href="mailto:rahmanmahi02@gmail.com">
              Email Us
            </a>
          </address>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Services</h2>

            <ul className="nav__ul">
              <li>
                <a href="#services">Anti Age Face Treatment</a>
              </li>
              <li>
                <a href="#services">Hair Color And Styling</a>
              </li>

              <li>
                <a href="#services">Skin Care Treatment</a>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Status</h2>
            <span style={{ color: "#fff2f2" }}>We are open now!</span>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Address</h2>

            <ul className="nav__ul">
              <li>
                <Link to="/home">Jerin's Parlour</Link>
              </li>

              <li>
                <span style={{ color: "#fff2f2" }}>
                  115/1 North Kalimabad,Moulvibazar
                </span>
              </li>

              <li>
                <span style={{ color: "#fff2f2" }}>phone: 01731248533</span>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>

            <ul className="nav__ul">
              <li>
                <span style={{ color: "#fff2f2" }}>Privacy Policy</span>
              </li>

              <li>
                <span style={{ color: "#fff2f2" }}>Terms of Use</span>
              </li>

              <li>
                <span style={{ color: "#fff2f2" }}>Sitemap</span>
              </li>
            </ul>
          </li>
        </ul>

        <div className="legal">
          <p>&copy; 2021 Jerin's Parlour. All rights reserved.</p>

          <div className="legal__links">
            <span>
              Made with <span className="heart">♥</span> remotely from
              Bangladesh
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
