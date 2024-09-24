import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../../components/StudentComp/SideBar/SideBar";
import {
  Container,
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

import "./Result.css";
import {
  attempts_Number,
  correctAnswer,
  earnPoints_Number,
  flagResult,
} from "../../../helper/helper";

function Result() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);
  const regNum = useSelector((state) => state.userInfo.regNum);
  const user = encodeURIComponent(regNum)

  const totalPoints = queue.length * 10;
  const correct = correctAnswer(result, answers);
  const incorrect = queue.length - correct
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 1);
  const flag = flagResult(totalPoints, earnPoints);
  const [data, setData] = useState([]);
  

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

  async function postResult() {
    try {
      if (isSubmitting) return; // Prevent duplicate submissions
      setIsSubmitting(true); // Set flag before starting
      // Check if any of the values are undefined or null
      if (
        !userId ||
        queue.length === undefined ||
        correct === undefined ||
        incorrect === undefined ||
        earnPoints === undefined
      ) {
        console.error("Missing information:", {
          userId,
          totalQuestion: queue.length,
          correctAnswer: correct,
          incorrectAnswer: incorrect,
          mark: earnPoints,
        });
        return; // Exit the function early if any required field is missing
      }
      await axiosPost.post("/result/send_result", {
        userId: userId,
        totalQuestion: queue.length,
        correctAnswer: correct,
        incorrectAnswer: incorrect,
        mark: earnPoints,
      });
      console.log("data send");
    } catch (error) {
      console.log(error);
    }
  }

  async function getResult() {
    try {
      
      const response = await axiosPost.get(`/result/all_result/${user}`);
      console.log(user);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    checkStudent();
    allStudent();
    if (earnPoints && userId && queue.length > 0) {
      postResult();
    }
    getResult();
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
                <h2>Exam Result</h2>
                <hr />
                <p>In this page you will find your exam results.</p>
              </Container>
              {data.totalQuestion && (
                <table class="table table-bordered table-striped table-hover">
                  <tbody>
                    <tr class="text-primary">
                      {" "}
                      <th className="success-exam" colspan="3">
                        Biology
                      </th>
                    </tr>
                    <tr>
                      <th>S.No.</th>
                      <th>Mid-Exam </th>
                      <th>Result</th>
                    </tr>
                    <tr>
                      <td width="25px">1</td>
                      <td>Total questions</td>
                      <td width="100px">{data.totalQuestion}</td>
                    </tr>
                    <tr>
                      <td width="25px">2</td>
                      <td>Correct answered</td>
                      <td width="100px">{data.correctAnswer}</td>
                    </tr>
                    <tr>
                      <td width="25px">3</td>
                      <td>Incorrect answered</td>
                      <td width="100px">{data.incorrectAnswer}</td>
                    </tr>
                    <tr>
                      <th className="success-exam" colspan="3">
                        Total Mark : {data.mark}/{data.correctAnswer + data.incorrectAnswer}
                        <br />
                      </th>
                    </tr>
                  </tbody>
                </table>
              )}
              {!data.totalQuestion && (
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

export default Result;
