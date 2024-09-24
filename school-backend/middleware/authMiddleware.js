import {StatusCodes} from "http-status-codes"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


async function authMiddleware(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication invalid"})
    };

    // spilt Bearer
    const token = authHeader.split(' ')[1]
    // console.log(authHeader)
    try {

        const { registeration_number, studentId } = jwt.verify(
          token,
          process.env.SECRET
        );
        // send data 
        req.student = { registeration_number, studentId};
        next()
    } catch (error) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Authentication invalid" });
    }
};

export default authMiddleware;