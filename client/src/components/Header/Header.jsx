import React from "react";
import logo from "../../images/logo(1).png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Header.css";
import { useEffect } from "react";
import { useNavigate, Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginStudent, toggleLoginTeacher } from "../../redux/toggleReducer";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Guest
  const guest = localStorage.getItem('user')

  // user token
  const token = localStorage.getItem("token");

  // Student Information
  const fistName = useSelector(state => state.userInfo.firstName);
  const middleName = useSelector(state => state.userInfo.middleName);
  const regNum = useSelector((state) => state.userInfo.regNum);
  const user = `${fistName} ${middleName}`;

  // Teacher Information
  const fName = useSelector((state) => state.teacherInfo.firstName);
  const mName = useSelector((state) => state.teacherInfo.middleName);
  const regT = useSelector((state) => state.teacherInfo.regNum);
  const teacher = `${fName} ${mName}`;

  // Logout function
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
  }

  // Teacher toggle
  function toggleTech() {
    dispatch(toggleLoginTeacher())
  }

  // Student toggle
 function toggleStu() {
  dispatch(toggleLoginStudent())
 }
  return (
    <>
      <header>
        <Navbar
          expand="lg"
          className="nav py-3 shadow-lg position-fixed w-100 "
          style={{
            zIndex: "99",
            top: "0",
          }}
        >
          <Container>
            <Navbar.Brand href={token ? "/dashboard" : "/"}>
              <img src={logo} alt="" />
            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-lg`}
            ></Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="top"
            >
              <Offcanvas.Body
                style={{
                  backgroundColor: "#245487",
                  top: "56px",
                  height: "calc(100% - 56px)",
                }}
              >
                <Nav href={"/"} className="justify-content-end flex-grow-1 ">
                  {token && (
                    <>
                      <span
                        className="link"
                        style={{
                          color: "white",
                        }}
                      >
                        {guest === 'student' ? user : teacher}
                        <p className="pro-id">ID: {guest === 'student' ? regNum : regT}</p>
                      </span>
                      <div className="header-hidden d-flex flex-column d-lg-none">
                        <Link to={"/dashboard"}>
                          <i className="mx-2 fas fa-chalkboard-teacher"></i>
                          Dashboard
                        </Link>
                        <Link to={"/exam"}>
                          <i className="mx-2 fas fa-question-circle"></i> Quiz
                        </Link>
                        <Link to={"/assigment"}>
                          <i className="mx-2 fas fa-tasks"></i> Assignment
                        </Link>
                        <Link to={"/result"}>Exam result</Link>
                        <Link to={"/score"}>Grade</Link>
                        <Link onClick={logOut} to={"/"}>
                          Log out
                        </Link>
                      </div>
                    </>
                  )}

                  {!token && (
                    <>
                      <Nav.Link
                        className="link"
                        style={{
                          color: "white",
                        }}
                        onClick={() => {
                          toggleStu();
                        }}
                       
                      >
                        Student
                      </Nav.Link>
                      <Nav.Link
                        className="link"
                        style={{
                          color: "white",
                        }}
                        onClick={() => {
                          toggleTech();
                        }}
                      >
                        Teacher
                      </Nav.Link>
                      <Nav.Link
                        className="link"
                        style={{
                          color: "white",
                        }}
                        href="/"
                      >
                        Login
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
export default Header;
