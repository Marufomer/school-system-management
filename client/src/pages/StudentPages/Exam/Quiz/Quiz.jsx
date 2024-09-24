import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../../../components/StudentComp/SideBar/SideBar";
import {
  Container,
  Card,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Form,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import "./Quiz.css";
import axios from "../../../../axiosConfig";
import axiosResult from '../../../../axiosConfig2';
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../../redux/userInfoReducer";
import {setUserId} from '../../../../redux/resultReducer'
import { toggleExamAction } from "../../../../redux/toggleReducer";
import { setExamIdAction, setExamTitleAction } from "../../../../redux/questionReducer";

function Quiz() {
  // state for modal
  const [show, setShow] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // exam data
  const [exam, setExam] = useState([]);

  // input ref for exam password
  const inputPassword = useRef();

  // user token and info
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.result);
  const regNum = useSelector((state) => state.userInfo.regNum);
  const userR = encodeURIComponent(regNum);
  const [isTake, setIsTake] = useState(null);

  // exam id
  const [id, setId] = useState(undefined);
  


  // get user data
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

  // authenticate user
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

  // student result
  async function getuserResult() {
    try {
      const response = await axiosResult.get(`/result/isTake/${userR}`);
      setIsTake(response.data.isTake);
    } catch (error) {
      console.log(error);
    }
  }

  // get exam data
  async function getExamInfo() {
    try {
      const response = await axiosResult.get("/question/exam");
      setExam(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Function to handle assessment button click
  const handleModalClick = (exam) => {
    // console.log(exam);
    // Your modal handling logic here
    setId(exam);
    setShow(true);
  };

  // get exam password and exam title
  const modaPassword = exam.find((i) => i.exam_id === id);

  // handle form
  function handler(e) {
    e.preventDefault();
    
    const secret = modaPassword.examPassword;
    console.log(secret)
    const valuePass = inputPassword.current.value;

    if (!valuePass) {
      return setAlertText("Please provide password to take the exam!");
    }
    if (valuePass !== secret) {
      return setAlertText("Incorrect password");
    }
    if (isTake) {
      return setAlertText(
        "You already take the exam, Please check you result!"
      );
    }
    dispatch(setUserId(regNum));
    dispatch(toggleExamAction());

    // set exam id
    dispatch(setExamIdAction(id))

    // set exam title
    dispatch(setExamTitleAction(modaPassword.examTitle))

    navigate("/onExam");
  }
  useEffect(() => {
    checkStudent();
    allStudent();
    getuserResult();
    getExamInfo();
  }, [regNum]);
  return (
    <>
      <Container className="w-100">
        <Row>
          <Col className="hidden d-lg-block">
            <SideBar />
          </Col>
          <Col lg={9} sm={12}>
            <div className="exam-header">
              <Container>
                <h2>Exam page</h2>
                <p>
                  In this page you find will exams that given by your teachers
                </p>
              </Container>
              <Card>
                <Card.Header style={{ backgroundColor: "#DFF0D8" }}>
                  List of Exam
                </Card.Header>
                {exam?.map((row, index) => (
                  <Card.Body key={index}>
                    <ListGroup>
                      <ListGroup.Item>
                        <Button
                          className="quiz-modal"
                          variant="primary"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => handleModalClick(row.exam_id)}
                        >
                          {row.examTitle}
                        </Button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              {row.examTitle}
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="my-2">
                              To start this exam you need to know the exam
                              password
                            </p>
                            <p className="my-2">
                              Time limit: {row.timeAllowed} minuets
                            </p>
                            <p className="my-2">Total question: 7</p>
                            <Container className="text-center">
                              {alertText ? (
                                <Alert key={"danger"} variant={"danger"}>
                                  {alertText}
                                </Alert>
                              ) : (
                                ""
                              )}
                              <Form onSubmit={handler}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword"
                                >
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                    ref={inputPassword}
                                    className="w-50 exam-passw-input"
                                    type="password"
                                    placeholder="Password"
                                  />
                                </Form.Group>
                                <Button
                                  className="exam-button"
                                  variant="primary"
                                  type="submit"
                                >
                                  Start Exam
                                </Button>
                              </Form>
                            </Container>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="exam-button"
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Card.Text>
                          <Row className="mx-1 quiz-text">
                            <Col>
                              <span className="d-block my-3">
                                Start date: 22 Sept, 2024
                              </span>
                            </Col>
                            <Col className="text-end">
                              <span className="d-block my-3">
                                Prepared by: {row.teacher}
                              </span>
                            </Col>
                          </Row>
                        </Card.Text>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                ))}
              </Card>
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

export default Quiz;
