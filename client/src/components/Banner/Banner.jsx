import React, {useContext, useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import './Banner.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Login from '../Login/Login';
import Regsiter from '../Regsiter/Regsiter';
import LoginTeacher from '../TeacherLR/LoginTeacher/LoginTeacher';
import RegsiterTeacher from '../TeacherLR/RegsiterTeacher/RegsiterTeacher';

// react-redux
import { useSelector, useDispatch } from 'react-redux';
import { toggleRrgister } from '../../hooks/setToggle';



function Home() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const alert = useSelector(state => state.toggle.alert);
  const login = useSelector(state => state.toggle.login);
  const loginStudent = useSelector((state) => state.toggle.loginStudent);
  const LoginTeach = useSelector((state) => state.toggle.loginTeacher);
  console.log(LoginTeach)

  function toggle() {
      dispatch(toggleRrgister())
  }

  useEffect(() => {
    token ? navigate('/dashboard'): navigate('/')
  }, [])

  return (
    <>
      <section
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "130px",
          paddingBottom: "170px",
          marginTop: "60px",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div
                className="col rounded bg-white shadow h-100"
                sm={12}
                md={6}
                style={{
                  height: "460px",
                }}
              >
                <div
                  style={{
                    color: "#721c24",
                    backgroundColor: "#f8d7da",
                    borderColor: " #f5c6cb",
                  }}
                  className={`rounded-top mb-3 text-center  ${
                    alert && "py-2"
                  } `}
                >
                  
                  {alert}
                </div>
                {loginStudent && (login ? <Login /> : <Regsiter />)}
                {LoginTeach && (login ? <LoginTeacher /> : <RegsiterTeacher />)}
              </div>
            </Col>
            <Col className="banner-text" sm={12} md={6}>
              <div className="pt-5 px-4">
                <small style={{ color: "#656565" }}>About</small>
                <h1 className="mb-4"> School System </h1>
                <p
                  style={{
                    lineHeight: "30px",
                    width: "",
                  }}
                >
                  No matter what stage of life you are in, whether you’re just
                  starting elementary school or being promoted to CEO of a
                  Fortune 500 company, you have much to offer to those who are
                  trying to follow in your footsteps.
                  <br />
                  <br />
                  This website is designed to provide services for students,
                  teachers and for those who play management role at School
                  System.
                </p>
                <Button
                  className="about-button"
                  onClick={() => {
                    toggle();
                  }}
                  style={{
                    borderRadius: "0",
                    backgroundColor: "rgb(49 112 181)",
                    border: "none",
                  }}
                >
                  Create a new account
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}


export default Home;