import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../axiosConfig";
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import SideBar from "../../components/StudentComp/SideBar/SideBar";
import "./Home.css";
import Dashboard from "../../components/StudentComp/Dashboard/Dashboard";
import {  useDispatch } from "react-redux";
import { getUserAction } from "../../redux/userInfoReducer";

function Home() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  async function allStudent() {
    try {
      const { data } = await axios.get("/student/all-student", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      
      const fName = data.Student[0].firstName;
      const mName = data.Student[0].middleName;
      const rNum = data.Student[0].registrationNumber;

      dispatch(getUserAction({fName,mName,rNum}))
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  async function checkStudent() {
    try {
      await axios.get("/student/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }


  useEffect(() => {
    checkStudent();
    allStudent();
  }, []);
  return (
    <>
      <Container className="w-100">
        <Row>
          <Col className="hidden d-lg-block">
            <SideBar />
          </Col>
          <Col lg={9} sm={12}>
            <Dashboard />
            <div className="foot">© 2024 - School System. All Rights Reserved.</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
