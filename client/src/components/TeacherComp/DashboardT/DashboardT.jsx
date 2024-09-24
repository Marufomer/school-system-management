import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import avater from "../../../images/avater.png";
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";

function DashboardT() {
  const [teacher, setTeacher] = useState(null);
  const token = localStorage.getItem("token");
  const [isloading, setIsLoading] = useState(false);
  const regNum = useSelector((state) => state.userInfo.regNum);


  async function allteacher() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/teacher/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTeacher(data.Teacher);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    allteacher();
  }, []);

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
              {teacher?.map((el) => {
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
                      {el.regNum}
                    </span>
                    <span className="data-col">
                      <strong>Section:</strong>{" "}
                      {el.class}
                    </span>
                  </>
                );
              })}
            </Col>
            <Col className="text-start text-lg-end">
               <img className="avater" src={avater} alt="" />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default DashboardT;
