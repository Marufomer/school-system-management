import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../../components/StudentComp/SideBar/SideBar";
import {
  Container,
  Form,
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
import avater from '../../../images/avater.png'

import "./Profile.css";

function Profile() {
  const token = localStorage.getItem("token");
  const [student, setStudent] = useState(null)
  const dispatch = useDispatch();
  const file = useRef();
  const regNum = useSelector((state) => state.userInfo.regNum);
  const user = encodeURIComponent(regNum);
  const [image, setImage] = useState(undefined)
  console.log(image)

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

      setStudent(data.Student[0]);

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
  async function handler(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', file.current.files[0])
    formdata.append('user', user)
    console.log(file.current.files[0]);

    try {
      console.log(user)
      await axios.post(
        `/student/profile/${user}`,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        
      );
    } catch (error) {
      console.log(error)
    }

  }

  async function getImage() {
    try {
      const response = await axios.get(`/student/getprofile/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setImage(response.data.image);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkStudent();
    allStudent();
    getImage()
  }, [regNum]);

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
                <h2>Basic information</h2>
                <hr />
              </Container>
              <Row>
                <Col>
                  <span className="pro-basic">
                    <strong>Full Name</strong>: {student?.firstName}{" "}
                    {student?.middleName} {student?.lastName}
                  </span>
                  <span className="pro-basic">
                    <strong>Reg. ID</strong>: {student?.registrationNumber}
                  </span>
                </Col>
                <Col>
                  <span className="pro-basic">
                    <strong>Section</strong>: 11
                  </span>
                  <span className="pro-basic">
                    <strong>Sex</strong>: Male
                  </span>
                </Col>
              </Row>
              <Form onSubmit={handler}>
                <Row className="old-basic">
                  <Col>
                    <Form.Group
                      className="form-pro"
                      controlId="formBasicPassworOld"
                    >
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        className="w-75"
                        type="password"
                        placeholder="old password"
                      />
                    </Form.Group>
                    <Form.Group
                      className="form-pro"
                      controlId="formBasicPasswordNew"
                    >
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        className="w-75"
                        type="password"
                        placeholder="new password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        className="btn-pro"
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col>
                    <span className="pro-basic">Photo Preview</span>
                    {image && (
                      <img
                        className="pro-image"
                        src={`http://localhost:4000/uploads/${image}`}
                        alt=""
                      />
                    )}
                    {!image && <img className="avater" src={avater} alt="" />}

                    <span className="pro-basic">
                      Allowed Image Formats (JPEG,PNG,GIF,JPG)
                    </span>
                    <Form.Group className="form-pro" controlId="formBasicFile">
                      <Form.Label>Choose your profile picture</Form.Label>
                      <Form.Control
                        ref={file}
                        className="w-75"
                        type="file"
                        placeholder="new password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
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

export default Profile;
