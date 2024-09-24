import db from "../db/dbconfig.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();





async function register(req, res) {
  const {
    firstName,
    middleName,
    lastName,
    email,
    age,
    password,
    registerationNumber,
  } = req.body;

  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !email ||
    !age ||
    !password ||
    !registerationNumber
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required information" });
  }

  try {
    const [student] = await db.query(
      "select registrationNumber,student_id from student where registrationNumber = ? or email = ?",
      [registerationNumber, email]
    );
    if (student.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Student already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 character" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO student (firstName, middleName, lastName, email, age, password, registrationNumber) VALUES (?,?,?,?,?,?,?)",
      [
        firstName,
        middleName,
        lastName,
        email,
        age,
        hashedPassword,
        registerationNumber,
      ]
    );

    // sign token
    const [new_student] = await db.query(
      "select registrationNumber,student_id from student where registrationNumber = ? or email = ?",
      [registerationNumber, email])
    const registeration_number = new_student[0].registrationNumber;
    const studentId = new_student[0].student_id;
    const token = jwt.sign({ registeration_number, studentId }, process.env.SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.CREATED)
      .json({
        message: "student login successful",
        token,
        registeration_number, user: "student"
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { registerationNumber, password } = req.body;
  if (!registerationNumber || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required information" });
  }

  try {
    const [student] = await db.query(
      "select registrationNumber,password,student_id from student where registrationNumber = ?",
      [registerationNumber]
    );
    // console.log(student.length)
    if (student.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Either the registeration number or password your entered is incorrect",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, student[0].password);

    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Either the registeration number or password your entered is incorrect",
      });
    }

    // sign token
    const registeration_number = student[0].registrationNumber;
    const studentId = student[0].student_id;
    const token = jwt.sign(
      { registeration_number, studentId },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "student login successful", token, registeration_number, user: "student"});
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

async function checkstudent(req, res) {
  const {registeration_number, studentId} = req.student
  res.status(StatusCodes.OK).json({message: "student valid", registeration_number, studentId})
//   res.send("check student");
}

async function allStudent(req, res) {
    const { registeration_number, studentId } = req.student;
    // console.log(registeration_number)
    try {
        const [student] = await db.query(
          "select * from student where registrationNumber = ? or student_id = ?",
          [registeration_number, studentId]
        );

        res.status(StatusCodes.OK).json({Student: student})
    } catch (error) {
        console.log(error.message);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "something went wrong, try again later!" });
    }
}
async function profilePost(req, res) {
  
  const image = req.file.filename;
  const userId = decodeURIComponent(req.body.user);
  const sql = "insert into image (image, userId) values (?,?)";
  const sqlCheck = 'select * from image where userId=?'

  try {
    const [data] = await db.query(sqlCheck, [userId]);

    if (data[0]) {
      console.log(data)
      await db.query('update image set image=? where userId=?', [image, userId]);
    } else {
      await db.query(sql, [image, userId]);
    }
    // await db.query(sql, [image,userId])
    res.status(StatusCodes.CREATED).json({msg: "image inserted!"})
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }


}
async function profileGet(req, res) {
  const sql = 'select * from image where userId=?'
  const userId = decodeURIComponent(req.params.id);

  try {
    const [data] = await db.query(sql, [userId]);
    res.status(StatusCodes.ACCEPTED).json(data[0])
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, try again later!" });
  }
}

export { register, login, checkstudent, allStudent, profilePost, profileGet};
