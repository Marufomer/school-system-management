import db from "../db/dbconfig.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function registerteacher(req, res) {
    const {
      firstName,
      middleName,
      lastName,
      email,
      age,
      password,
      registerationNumber,
      section,
    } = req.body;

    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !email ||
      !age ||
      !password ||
      !registerationNumber ||
      !section
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all required information" });
    }

    try {
      const [teacher] = await db.query(
        "select regNum,teacher_id from teacher where regNum = ? or email = ?",
        [registerationNumber, email]
      );

      if (teacher.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "teacher already registered" });
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
        "INSERT INTO teacher (firstName, middleName, lastName, email, age, password, regNum, class) VALUES (?,?,?,?,?,?,?,?)",
        [
          firstName,
          middleName,
          lastName,
          email,
          age,
          hashedPassword,
          registerationNumber,
          section,
        ]
      );

      // sign token
      const [new_teacher] = await db.query(
        "select regNum,teacher_id from teacher where regNum = ? or email = ?",
        [registerationNumber, email]
      );
      const registeration_number = new_teacher[0].regNum;
      const teacherId = new_teacher[0].teacher_id;
      const token = jwt.sign({ registeration_number, teacherId }, process.env.SECRET, {
        expiresIn: "1d",
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Teacher Register successful",
        token,
        registeration_number,
        user: "teacher",
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "something went wrong, try again later!" });
    }
}
async function loginTeacher(req, res) {
    const { registerationNumber, password } = req.body;
    if (!registerationNumber || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all required information" });
    }

    try {
      const [teacher] = await db.query(
        "select regNum,password,teacher_id from teacher where regNum = ?",
        [registerationNumber]
      );
      // console.log(teacher.length)
      if (teacher.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "Either the registeration number or password your entered is incorrect",
        });
      }
      // compare password
      const isMatch = await bcrypt.compare(password, teacher[0].password);

      if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "Either the registeration number or password your entered is incorrect",
        });
      }

      // sign token
      const registeration_number = teacher[0].regNum;
      const teacherId = teacher[0].teacher_id;
      const token = jwt.sign(
        { registeration_number, teacherId },
        process.env.SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res
        .status(StatusCodes.CREATED)
        .json({
          message: "teacher login successful",
          token,
          registeration_number,
          user: "teacher",
        });
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "something went wrong, try again later!" });
    }
}
async function checkTeacher(req, res) {
    const { registeration_number, teacherId } = req.teacher;
    res
      .status(StatusCodes.OK)
      .json({ message: "teacher valid", registeration_number, teacherId });
}
async function allTeacher(req, res) {
    const { registeration_number, teacherId } = req.teacher;

    try {
      const [teacher] = await db.query(
        "select * from teacher where regNum = ? or teacher_id = ?",
        [registeration_number, teacherId]
      );

      res.status(StatusCodes.OK).json({ Teacher: teacher });
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "something went wrong, try again later!" });
    }
}

export {registerteacher, loginTeacher, checkTeacher, allTeacher}