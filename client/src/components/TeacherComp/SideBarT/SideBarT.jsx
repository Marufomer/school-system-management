import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Accordion,
  Button,
  Collapse,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import './SideBarT.css'

function SideBarT() {
  const loc = useLocation().pathname;
  const [openHome, setOpenHome] = useState(false);
  const [openResult, setopenResult] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const token = localStorage.getItem("token");
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  console.log(loc);

  return (
    <>
      <div
        className=" position-fixed side flex-shrink-0 p-4"
        style={{ width: "260px", backgroundColor: "", padding: "" }}
      >
        <ListGroup
          className="shadow-sm"
          style={{ borderRadius: "0.3rem" }}
          variant="flush"
        >
          <ListGroup.Item>
            <Button
              onClick={() => setOpenHome(!openHome)}
              aria-controls="home-collapse"
              aria-expanded={openHome}
              variant="link"
              className="d-inline-flex align-items-center rounded border-0 collapsed"
            >
              <i className="mx-2 fas fa-chalkboard-teacher"></i>Dashboard
            </Button>
            <Collapse in={openHome}>
              <div id="home-collapse">
                <ListGroup
                  variant="flush"
                  className="btn-toggle-nav fw-normal pb-1 small"
                >
                  <ListGroup.Item
                    action
                    href="/teacher/dashboard"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      loc === "/teacher/dashboard" ? "active" : ""
                    }`}
                  >
                    Overview
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Collapse>
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
              onClick={() => setOpenDashboard(!openDashboard)}
              aria-controls="dashboard-collapse"
              aria-expanded={openDashboard}
              variant="link"
              className="d-inline-flex align-items-center rounded border-0 collapsed"
            >
              <i className="mx-2 fas fa-pencil-alt"></i>Create Exam
            </Button>
            <Collapse in={openDashboard}>
              <div id="dashboard-collapse">
                <ListGroup
                  variant="flush"
                  className="btn-toggle-nav fw-normal pb-1 small"
                >
                  <ListGroup.Item
                    action
                    href="/assigment"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded teach-ass ${
                      loc === "/assigment" ? "active" : ""
                    }`}
                  >
                    <i className="mx-2 fas fa-tasks"></i>Create Assignment
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="/teacher/createExam"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded teach-ass ${
                      loc === "/teacher/createExam" ? "active" : ""
                    }`}
                  >
                    <i className="mx-2 fas fa-question-circle"></i>Create Quiz
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Collapse>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              onClick={() => setopenResult(!openResult)}
              aria-controls="dashboard-collapse"
              aria-expanded={openResult}
              variant="link"
              className="d-inline-flex align-items-center rounded border-0 collapsed"
            >
              <i className="mx-2 fas fa-clipboard-check"></i>Student Result
            </Button>
            <Collapse in={openResult}>
              <div id="dashboard-collapse">
                <ListGroup
                  variant="flush"
                  className="btn-toggle-nav fw-normal pb-1 small"
                >
                  <ListGroup.Item
                    action
                    href="/result"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded teach-ass ${
                      loc === "/result" ? "active" : ""
                    }`}
                  >
                    Student result
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="/score"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded teach-ass ${
                      loc === "/score" ? "active" : ""
                    }`}
                  >
                    Student Grade
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Collapse>
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
              onClick={() => setOpenOrders(!openOrders)}
              aria-controls="orders-collapse"
              aria-expanded={openOrders}
              variant="link"
              className="d-inline-flex align-items-center rounded border-0 collapsed"
            >
              <i className="mx-2 fas fa-university"></i>Add Resource
            </Button>
            <Collapse in={openOrders}>
              <div id="orders-collapse">
                <ListGroup
                  variant="flush"
                  className="btn-toggle-nav fw-normal pb-1 small"
                >
                  <ListGroup.Item
                    action
                    href="/resource"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      loc === "/resource" ? "active" : ""
                    }`}
                  >
                    <i className="mx-2 fas fa-book"></i> Book
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Collapse>
          </ListGroup.Item>

          <ListGroup.Item className="border-top my-3"></ListGroup.Item>

          <ListGroup.Item>
            <Button
              onClick={() => setOpenAccount(!openAccount)}
              aria-controls="account-collapse"
              aria-expanded={openAccount}
              variant="link"
              className="d-inline-flex align-items-center rounded border-0 collapsed"
            >
              <i className="mx-2 fas fa-user"></i> Account
            </Button>
            <Collapse in={openAccount}>
              <div id="account-collapse">
                <ListGroup
                  variant="flush"
                  className="btn-toggle-nav fw-normal pb-1 small"
                >
                  <ListGroup.Item
                    action
                    href="/profile"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      loc === "/profile" ? "active" : ""
                    }`}
                  >
                    <i className="mx-2 fas fa-user-circle"></i> Profile
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="/"
                    onClick={logOut}
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    <i className="mx-2 fas fa-sign-out-alt"></i> log out
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Collapse>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}

export default SideBarT