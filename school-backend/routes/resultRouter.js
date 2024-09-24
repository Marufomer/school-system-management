import express from "express";
import db from "../db/dbconfig.js";

const routerResult = express.Router();

routerResult.get("/all_result/:id", async (req, res) => {
  const userId = decodeURIComponent(req.params.id);
  const sql = `select * from result where userId=?`;

  try {
    const [data] = await db.query(sql, [userId]);
    console.log(data);
    res.status(200).json(data[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});
routerResult.get("/isTake/:id", async (req, res) => {
  const userId = decodeURIComponent(req.params.id);
  const sql = `select * from result where userId=?`;

  try {
    const [data] = await db.query(sql, [userId]);
    console.log(data);
    if (data[0]) {
      console.log(data);
      return res.status(200).json({ isTake: true });
    } else {
      return res.status(200).json({ isTake: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});
routerResult.post("/send_result", async (req, res) => {
  const { userId, totalQuestion, correctAnswer, incorrectAnswer, mark } =
    req.body;
  // console.log(req.body)
  const sql = `INSERT INTO result (userId, totalQuestion, correctAnswer, incorrectAnswer, mark) VALUES (?,?,?,?,?)`;

  try {
    if (
      userId === undefined ||
      userId === null ||
      totalQuestion === undefined ||
      totalQuestion === null ||
      correctAnswer === undefined ||
      correctAnswer === null ||
      incorrectAnswer === undefined ||
      incorrectAnswer === null ||
      mark === undefined ||
      mark === null
    ) {
      console.log(req.body);
      return res.status(401).json({ msg: "Please provide all information" });
    }
    // console.log(isNaN(attempts))
    const [student] = await db.query(
      "select userId from result where userId = ?",
      [userId]
    );
    console.log(student);
    if (student.length > 0) {
      return res
        .status(401)
        .json({ msg: "Exam result already submittied by these user" });
    }

    if (
      isNaN(totalQuestion) ||
      isNaN(incorrectAnswer) ||
      isNaN(correctAnswer) ||
      isNaN(mark)
    ) {
      return res
        .status(401)
        .json({ msg: "Please provide correct information" });
    }

    await db.query(sql, [
      userId,
      totalQuestion,
      correctAnswer,
      incorrectAnswer,
      mark,
    ]);
    res.status(200).json({ msg: "Data successfully added!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

export default routerResult;
