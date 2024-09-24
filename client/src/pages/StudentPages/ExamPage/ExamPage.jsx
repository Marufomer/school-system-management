import React, { useEffect, useRef, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import axios from "../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../../redux/userInfoReducer";
import {
  MoveNextQuestion,
  MovePrevQuestion,
} from "../../../hooks/FetchQuestion";
import "./ExamPage.css";
import { pushAnswer } from "../../../hooks/setResult";
import Question from "../../../components/StudentComp/Question";

function ExamPage() {
  const token = localStorage.getItem("token");
  const [check, setChecked] = useState();
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const isauth = useSelector((state) => state.result.userId);
  const isOuth = useSelector((state) => state.toggle.exam)
  const autho = true

  // getting exam title
  const examTitle = useSelector((state) => state.questions.examTitle);
  

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
      if (isOuth) {
        navigate('/exam')
      }
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  useEffect(() => {
    checkStudent();
    allStudent();
  }, []);
  // next button
  function onNext() {
    console.log("On next click");

    if (trace < queue.length) {
      // update the trace value by one using moveNextaction
      dispatch(MoveNextQuestion());
      if (result.length <= trace) {
        dispatch(pushAnswer(check));
      }
    }

    setChecked(undefined);
  }

  
  // prev button event handler
  function onPrev() {
    // update the trace value by one using moveNextaction
    dispatch(MovePrevQuestion());
  }

  function onchecked(check) {
    // console.log(check);
    setChecked(check)
  }

  // finished exam after the last question
  if (result.length && result.length >= queue.length) {
    return navigate('/result')
  }

  return (
    <>
      <Container className="exam-container">
        {/* <Link to={"/dashboard"}>back to home page</Link> */}
        <h4>{examTitle}</h4>

        {/* display question */}
        <Question onChecked={onchecked} />

        <h2 className="text-light"></h2>

        <Row className="btn-exam">
          <Col>
            {trace > 0 ? (
              <Button className="prev-btn" onClick={onPrev}>
                Prev
              </Button>
            ) : (
              <div></div>
            )}
          </Col>
          <Col className="text-end">
            <Button className="next-btn" onClick={onNext}>
              {trace + 1 === queue.length ? "Finish" : "Next"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ExamPage;
