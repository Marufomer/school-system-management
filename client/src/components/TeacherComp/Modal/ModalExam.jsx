import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../axiosConfig2";
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
import "./ModalExam.css";
import { useSelector } from "react-redux";

function ModalExam() {
  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // teacher info
  const fName = useSelector((state) => state.teacherInfo.firstName);
  const mName = useSelector((state) => state.teacherInfo.middleName);

  // alert handler
  const [alert, setAlert] = useState(undefined);

  // handle useEffect
  const [data, setData] = useState(false);

  // question state and functions
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
    },
  ]);

  // create refs for input fields
  const examTitle = useRef()
  const time = useRef()
  const passwD = useRef()
  const title = useRef([]);
  const option_A = useRef([]);
  const option_B = useRef([]);
  const option_C = useRef([]);
  const option_D = useRef([]);
  const answer = useRef([]);

  // function to add multiple questions
  const addMultipleChoiceQuestion = () => {
    setQuestionCount(questionCount + 1);
    setQuestions([
      ...questions,
      {
        id: questionCount + 1,
        type: "multiple-choice",
      },
    ]);
  };

  // function to remove multiple questions
  const removeMultipleChoiceQuestion = () => {
    setQuestionCount(questionCount - 1);
    questions.pop()
  }


  // Function to handle form submission
  async function handle(e) {
    // values of inputs
    const examtValue = examTitle.current.value
    const timeValue = time.current.value
    const passwordValue = passwD.current.value
    const titleValues = [];
    const optionA_values = [];
    const optionB_values = [];
    const optionC_values = [];
    const optionD_values = [];
    const answerValues = [];

    // get values
    title.current.map((v) => {
      titleValues.push(v.value);
    });
    option_A.current.map((v) => {
      optionA_values.push(v.value);
    });
    option_B.current.map((v) => {
      optionB_values.push(v.value);
    });
    option_C.current.map((v) => {
      optionC_values.push(v.value);
    });
    option_D.current.map((v) => {
      optionD_values.push(v.value);
    });
    answer.current.map((v) => {
      answerValues.push(v.value);
    });

    e.preventDefault();
    try {
      const { data } = await axios.post("/question/send_question", {
        title: titleValues,
        option_A: optionA_values,
        option_B: optionB_values,
        option_C: optionC_values,
        option_D: optionD_values,
        answer: answerValues,
        examTitle: examtValue,
        timeAllowed: timeValue,
        examPassword: passwordValue,
        subject: "Maths",
        teacher: `${fName} ${mName}`
      });
      console.log("test");
      console.log(data);
      setAlert(data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlert(error?.response?.data?.msg);
    }
  }
  // posting data to database
  // useEffect(() => {
  //   postQuestion();
  // }, [title])

  return (
    <>
      <Button
        className="create-eaxm-btn"
        variant="primary"
        onClick={() => setShow(true)}
      >
        Create Exam
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
            Create Exam
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="mx-2">
            <div className="col-md-9">
              <form id="create-exam-form" onSubmit={handle}>
                <div id="questions-container">
                  <h3>Multiple Choice</h3>
                  <div className="form-group">
                    <label>Exam Title</label>
                    <input
                      type="text"
                      ref={examTitle}
                      className="form-control"
                      placeholder="Enter exam title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Time Allowed(in minute)</label>
                    <input
                      type="number"
                      ref={time}
                      className="form-control"
                      placeholder="Enter exam title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Exam Password</label>
                    <input
                      type="password"
                      ref={passwD}
                      className="form-control"
                      placeholder="Enter exam title"
                      required
                    />
                  </div>
                  {questions.map((question, index) => (
                    <div className="card mt-3" key={question.id}>
                      <div className="card-header question-header">
                        <h5>Question {index + 1}</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label>Question Text</label>
                          <input
                            type="text"
                            ref={(el) => (title.current[index] = el)}
                            className="form-control"
                            placeholder="Enter question text"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Options</label>
                          <input
                            type="text"
                            ref={(el) => (option_A.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option A"
                            required
                          />
                          <input
                            type="text"
                            ref={(el) => (option_B.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option B"
                            required
                          />
                          <input
                            type="text"
                            ref={(el) => (option_C.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option C"
                            required
                          />
                          <input
                            type="text"
                            ref={(el) => (option_D.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option D"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Correct Option</label>
                          <input
                            type="text"
                            ref={(el) => (answer.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Answer"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary mt-3 create-eaxm-btn"
                  onClick={addMultipleChoiceQuestion}
                >
                  Add Multiple Choice Question
                </button>
                {questions.length >= 2 && (
                  <button
                    type="button"
                    className="btn btn-primary mt-3 create-eaxm-btn"
                    onClick={removeMultipleChoiceQuestion}
                  >
                    Remove Last Question
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-3 create-eaxm-btn"
                >
                  Create Exam
                </button>
                {alert ? (
                  <Alert key={"success"} variant={"success"}>
                    {alert}
                  </Alert>
                ) : (
                  ""
                )}
              </form>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="exam-button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExam;
