import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "../../../axiosConfig.js";
// import "./Login.css";
// react-redux
import { useSelector, useDispatch } from "react-redux";
import {
  showAlert,
  togglePassword,
  toggleRrgister,
} from "../../../hooks/setToggle.js";
import { toggleRegisterAction } from "../../../redux/toggleReducer.js";

function LoginTeacher() {
  const navigate = useNavigate();
  const passworD = useRef(null);
  const registerationNumber = useRef(null);
  const password = useSelector((state) => state.toggle.password);
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleRegisterAction());
  }

  function toggle_password() {
    dispatch(togglePassword());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const passwordValue = passworD.current.value;
    const regValue = registerationNumber.current.value;

    if (!passwordValue || !regValue) {
      dispatch(showAlert("Please provide all required information"));
    }

    try {
      const { data } = await axios.post("/teacher/login", {
        password: passwordValue,
        registerationNumber: regValue,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      navigate("/teacher/dashboard");
    } catch (error) {
      dispatch(showAlert(error?.response?.data?.message));
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="form py-5 text-center px-md-1 px-sm-5 mx-md-3">
          <h3>Teacher Login</h3>
          <p
            style={{
              color: "#656565",
            }}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => {
                toggle();
              }}
              style={{
                color: "rgb(100 147 199)",
                cursor: "pointer",
              }}
            >
              {" "}
              Create a new account
            </span>
          </p>
          <div className="px-xl-4 ">
            <Row>
              <Col sm={12} className="my-2">
                <Form.Control
                  className="input"
                  ref={registerationNumber}
                  type="text"
                  placeholder="Registeration Number"
                />
              </Col>

              <Col sm={12} className="my-2 position-relative">
                <Form.Control
                  className="input"
                  ref={passworD}
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
              <Col sm={12}>
                <Button
                  className="login-button"
                  style={{
                    borderRadius: "0",
                    fontWeight: "500",
                    fontSize: ".875rem",
                    padding: "10px",
                    marginTop: "1rem",
                    backgroundColor: "rgb(49 112 181)",
                    color: "white",
                  }}
                  type="submit"
                  variant="my-4 w-75"
                >
                  Login
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
}

export default LoginTeacher;
