import React, { useEffect, useState } from 'react'
import axios from "../../../axiosConfig";
import avater from '../../../images/avater.png'
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import './Dashboard.css'
import { useSelector } from 'react-redux';

function Dashboard() {
    const [student, setStudent] = useState(null)
    const token = localStorage.getItem("token");
    const [isloading, setIsLoading] = useState(false);
    const regNum = useSelector((state) => state.userInfo.regNum);
    const user = encodeURIComponent(regNum);
    const [image, setImage] = useState(undefined);


    async function allStudent() {
      setIsLoading(true)
      try {
        const { data } = await axios.get("/student/all-student", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setStudent(data.Student)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
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
        allStudent();
        getImage();
    }, [regNum])

  return (
    <>
      <Container
        className="shadow-lg bg-white p-4 w-md-100  p-lg-5 w-75"
        style={{
          marginTop: "10rem",
          borderRadius: "1rem",
        }}
      >
        {isloading ? (
          <div>is loading</div>
        ) : (
          <Row className="d-block d-lg-flex">
            <Col>
              {student?.map((el) => {
                return (
                  <>
                    <span className="data-col">
                      <strong>Full Name:</strong> {el.firstName} {el.middleName}{" "}
                      {el.lastName}
                    </span>
                    <span className="data-col">
                      <strong>Age:</strong> {el.age}
                    </span>
                    <span className="data-col">
                      <strong>Sex:</strong> Male
                    </span>
                    <span className="data-col">
                      <strong>Email:</strong> {el.email}
                    </span>
                    <span className="data-col">
                      <strong>Registeratio Number:</strong>{" "}
                      {el.registrationNumber}
                    </span>
                  </>
                );
              })}
            </Col>
            <Col className="text-start text-lg-end">
              {image && (
                <img
                  className="pro-image"
                  src={`http://localhost:4000/uploads/${image}`}
                  alt=""
                />
              )}
              {!image && <img className="avater" src={avater} alt="" />}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Dashboard