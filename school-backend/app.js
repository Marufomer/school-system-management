import dotenv from 'dotenv'
import express from "express";
import router from "./routes/studentRoute.js";
import db from "./db/dbconfig.js"
import cors from "cors"
import { fileURLToPath } from "url";
import path from 'path'
import routerTeach from "./routes/teacherRoute.js";
import routerResult from "./routes/resultRouter.js";
import routerGrade from "./routes/gradeRouter.js";
import routerQuestion from './routes/questionRouter.js';
dotenv.config()

const app = express();
const port = 4000;

app.use(cors())

// json middeleware to extract
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static("public"))


// student routes middleware
app.use('/api/student', router)

// teacher routers middleware
app.use('/api/teacher', routerTeach)

// Question router
app.use('/api/question', routerQuestion)

// result router
app.use('/api/result', routerResult)

// grade router
app.use('/api/grade', routerGrade)

app.get('/note', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "note", "sample.pdf");
    res.sendFile(filePath)
}) 


async function start() {
    try {
        await db.execute("select 'test'");
        app.listen(port);
        console.log("database connection established");
        console.log(`listening on ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}

start()

// app.listen(port, (err) => {
//     if (err) throw err;
//     console.log(``)
// })
