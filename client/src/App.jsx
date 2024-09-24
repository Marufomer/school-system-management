import { Navigate,BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import StudentRoutes from "./router/studentRouter";
import "./App.css";
import TeacherRoutes from "./router/teacherRouter";
import Example from './components/TeacherComp/Modal/Example'



const getUserRole = () => {
  const user = localStorage.getItem("user") // stored user role
  return user || "guest"; // Possible roles: 'student', 'teacher', 'admin', 'guest'
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  return allowedRoles.includes(role) ? children : <Navigate to="/" replace />;
};

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Banner />}></Route>

        {/* Student Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentRoutes />
            </ProtectedRoute>
          }
        />
        {/* Teacher Routes */}
        <Route
          path="teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/test" element={<Example />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
