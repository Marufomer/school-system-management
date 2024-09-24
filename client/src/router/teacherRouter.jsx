import { Routes, Route } from "react-router-dom";

// Import all Teacher-related components
import Home from "../pages/TeacherPages/HomeTeach";
import CreateExam from "../pages/TeacherPages/CreateExam/CreateExam";

function TeacherRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Home />}></Route>
      <Route path="createExam" element={<CreateExam />}></Route>
    </Routes>
  );
}

export default TeacherRoutes;
