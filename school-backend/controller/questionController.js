import db from "../db/dbconfig.js";

async function getAllQuestions(req, res) {
  const examId = req.params.id;

  const sql = `select * from question join exam on question.exam_id=exam.exam_id where question.exam_id=?`;
  try {
    const [data] = await db.query(sql, [examId]);
    // console.log(data)
    const question = data.map((row) => ({
      id: row.id,
      question: row.question,
      options: [row.option_A, row.option_B, row.option_C, row.option_D],
    }));
    const answer = data.map((row) => {
      if (row.answer === "a") return 0;
      if (row.answer === "b") return 1;
      if (row.answer === "c") return 2;
      if (row.answer === "d") return 3;
    });
    const exam = data.map((row) => ({
      examId: row.exam_id,
      examTitle: row.examTitle,
      time: row.timeAllowed,
      examPass: row.examPassword,
      teacher: row.teacher,
      subject: row.subject,
    }));
    console.log(exam);
    res.status(200).send({ questions: question, answers: answer });
  } catch (error) {
    console.log(error.message);
  }
}

async function postQuestion(req, res) {
  const {
    title,
    option_A,
    option_B,
    option_C,
    option_D,
    answer,
    examTitle,
    timeAllowed,
    examPassword,
    subject,
    teacher,
  } = req.body;
  // console.log(req.body);
  const sql = `INSERT INTO question (exam_id,question, option_A,option_B,option_C,option_D, answer) VALUES (?,?,?,?,?,?,?)`;
  const sql2 = `insert into exam (examTitle, timeAllowed, examPassword, teacher, subject) values (?,?,?,?,?)`;

  try {
    if (
      !title[0] ||
      !option_A[0] ||
      !option_B[0] ||
      !option_C[0] ||
      !option_D[0] ||
      !answer
    ) {
      return res.status(401).json({ msg: "Please provide all data" });
    }

    if (typeof title === "object") {
      const [results] = await db.query(
        sql2,
        [examTitle, timeAllowed, examPassword, teacher, subject],
        (err, results, fields) => {
          if (err) throw err;
        }
      );
      const id = results.insertId;
      console.log(id);
      if (!id) {
        return res.status(401).json({ msg: "Field to get id" });
      }
      let m = 0;
      for (let i = 0; i < title.length; i++) {
        // console.log("test");
        m += 1;
        await db.query(
          sql,
          [
            id,
            title[i],
            option_A[i],
            option_B[i],
            option_C[i],
            option_D[i],
            answer[i],
          ],
          (err) => {
            if (err) throw err;
            console.log(`${m} data added successfully`);
          }
        );
      }
    } else {
      await db.query(
        sql,
        [title, option_A, option_B, option_C, option_D, answer],
        (err) => {
          if (err) throw err;
          console.log("data added successfully");
        }
      );
    }
    res.status(200).json({ msg: "Data added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "data not send to mysql" });
  }
}

async function exam(req, res) {
  const sql = `select * from exam`;
  try {
    const [data] = await db.query(sql);

    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
  }
}

export { getAllQuestions, postQuestion, exam };
