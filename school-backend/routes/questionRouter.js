import express from "express";
import {
  getAllQuestions,
  postQuestion,
  exam,
} from "../controller/questionController.js";

const routerQuestion = express.Router();

routerQuestion.get("/all_question/:id", getAllQuestions);

routerQuestion.post("/send_question", postQuestion);

routerQuestion.get("/exam", exam);

export default routerQuestion;
