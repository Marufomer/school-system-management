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
import { useDispatch, useSelector } from "react-redux";
// import "../../pages/StudentPages/ExamPage/ExamPage.css";
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { updateResult } from "../../hooks/setResult";

function Question({ onChecked }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [checked, setChecked] = useState(undefined);
  const { trace, queue } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);
  const id = useSelector((state) => state.questions.examId);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion(id);
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  
  console.log(id);

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    // dispatch(updateResult({ trace, checked }));
  }

  const [timeLeft, setTimeLeft] = useState(120); // 30 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      // Submit the form when time runs out
      navigate('/result')
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount or when time reaches zero
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format the time as hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  return (
    <>
      <Row className="d-row">
        <Col>
          <Card className="d-question">
            <Card.Body className="d-text">
              Question {trace + 1} of {queue.length}
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-end">
          <Card className="d-question d-q-time">
            <Card.Body className="d-text">
              Time left {formatTime(timeLeft)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="p-3" style={{ backgroundColor: "#DFF0D8" }} body>
        <div class="form-group" key={questions?.id}>
          <label className="qeustion-title">{questions?.question}</label>

          {questions?.options.map((q, i) => (
            <div class="form-check" key={i}>
              <input
                class="form-check-input"
                type="radio"
                name="options"
                id={`q${i}`}
                value={false}
                onChange={() => onSelect(i)}
                checked={result[trace] === i}
              />
              <label class="form-check-label" for={`q${i}`}>
                {q}
              </label>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

export default Question;
