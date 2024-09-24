import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


async function authMiddTeach(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }

  // spilt Bearer
  const token = authHeader.split(" ")[1];
  // console.log(authHeader)
  try {
    const { registeration_number, teacherId } = jwt.verify(
      token,
      process.env.SECRET
    );
    // send data
    req.teacher = { registeration_number, teacherId };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
}

export default authMiddTeach;
