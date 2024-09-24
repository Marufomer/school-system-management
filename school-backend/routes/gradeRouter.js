import express from "express";
import db from "../db/dbconfig.js";

const routerGrade = express.Router();

routerGrade.post("/send_grade", async (req, res) => {
  const {
    subject_id,
    userId,
    midTitle,
    assTitle,
    finalTitle,
    midPoint,
    assPoint,
    finalPoint,
    totalGrade,
  } = req.body;
  const sql = `INSERT INTO grade (subject_id,userId, totalGrade, midPoint, assPoint, finalPoint, midTitle, assTitle, finalTitle) VALUES (?,?,?,?,?,?,?,?,?)`;

  try {
    if (
      subject_id === undefined ||
      subject_id === null ||
      userId === undefined ||
      userId === null ||
      totalGrade === undefined ||
      totalGrade === null ||
      midTitle === undefined ||
      midTitle === null ||
      midPoint === undefined ||
      midPoint === null ||
      assPoint === undefined ||
      assPoint === null ||
      assTitle === undefined ||
      assTitle === null ||
      finalPoint === undefined ||
      finalPoint === null ||
      finalTitle === undefined ||
      finalTitle === null
    ) {
      console.log(req.body);
      return res.status(401).json({ msg: "Please provide all information" });
    }

    if (
      isNaN(subject_id) ||
      isNaN(totalGrade) ||
      isNaN(midPoint) ||
      isNaN(assPoint) ||
      isNaN(finalPoint)
    ) {
      return res
        .status(401)
        .json({ msg: "Please provide correct information" });
    }

    await db.query(sql, [
      subject_id,
      userId,
      totalGrade,
      midPoint,
      assPoint,
      finalPoint,
      midTitle,
      assTitle,
      finalTitle,
    ]);
    res.status(200).json({ msg: "Data successfully added!" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
});
routerGrade.get("/all_grade/:id", async (req, res) => {
  const userId = decodeURIComponent(req.params.id);
  const sql = `select * from grade join subject on grade.subject_id=subject.subject_id where userId=?`;

  try {
    const [data] = await db.query(sql, [userId]);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

export default routerGrade;
