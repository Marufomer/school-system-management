import express from 'express'
import authMiddTeach from '../middleware/authMiddTeach.js';
import { allTeacher, checkTeacher, loginTeacher, registerteacher } from '../controller/teacherController.js';

const routerTeach = express.Router()

// register teacher
routerTeach.post('/register', registerteacher)
// login teacher
routerTeach.post('/login', loginTeacher)
// check teacher
routerTeach.get('/check', authMiddTeach, checkTeacher)
// get teacher info
routerTeach.get('/all', authMiddTeach, allTeacher)

export default routerTeach