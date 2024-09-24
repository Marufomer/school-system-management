import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SideBar from '../../../../components/StudentComp/SideBar/SideBar'
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import axios from '../../../../axiosConfig'
import './Assign.css'
import {  useDispatch } from "react-redux";
import { getUserAction } from "../../../../redux/userInfoReducer";

function Assign() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

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

      dispatch(getUserAction({ fName, mName, rNum }));

      
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
            <div className="assign">
              <Container>
                <h2>Assignment and Homework page</h2>
                <p>
                  In this page you will find assignments and homework that given
                  by your teachers
                </p>
              </Container>
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ backgroundColor: "#DFF0D8" }}>
                    Biology Assignment
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link target="_blank" to={"http://localhost:4000/note"}>
                      <i class="far fa-file-pdf" aria-hidden="true"></i> What is
                      cell?
                    </Link>
                    <Row>
                      <Col>
                        <span className="d-block my-3">
                          Date of submition: 22 Sept, 2024
                        </span>
                      </Col>
                      <Col className="text-end">
                        <span className="d-block my-3">
                          Submitied to: Amir Seid
                        </span>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Physics Assignment</Accordion.Header>
                  <Accordion.Body>
                    <Link target="_blank" to={"http://localhost:4000/note"}>
                      <i class="far fa-file-pdf" aria-hidden="true"></i> What is
                      force?
                    </Link>
                    <Row>
                      <Col>
                        <span className="d-block my-3">
                          Date of submition: 18 Sept, 2024
                        </span>
                      </Col>
                      <Col className="text-end">
                        <span className="d-block my-3">
                          Submitied to: Maruf Omer
                        </span>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="foot">
              © 2024 - School System. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default  Assign;