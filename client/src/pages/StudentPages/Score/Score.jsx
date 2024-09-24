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
import axiosPost from "../../../axiosConfig2";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../redux/userInfoReducer";

import "./Score.css";
import {
  attempts_Number,
  correctAnswer,
  earnPoints_Number,
  flagResult,
} from "../../../helper/helper";

function Score() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const regNum = useSelector((state) => state.userInfo.regNum);
  const user = encodeURIComponent(regNum);
  console.log(user)
  
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
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(undefined);
  const [course, setCourse] = useState([])


  // Function to handle assessment button click
  const handleAssessmentClick = (course) => {
    console.log(course)
    // Your modal handling logic here
    setId(course);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  async function getResult() {
    try {
      const response = await axiosPost.get(`/grade/all_grade/${user}`);
      console.log(response.data);
      setCourse(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  const moda = course.find((i) => i.id === id)
  console.log(moda)
 
 

  useEffect(() => {
    checkStudent();
    allStudent();
    getResult()
  }, [regNum]);

  return (
    <>
      <Container className="w-100">
        <Row>
          <Col className="hidden d-lg-block">
            <SideBar />
          </Col>
          <Col lg={9} sm={12}>
            <Container className="d-result">
              <Container>
                <h2>My Grade</h2>
                <hr />
                <p>In this page you will find your subject Grade.</p>
              </Container>
              {course.length > 0 && (
                <>
                  <table
                    style={{ border: "none" }}
                    className="table table-bordered table-striped table-hover"
                  >
                    <tbody>
                      <tr className="score-title">
                        <th align="left" style={{ width: "60px" }}>
                          No.
                        </th>
                        <th align="left">Subject Title</th>
                        <th align="left">Code</th>
                        <th align="left">Grade(%)</th>
                        <th align="left">Assessment</th>
                      </tr>

                      {/* Example Academic Year Row */}
                      {course?.map((course, index) => (
                        <>
                          <tr key={index}>
                            <td>{index +1}</td>
                            <td>{course.subject}</td>
                            <td>{course.subject_code}</td>
                            <td>{course.totalGrade}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-default btn-sm"
                                data-toggle="modal"
                                data-target="#myModal"
                                onClick={() => handleAssessmentClick(course.id)}
                              >
                                Assessment
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}

                      {/* Example Academic Status Row */}
                    </tbody>
                  </table>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Assessment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table class="table table-bordered table-striped table-hover">
                        <tbody>
                          <tr class="text-primary">
                            {" "}
                            <th className="text-primary" colSpan="3">
                              Subject : {moda?.subject}
                            </th>
                          </tr>
                          <tr class="success">
                            <th>S.No.</th>
                            <th>Assessment </th>
                            <th>Result</th>
                          </tr>
                          <tr>
                            <td width="25px">1</td>
                            <td>{moda?.midTitle}</td>
                            <td width="100px">{moda?.midPoint}</td>
                          </tr>
                          <tr>
                            <td width="25px">2</td>
                            <td>{moda?.assTitle}</td>
                            <td width="100px">{moda?.assPoint}</td>
                          </tr>
                          <tr>
                            <td width="25px">3</td>
                            <td>{moda?.finalTitle}</td>
                            <td width="100px">{moda?.finalPoint}</td>
                          </tr>
                          <tr class="success">
                            <th
                              colspan="3"
                              style={{
                                textAlign: "right",
                                marginRight: "15%",
                                backgroundColor: "#DFF0D8",
                              }}
                            >
                              Total Mark : {moda?.totalGrade} / 100
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
              {course.length === 0 && (
                <span>
                  <i style={{ color: "red" }}>No result</i>
                </span>
              )}
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

export default Score;
