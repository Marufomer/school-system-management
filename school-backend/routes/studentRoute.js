import express from "express";
// user controllers
import { register, login, checkstudent, allStudent, profilePost, profileGet } from "../controller/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Folder where images are stored temporarily
  },
  filename: (req, file, cb) => {
    const userId = decodeURIComponent(req.params.id);
    const modifUser = userId.replace(/\//g, "-");
    cb(null, modifUser +"-" + "student.png");
  },
});

const upload = multer({ storage });


const router = express.Router();

// register route
router.post('/register', register);


// login student
router.post('/login', login);

// check student
router.get('/check',authMiddleware, checkstudent);

// get all student
router.get('/all-student', authMiddleware, allStudent);
// post profile
router.post("/profile/:id", authMiddleware,upload.single("image"), profilePost);
router.get("/getProfile/:id", authMiddleware,profileGet)


export default router;