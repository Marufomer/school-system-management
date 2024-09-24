import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../../axiosConfig";
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import SideBarT from "../../../components/TeacherComp/SideBarT/SideBarT";
import DashboardT from "../../../components/TeacherComp/DashboardT/DashboardT";
import { useDispatch } from "react-redux";
import { getTeacherAction } from "../../../redux/teacherInfoRedux";
import ModalExam from "../../../components/TeacherComp/Modal/ModalExam";

function CreateExam() {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    async function allTeacher() {
      try {
        const { data } = await axios.get("/teacher/all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const fName = data.Teacher[0].firstName;
        const mName = data.Teacher[0].middleName;
        const rNum = data.Teacher[0].regNum;
        dispatch(getTeacherAction({ fName, mName, rNum }));
      } catch (error) {
        console.log(error);
      }
    }

    const navigate = useNavigate();
    async function checkTeacher() {
      try {
        await axios.get("/teacher/check", {
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
      checkTeacher();
      allTeacher();
    }, []);
  return (
    <>
      <Container className="w-100">
        <Row>
          <Col className="hidden d-lg-block">
            <SideBarT />
          </Col>
          <Col
            lg={9}
            sm={12}
            style={{
              marginTop: "9rem",
            }}
          >
            <Container>
              <h2>Manage Exam</h2>
              <p>
                In this page you can create exam, edit and delete.
              </p>
              <hr/>
            </Container>
            <ModalExam />
            <div className="foot">
              © 2024 - School System. All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );;
}

export default CreateExam;
