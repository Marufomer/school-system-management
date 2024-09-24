import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import "./Regsiter.css";

// react-redux
import { useSelector, useDispatch } from "react-redux";
import {
  showAlert,
  toggleLogin,
  togglePassword,
} from "../../../hooks/setToggle.js";

function RegsiterTeacher() {
  const navigate = useNavigate();
  const firstName = useRef(null);
  const middleName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const passworD = useRef(null);
  const registerationNumber = useRef(null);
  const password = useSelector((state) => state.toggle.password);
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleLogin());
  }

  function toggle_password() {
    dispatch(togglePassword());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const firstValue = firstName.current.value;
    const middleValue = middleName.current.value;
    const lastValue = lastName.current.value;
    const emailValue = email.current.value;
    const ageValue = age.current.value;
    const passwordValue = passworD.current.value;
    const regValue = registerationNumber.current.value;

    if (
      !firstValue ||
      !middleValue ||
      !lastValue ||
      !emailValue ||
      !ageValue ||
      !passwordValue ||
      !regValue
    ) {
      dispatch(showAlert("Please provide all required information"));
    }

    try {
      const { data } = await axios.post("/student/register", {
        firstName: firstValue,
        middleName: middleValue,
        lastName: lastValue,
        email: emailValue,
        age: ageValue,
        password: passwordValue,
        registerationNumber: regValue,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      navigate("/dashboard");
    } catch (error) {
      dispatch(showAlert(error?.response?.data?.message));
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="py-4 text-center px-md-4 px-sm-5 mx-md-3">
          <h3>Teacher Registeration</h3>
          <p style={{ color: "#656565" }}>
            Already have an account?{" "}
            <span
              onClick={() => {
                toggle();
              }}
              style={{
                color: "rgb(100 147 199)",
                cursor: "pointer",
              }}
            >
              Sign in
            </span>
          </p>
          <div className="px-xl-4 ">
            <Row>
              <Col sm={12} className="my-2">
                <Form.Control
                  ref={email}
                  className="input"
                  type="email"
                  placeholder="Email address"
                />
              </Col>
              <Col sm={12} className="my-2">
                <Form.Control
                  ref={registerationNumber}
                  className="input"
                  type="text"
                  placeholder="Registeration Number"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={firstName}
                  className="input"
                  type="text"
                  placeholder="First name"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={middleName}
                  className="input"
                  type="text"
                  placeholder="Middle name"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={lastName}
                  className="input"
                  type="text"
                  placeholder="last name"
                />
              </Col>
              <Col sm={12} md={6} className="my-2">
                <Form.Control
                  ref={age}
                  className="input"
                  type="number"
                  placeholder="Age"
                />
              </Col>
              <Col sm={12} className="my-2">
                <Form.Control
                  ref={registerationNumber}
                  className="input"
                  type="number"
                  placeholder="Class"
                />
              </Col>
              <Col sm={12} className="my-2 position-relative">
                <Form.Control
                  ref={passworD}
                  className="input"
                  type={password ? "text" : "password"}
                  placeholder="Password"
                />
                <i
                  className={password ? "fa fa-eye-slash" : "fa fa-eye"}
                  onClick={() => {
                    toggle_password();
                  }}
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: "30%",
                    color: "gray",
                    opacity: "0.3",
                    cursor: "pointer",
                  }}
                ></i>
              </Col>
              <Col
                sm={12}
                className="px-4 d-flex justify-content-center text-center"
              ></Col>
              <Col sm={12}>
                <Button
                  className="login-button"
                  type="submit"
                  style={{
                    borderRadius: "0",
                    fontWeight: "500",
                    fontSize: ".875rem",
                    padding: "10px",
                    marginTop: "1rem",
                    backgroundColor: "rgb(49 112 181)",
                    color: "white",
                  }}
                  variant="primary my-2 w-75"
                >
                  Register
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
}

export default RegsiterTeacher;
