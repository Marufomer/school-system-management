import {Routes, Route} from 'react-router-dom'

// Import all student-related components
import Home from "../pages/StudentPages/Home";
import Assign from "../pages/StudentPages/Exam/Assign/Assign";
import Quiz from "../pages/StudentPages/Exam/Quiz/Quiz";
import ExamPage from "../pages/StudentPages/ExamPage/ExamPage";
import Result from "../pages/StudentPages/Result/Result";
import Score from "../pages/StudentPages/Score/Score";
import Material from "../pages/StudentPages/Material/Material";
import Profile from "../pages/StudentPages/Profile/Profile";

function StudentRoutes() {
    return (
      <Routes>
        <Route path="dashboard" element={<Home />}></Route>
        <Route path="assigment" element={<Assign />}></Route>
        <Route path="exam" element={<Quiz />}></Route>
        <Route path="onexam" element={<ExamPage />}></Route>
        <Route path="result" element={<Result />}></Route>
        <Route path="score" element={<Score />}></Route>
        <Route path="resource" element={<Material />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Routes>
    );
};

export default StudentRoutes;