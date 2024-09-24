import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../../components/StudentComp/SideBar/SideBar";
import {
  Container,
  Modal,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../redux/userInfoReducer";

import "./Material.css";


function Material() {
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
            <Container className="d-material">
              <Container>
                <h2>Resource</h2>
                <hr />
                <p>
                  In this page you will find different material related to your
                  subjects.
                </p>
              </Container>
              <Card style={{ borderRadius: "0" }}>
                <Card.Header
                  className="material-header"
                  style={{ backgroundColor: "#DFF0D8" }}
                >
                  <h4>Biology</h4>
                </Card.Header>
                <Container className="container-material">
                  <Accordion alwaysOpen>
                    <Accordion.Item className=" material-item" eventKey="0">
                      <Accordion.Header>
                        Unit one: Cell biology
                      </Accordion.Header>
                      <Accordion.Body>
                        <Link target="_blank" to={"http://localhost:4000/note"}>
                          <div class="file-format-icon">
                            <i class="far fa-file-pdf" aria-hidden="true"></i>
                          </div>{" "}
                          Cell Wall
                        </Link>{" "}
                        <hr></hr>
                        <Link
                          target="_blank"
                          to={"https://youtu.be/LYgpHNiyLKM"}
                        >
                          <div class="file-format-icon">
                            <i
                              class="fab fa-youtube"
                              aria-hidden="true"
                              _mstvisible="5"
                            ></i>
                          </div>{" "}
                          Prokaryotic cell
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className=" material-item" eventKey="1">
                      <Accordion.Header>Unit two: Genetics</Accordion.Header>
                      <Accordion.Body>
                        <Link>
                          <div class="file-format-icon">
                            <i class="far fa-file-pdf" aria-hidden="true"></i>
                          </div>{" "}
                          What is Genetics
                        </Link>{" "}
                        <hr></hr>
                        <Link>
                          <div class="file-format-icon">
                            <i
                              class="fab fa-youtube"
                              aria-hidden="true"
                              _mstvisible="5"
                            ></i>
                          </div>{" "}
                          Type of gene
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Container>
              </Card>
            </Container>
            <div className="foot">
              © 2024 - School System. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Material;
