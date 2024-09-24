import React from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import logo from "../../images/logo(1).png";
import './Footer.css'
// import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
  }
  return (
    <>
      {!token && (
        <footer
          style={{
            backgroundColor: "#3b455a",
            padding: "60px 0 40px 0",
            color: "rgba(213, 213, 213, 0.6)",
            lineHeight: "1.4em",
            fontSize: "14px",
          }}
        >
          <Container>
            <Row>
              <Col sm={12} md={6} className="my-3">
                <Row>
                  <Col sm={12}>
                    <img src={logo} alt="" />
                  </Col>
                </Row>
              </Col>
              
              <Col
                sm={12}
                md={6}
                style={
                  {
                    // textAlign: "right",
                  }
                }
                className="my-3 custom-padding-left"
              >
                <h5 className="text-white">Contact Info </h5>

                <ul
                  style={{
                    listStyle: "none",
                    marginLeft: "-25px",
                    lineHeight: "30px",
                  }}
                >
                  <li>
                    <a href="/">School System</a>
                  </li>
                  <li>
                    <a>omermaruf07@gmail.com</a>
                  </li>
                  <li>
                    <a>+251-91-916-5797</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </>
  );
}

export default Footer